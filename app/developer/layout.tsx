"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "@/lib/auth";

export default function DeveloperLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const user = getUserFromToken();
    if (!user) {
      router.push("/");
    } else if (user.role !== "developer") {
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
}