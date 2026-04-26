"use client";

import { useRouter } from "next/navigation";

export default function NavBarAdmin() {
  const router = useRouter();
  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (res.ok) {
      router.push("/");
    }
  };
  return (
    <nav className="border-b border-surface/10 border-b-2 border-b-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white font-['AQ_Chillax',sans-serif]">
              Hotel Casa Paraiso
            </span>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleLogout}
              className="text-white font-bold text-xl"
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
