import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const COOKIE_NAME = "session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

export interface SessionPayload {
  user: string;
  role: string;
  expiresAt: Date;
  [key: string]: unknown;
}

/**
 * Encrypts a session payload into a signed JWT token.
 */
export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

/**
 * Decrypts and verifies a JWT session token.
 * Returns null if the token is invalid or expired.
 */
export async function decrypt(
  session: string | undefined = "",
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Creates a new session after successful authentication.
 * Sets an httpOnly secure cookie with the JWT token.
 */
export async function createSession(user: string): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  const session = await encrypt({
    user,
    role: "admin",
    expiresAt,
  });

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * Refreshes the session cookie's expiration time.
 * Called by the proxy to keep active users logged in.
 */
export async function updateSession(): Promise<void> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return;
  }

  const expires = new Date(Date.now() + SESSION_DURATION);

  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * Deletes the session cookie (logout).
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Retrieves and validates the current session.
 * Returns the session payload or null if not authenticated.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session) return null;
  return decrypt(session);
}
