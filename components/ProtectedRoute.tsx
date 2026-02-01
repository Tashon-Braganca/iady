"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const hasAccess = sessionStorage.getItem("is_authenticated");
    if (!hasAccess) {
      router.replace("/");
    }
  }, [router]);

  // Always render children immediately - redirect happens async
  return <>{children}</>;
}
