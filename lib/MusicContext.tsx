"use client";

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import { siteData } from "@/content/siteData";

interface MusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(siteData.general.musicUrl);
    audioRef.current.loop = true;

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
      audioRef.current.play().catch((e) => console.error("Playback error:", e));
      setIsPlaying(true);
      localStorage.setItem("musicPlaying", "true");
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay, isMuted, toggleMute }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used within MusicProvider");
  return context;
}
