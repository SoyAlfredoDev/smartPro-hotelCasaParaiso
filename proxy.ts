import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

// Routes that require authentication
const protectedRoutes = ["/admin"];

// Routes accessible only to non-authenticated users (redirect to /admin if logged in)
const authRoutes = ["/login"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );

  // Check if route is an auth-only route (login page)
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  // Read the session cookie directly from the request (no need for cookies() in proxy)
  const sessionCookie = request.cookies.get("session")?.value;
  const session = await decrypt(sessionCookie);

  // If trying to access a protected route without authentication -> redirect to /login
  if (isProtectedRoute && !session?.user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  // If an authenticated user visits the login page -> redirect to /admin
  if (isAuthRoute && session?.user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// Only run proxy on admin routes, login route, and the API auth routes
// Exclude static files, images, and other API routes
export const config = {
  matcher: ["/admin/:path*", "/login"],
};
