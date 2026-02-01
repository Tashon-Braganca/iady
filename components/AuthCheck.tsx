"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import BackgroundLayer from "@/components/BackgroundLayer";
import StickerLayer from "@/components/StickerLayer";

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

  // LOGIN PAGE (Root): No Background, No Stickers, Just Clean Page
  if (pathname === "/") {
    return <>{children}</>;
  }

  // PROTECTED PAGES: Wait for check, then show full UI
  if (!isChecked) {
    return null; 
  }

  return (
    <>
        <BackgroundLayer />
        <StickerLayer />
        {children}
    </>
  );
}