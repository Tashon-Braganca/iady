"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music, Disc } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/content/siteData";

interface MusicPlayerProps {
    onPlayChange?: (isPlaying: boolean) => void;
}

export default function MusicPlayer({ onPlayChange }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(siteData.general.musicUrl);
    audioRef.current.loop = true;

    // Check localStorage (but don't autoplay)
    const savedState = localStorage.getItem("musicPlaying");
    // We intentionally ignore savedState for autoplay due to browser policies
    // but we can set up the UI state if we wanted (optional)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Sync state with parent
  useEffect(() => {
      onPlayChange?.(isPlaying);
  }, [isPlaying, onPlayChange]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("musicPlaying", "false");
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
            .then(() => {
                setIsPlaying(true);
                localStorage.setItem("musicPlaying", "true");
            })
            .catch((e) => {
                console.error("Playback error:", e);
                // Maybe show a toast or UI feedback here
            });
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <motion.button
        onClick={togglePlay}
        className={`
            group flex items-center gap-3 pr-4 pl-3 py-2.5 rounded-full shadow-lg border border-white/50 backdrop-blur-md transition-all
            ${isPlaying ? "bg-white/90 text-gray-800" : "bg-white/70 text-gray-500 hover:bg-white/90"}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className={`p-2 rounded-full ${isPlaying ? "bg-indigo-100 text-indigo-500" : "bg-gray-100"}`}>
            {isPlaying ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                    <Disc size={20} />
                </motion.div>
            ) : (
                <Music size={20} />
            )}
        </div>
        
        <div className="flex flex-col text-left">
            <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                {isPlaying ? "Now Playing" : "Soundtrack"}
            </span>
            <span className="text-sm font-semibold leading-none">
                {isPlaying ? "Our Song" : "Play Music"}
            </span>
        </div>

        {isPlaying && (
            <motion.div 
                className="flex gap-0.5 items-end h-4 ml-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {[1, 2, 3].map((i) => (
                    <motion.div 
                        key={i}
                        className="w-1 bg-indigo-400 rounded-full"
                        animate={{ height: [4, 12, 4] }}
                        transition={{ duration: 0.5 + i * 0.1, repeat: Infinity }}
                    />
                ))}
            </motion.div>
        )}
      </motion.button>
        
      <AnimatePresence>
        {isPlaying && (
            <motion.button
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 10 }}
                onClick={toggleMute}
                className="absolute -top-12 right-2 bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-md text-gray-600 hover:text-indigo-600 border border-white/50"
            >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
