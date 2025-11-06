"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserFromToken } from "@/lib/auth";

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const user = getUserFromToken();
    if (!user) {
      router.push("/"); // no hay token válido
    } else {
      setUsername(user.username);
      setRole(user.role);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <span className="text-lg font-semibold text-indigo-600">
          🏙️ Juan Sao Ville
        </span>

        <div className="flex items-center gap-4">
          {username && (
            <span className="text-gray-700 text-sm">
              👋 {username} ({role})
            </span>
          )}
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-white bg-indigo-600 px-4 py-1.5 rounded-md hover:bg-indigo-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
