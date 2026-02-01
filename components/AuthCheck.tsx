"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. If we are on the login page, we don't need to check auth
    if (pathname === "/") {
      setIsAuthorized(true);
      return;
    }

    // 2. Check for the session flag
    const hasAccess = sessionStorage.getItem("is_authenticated");

    if (!hasAccess) {
      // If no access, kick back to login
      router.replace("/");
    } else {
      // Access granted
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  // Prevent flashing of protected content
  if (!isAuthorized && pathname !== "/") {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}