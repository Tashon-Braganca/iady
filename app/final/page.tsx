"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalPage() {
  const router = useRouter();
  const [showReplay, setShowReplay] = useState(false);

  useEffect(() => {
    // Show replay button after video ends or after some time
    const timer = setTimeout(() => setShowReplay(true), 10000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      
      {/* Video Player */}
      <video 
        className="absolute inset-0 w-full h-full object-contain z-0"
        autoPlay
        playsInline
        controls
        src="/videos/the finale/PXL_20260201_162839765.mp4"
      >
        Your browser does not support the video tag.
      </video>

      {/* Overlay controls if needed, or just the replay button */}
      {showReplay && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-10 left-0 right-0 z-10 text-center"
        >
            <button
                onClick={() => router.push('/path')}
                className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white hover:bg-white/30 transition-all flex items-center gap-2 mx-auto text-sm font-medium uppercase tracking-widest border border-white/20"
            >
                <RefreshCw size={16} />
                Replay Our Story
            </button>
        </motion.div>
      )}
    </div>
  );
}
