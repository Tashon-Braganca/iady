"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { assetsManifest } from "@/content/assetsManifest";
import { Heart } from "lucide-react"; // Fallback

export default function StickerLayer() {
  const [stickers, setStickers] = useState<any[]>([]);

  useEffect(() => {
    // Generate random positions for stickers
    // If no stickers in manifest, use fallbacks (hearts)
    const items = assetsManifest.stickers.length > 0 ? assetsManifest.stickers : ["fallback", "fallback", "fallback", "fallback", "fallback"];
    
    const generated = items.map((src, i) => ({
      id: i,
      src,
      x: Math.random() * 90 + 5, // 5% to 95%
      y: Math.random() * 90 + 5,
      rotate: Math.random() * 20 - 10,
      scale: Math.random() * 0.4 + 0.8,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }));
    setStickers(generated);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {stickers.map((sticker) => (
        <motion.div
          key={sticker.id}
          className="absolute"
          initial={{ 
            left: `${sticker.x}%`, 
            top: `${sticker.y}%`, 
            opacity: 0,
            scale: 0 
          }}
          animate={{ 
            y: [0, -30, 0],
            rotate: [sticker.rotate, sticker.rotate + 10, sticker.rotate],
            opacity: 0.6,
            scale: sticker.scale
          }}
          transition={{
            y: {
                duration: sticker.duration,
                repeat: Infinity,
                ease: "easeInOut"
            },
            rotate: {
                duration: sticker.duration * 0.8,
                repeat: Infinity,
                ease: "easeInOut"
            },
            opacity: { duration: 1, delay: sticker.delay },
            scale: { duration: 1, delay: sticker.delay }
          }}
        >
          {sticker.src === "fallback" ? (
             <Heart className="text-pink-200/50" size={48} fill="currentColor" />
          ) : (
            <img src={sticker.src} alt="sticker" className="w-24 h-24 object-contain opacity-80" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
