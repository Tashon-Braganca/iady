"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { siteData } from "@/content/siteData";
import { RefreshCw } from "lucide-react";

export default function FinalPage() {
  const router = useRouter();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Fade in text delay
    setTimeout(() => setShowText(true), 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-60">
        <img 
            src={siteData.final.image} 
            alt="Finale" 
            className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showText ? 1 : 0, scale: showText ? 1 : 0.8 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 tracking-wide leading-tight"
        >
            {siteData.final.text}
        </motion.h1>

        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: showText ? 1 : 0 }}
            transition={{ delay: 3, duration: 1 }}
            onClick={() => router.push('/path')}
            className="mt-12 text-gray-400 hover:text-white flex items-center gap-2 mx-auto transition-colors text-sm uppercase tracking-widest"
        >
            <RefreshCw size={16} />
            Replay Our Story
        </motion.button>
      </div>
    </div>
  );
}
