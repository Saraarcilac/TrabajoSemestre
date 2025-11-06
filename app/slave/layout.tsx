"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "@/lib/auth";

export default function SlaveLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const user = getUserFromToken();
    if (!user) {
      router.push("/");
    } else if (user.role !== "slave") {
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
}