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
    if (pathname === "/") {
        // Already allowed by render logic below, but good for state consistency
        setIsChecked(true);
        return;
    }

    const hasAccess = sessionStorage.getItem("is_authenticated");
    if (!hasAccess) {
      router.replace("/");
    } else {
      setIsChecked(true);
    }
  }, [pathname, router]);

  // 1. LOGIN PAGE (Root) - ALWAYS RENDER IMMEDIATELY
  // checking !pathname is a safety for initial hydration
  if (!pathname || pathname === "/") {
    return <>{children}</>;
  }

  // 2. LOADING STATE (Protected Pages)
  if (!isChecked) {
    return null; // or a spinner
  }

  // 3. PROTECTED CONTENT (With Backgrounds)
  return (
    <>
        <BackgroundLayer />
        <StickerLayer />
        {children}
    </>
  );
}