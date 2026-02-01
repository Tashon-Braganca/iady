"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/content/siteData";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(siteData.general.musicUrl);
    audioRef.current.loop = true;

    const savedState = localStorage.getItem("musicPlaying");
    if (savedState === "true") {
      // User previously enabled music. We can't auto-play without interaction,
      // but we can show the state as ready.
      // Actually, browsers block autoplay. We'll wait for user interaction.
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("musicPlaying", "false");
    } else {
      audioRef.current.play().catch((e) => console.log("Playback error:", e));
      setIsPlaying(true);
      localStorage.setItem("musicPlaying", "true");
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={togglePlay}
        className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-primary/20 text-primary hover:scale-110 transition-transform flex items-center gap-2"
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? (
            <div className="flex items-center gap-2">
                <span className="text-xs font-medium pr-1">Playing</span>
                 <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                    <Music size={20} />
                </motion.div>
            </div>
         
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium pr-1">Play Music</span>
            <Music size={20} />
          </div>
        )}
      </motion.button>
        
      <AnimatePresence>
        {isPlaying && (
            <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={toggleMute}
                className="absolute -top-12 right-0 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md text-gray-500"
            >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
