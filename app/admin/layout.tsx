"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "@/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const user = getUserFromToken();
    if (!user) {
      router.push("/"); // no hay sesión
    } else if (user.role !== "admin") {
      router.push("/"); // redirige si el rol no es admin
    }
  }, [router]);

  return <>{children}</>;
}