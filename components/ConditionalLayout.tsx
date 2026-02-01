"use client";

import { usePathname } from "next/navigation";
import BackgroundLayer from "@/components/BackgroundLayer";
import StickerLayer from "@/components/StickerLayer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  return (
    <>
      {!isLoginPage && (
        <>
          <BackgroundLayer />
          <StickerLayer />
        </>
      )}
      {children}
    </>
  );
}
