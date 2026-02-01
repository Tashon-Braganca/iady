import type { Metadata } from "next";
import { Geist, Geist_Mono, Patrick_Hand } from "next/font/google";
import "./globals.css";
import AuthCheck from "@/components/AuthCheck";
import { MusicProvider } from "@/lib/MusicContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  weight: "400",
  variable: "--font-comic",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adyasha & Me | Cozy Distance",
  description: "A little corner of the internet, just for us.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${patrickHand.variable} antialiased bg-[#FDFBF7]`}
      >
        <MusicProvider>
          <AuthCheck>
            {children}
          </AuthCheck>
        </MusicProvider>
      </body>
    </html>
  );
}
