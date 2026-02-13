"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Heart, Key, X } from "lucide-react";
import { siteData } from "@/content/siteData";
import { useMusic } from "@/lib/MusicContext";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBouquet, setShowBouquet] = useState(false);
  const router = useRouter();
  const { togglePlay, isPlaying } = useMusic();
  
  // Clear session on mount to force re-login
  useEffect(() => {
     sessionStorage.removeItem("is_authenticated");
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/unlock", {
      method: "POST",
      body: JSON.stringify({ password: password.toLowerCase().trim() }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      // Set session flag
      sessionStorage.setItem("is_authenticated", "true");
      
      // Start music on successful login
      if (!isPlaying) {
        togglePlay();
      }
      
      router.push("/path");
    } else {
      setLoading(false);
      setErrorCount((prev) => prev + 1);
      
      const messages = [
        "Nope, try again cutie!",
        "Think harder...",
        "It's a very simple phrase.",
        "You say it to me often.",
        "Remember: 3 words.",
        "Still wrong? 😭",
        "Come on, you know this!",
      ];

      if (errorCount >= 7) {
        setMessage("ok budha focus 😭");
      } else {
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
      }
      
      // Shake animation trigger (handled by framer motion key)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 relative overflow-hidden">
        {/* Bouquet Button - FIXED position so it's always clickable */}
        <div className="fixed top-8 left-6 md:top-20 md:left-20 z-[9999]">
          <motion.button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowBouquet(true);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="block p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white cursor-pointer touch-manipulation hover:bg-white transition-colors"
          >
              <div className="text-5xl md:text-5xl filter drop-shadow-sm leading-none">💌</div>
          </motion.button>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
             <motion.div 
                animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-32 right-10 md:right-20 text-4xl"
            >
                🧸
            </motion.div>
            <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 right-1/4 text-2xl opacity-50"
            >
                ❤️
            </motion.div>
        </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-white/80 backdrop-blur-2xl p-8 rounded-[2rem] shadow-2xl w-full max-w-md mx-4 z-10 border border-white/60 ring-1 ring-white/50"
      >
        <div className="text-center mb-8">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="bg-gradient-to-tr from-pink-100 to-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-500 shadow-inner"
          >
            <Heart size={36} fill="currentColor" className="drop-shadow-sm" />
          </motion.div>
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2 tracking-tight">Welcome Home, Adyasha</h1>
          <p className="text-gray-500 text-base italic">{siteData.general.passwordHint}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the magic words..."
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-pink-300 focus:ring-4 focus:ring-pink-100 outline-none transition-all bg-white/60 text-lg placeholder:text-gray-400 text-gray-700"
              style={{ fontSize: '16px' }} // Prevents iOS zoom
              autoFocus
            />
            <div className="absolute right-4 top-4 text-gray-300 group-focus-within:text-pink-400 transition-colors">
                <Key size={24} />
            </div>
          </div>

          <AnimatePresence>
            {message && (
              <motion.p
                key={message} // triggers animation on change
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-sm text-center font-medium"
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-200 text-lg tracking-wide"
            type="submit"
            onClick={() => {
              // Start music IMMEDIATELY on click to preserve user gesture
              if (!isPlaying) {
                togglePlay();
              }
            }}
          >
            {loading ? "Unlocking..." : "Open My Heart"}
          </motion.button>
        </form>
      </motion.div>

      {/* Bouquet Modal - Iframe */}
      <AnimatePresence>
        {showBouquet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-0"
            onClick={() => setShowBouquet(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white w-full h-full md:rounded-none rounded-t-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://digibouquet.vercel.app/bouquet/12a9941a-601f-4f40-aab7-5e8a9781bc0c"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
              {/* Close Button */}
              <button
                onClick={() => setShowBouquet(false)}
                className="absolute top-4 right-4 z-50 bg-black/50 text-white rounded-full p-2 backdrop-blur-md hover:bg-black/70 transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
