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
    const count = 12; // Number of stickers to place

    const generated = Array.from({ length: count }).map((_, i) => {
       const isCustom = hasCustomStickers && rng() > 0.3; // 70% chance of custom if available
       let content: any = null;
       
       if (isCustom) {
           const index = Math.floor(rng() * assetsManifest.stickers.length);
           content = { type: 'image', src: assetsManifest.stickers[index] };
       } else {
           const index = Math.floor(rng() * FALLBACK_STICKERS.length);
           const colorIndex = Math.floor(rng() * COLORS.length);
           content = { type: 'icon', Icon: FALLBACK_STICKERS[index], color: COLORS[colorIndex] };
       }

       // Position logic: prefer edges to avoid blocking the path in center (approx 30% to 70% width)
       // We can just use full range but maybe push them away from center X if we want to be fancy.
       // Let's just keep it simple random for now as per prompt "corners/edges" implies logic.
       
       let x = rng() * 100;
       // If x is between 25 and 75, shift it out
       if (x > 25 && x < 75) {
           x = rng() > 0.5 ? x + 50 : x - 50; // Push to sides
           if (x < 0) x += 100;
           if (x > 100) x -= 100;
       }

       return {
           id: i,
           content,
           x, 
           y: rng() * 100, // 0-100% vertical
           rotate: (rng() * 60) - 30, // -30 to 30 deg
           scale: (rng() * 0.5) + 0.7, // 0.7 to 1.2
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
            transition={{ duration: 1, delay: s.id * 0.1 }}
            whileHover={{ scale: s.scale * 1.2, rotate: 0, opacity: 1 }}
        >
            {s.content.type === 'image' ? (
                <img src={s.content.src} alt="sticker" className="w-20 h-20 object-contain drop-shadow-md opacity-80" />
            ) : (
                <div className={`${s.content.color} opacity-40 drop-shadow-sm`}>
                    <s.content.Icon size={48} strokeWidth={1.5} />
                </div>
            )}
        </motion.div>
      ))}
    </div>
  );
}
