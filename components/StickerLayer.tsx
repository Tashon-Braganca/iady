"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { assetsManifest } from "@/content/assetsManifest";
import { seededRandom, generateSeed } from "@/lib/utils";
import { Heart, Star, Cloud, Music, Coffee, Plane } from "lucide-react";

const FALLBACK_STICKERS = [Heart, Star, Cloud, Music, Coffee, Plane];
const COLORS = ["text-pink-300", "text-blue-300", "text-yellow-300", "text-purple-300", "text-green-300"];

export default function StickerLayer() {
  const [stickers, setStickers] = useState<any[]>([]);

  useEffect(() => {
    // 1. Get or create seed for consistency
    let seed = localStorage.getItem("sticker_seed");
    if (!seed) {
        seed = generateSeed().toString();
        localStorage.setItem("sticker_seed", seed);
    }
    const rng = seededRandom(parseInt(seed));

    // 2. Determine source items
    const hasCustomStickers = assetsManifest.stickers.length > 0;
    const count = 16; // Number of stickers to place

    // Define zones (corners and edges only) to avoid center clustering
    const zones = [
      // Top-left corner
      { xMin: 0, xMax: 15, yMin: 0, yMax: 20 },
      // Top-right corner
      { xMin: 85, xMax: 100, yMin: 0, yMax: 20 },
      // Bottom-left corner
      { xMin: 0, xMax: 15, yMin: 80, yMax: 100 },
      // Bottom-right corner
      { xMin: 85, xMax: 100, yMin: 80, yMax: 100 },
      // Left edge
      { xMin: 0, xMax: 10, yMin: 25, yMax: 75 },
      // Right edge
      { xMin: 90, xMax: 100, yMin: 25, yMax: 75 },
      // Top edge
      { xMin: 20, xMax: 80, yMin: 0, yMax: 10 },
      // Bottom edge
      { xMin: 20, xMax: 80, yMin: 90, yMax: 100 },
    ];

    const generated = Array.from({ length: count }).map((_, i) => {
       const isCustom = hasCustomStickers && rng() > 0.2; // 80% chance of custom if available
       let content: any = null;
       
       if (isCustom) {
           const index = Math.floor(rng() * assetsManifest.stickers.length);
           content = { type: 'image', src: assetsManifest.stickers[index] };
       } else {
           const index = Math.floor(rng() * FALLBACK_STICKERS.length);
           const colorIndex = Math.floor(rng() * COLORS.length);
           content = { type: 'icon', Icon: FALLBACK_STICKERS[index], color: COLORS[colorIndex] };
       }

       // Pick a random zone
       const zone = zones[Math.floor(rng() * zones.length)];
       const x = zone.xMin + rng() * (zone.xMax - zone.xMin);
       const y = zone.yMin + rng() * (zone.yMax - zone.yMin);

       return {
           id: i,
           content,
           x, 
           y,
           rotate: (rng() * 40) - 20, // -20 to 20 deg
           scale: (rng() * 0.4) + 0.6, // 0.6 to 1.0
       };
    });

    setStickers(generated);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {stickers.map((s) => (
        <motion.div
            key={s.id}
            className="absolute"
            style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: s.scale, rotate: s.rotate }}
            transition={{ duration: 0.8, delay: s.id * 0.08 }}
        >
            {s.content.type === 'image' ? (
                <img src={s.content.src} alt="sticker" className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md" />
            ) : (
                <div className={`${s.content.color} drop-shadow-sm opacity-40`}>
                    <s.content.Icon size={40} strokeWidth={2} />
                </div>
            )}
        </motion.div>
      ))}
    </div>
  );
}
