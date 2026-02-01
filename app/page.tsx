"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Heart, Key } from "lucide-react";
import { siteData } from "@/content/siteData";
import { useMusic } from "@/lib/MusicContext"; // Import music context

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { togglePlay, isPlaying } = useMusic(); // Get music toggle function and state

  // Clear session on mount to force re-login if they visit the root URL
  useState(() => {
     if (typeof window !== "undefined") {
         sessionStorage.removeItem("is_authenticated");
     }
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // FIX: Start music IMMEDIATELY on user interaction to bypass browser block
    if (!isPlaying) {
        togglePlay(); 
    }

    const res = await fetch("/api/unlock", {
      method: "POST",
      body: JSON.stringify({ password: password.toLowerCase().trim() }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      // Set session flag
      sessionStorage.setItem("is_authenticated", "true");
      router.push("/path");
    } else {
      setLoading(false);
      // If login failed, stop the music we just started
      if (isPlaying) { 
          togglePlay(); 
      }
      
      setErrorCount((prev) => prev + 1);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
             <motion.div 
                animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-10 text-blue-200"
            >
                <Heart size={100} fill="currentColor" />
            </motion.div>
             <motion.div 
                animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 right-10 text-pink-200"
            >
                <Heart size={150} fill="currentColor" />
            </motion.div>
        </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md mx-4 z-10 border border-white/50"
      >
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Home</h1>
          <p className="text-gray-500 text-sm">{siteData.general.passwordHint}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the magic words..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white/50"
              autoFocus
            />
            <div className="absolute right-3 top-3 text-gray-400">
                <Key size={20} />
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-primary hover:bg-sky-400 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-200"
            type="submit"
          >
            {loading ? "Unlocking..." : "Open My Heart"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
