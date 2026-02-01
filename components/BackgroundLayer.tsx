"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BackgroundLayer() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* 1. Base Paper Texture Color */}
      <div className="absolute inset-0 bg-[#FDFBF7]" />

      {/* 2. Paper Grain / Noise */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.03)_100%)]" />

      {/* 4. Floating Hearts (Background Ambiance) */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute text-pink-100/40"
                initial={{
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                    scale: 0.5 + Math.random() * 0.5,
                    rotate: Math.random() * 360,
                }}
                animate={{
                    y: [0, -100, 0],
                    rotate: [0, 45, 0],
                }}
                transition={{
                    duration: 20 + Math.random() * 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 5,
                }}
            >
                <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </motion.div>
        ))}
      </div>
    </div>
  );
}
