"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // 1. If we are on the login page, allow immediately
    if (pathname === "/") {
      setIsChecked(true);
      return;
    }

    // 2. Check for the session flag
    const hasAccess = sessionStorage.getItem("is_authenticated");

    if (!hasAccess) {
      // If no access, kick back to login
      router.replace("/");
    } else {
      setIsChecked(true);
    }
  }, [pathname, router]);

  // Always render if on home page, otherwise wait for check
  if (pathname === "/") {
    return <>{children}</>;
  }

  // For other pages, show nothing until checked (prevents flashing content)
  if (!isChecked) {
    return null; 
  }

  return <>{children}</>;
}