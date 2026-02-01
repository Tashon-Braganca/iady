"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Music, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { siteData } from "@/content/siteData";

export default function VideosPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"kissie" | "dance">("kissie");

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 pb-24">
      <header className="flex flex-col items-center mb-8 relative">
        <button
          onClick={() => router.back()}
          className="absolute left-0 top-1 bg-white p-3 rounded-full shadow-sm border border-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Our Video Vault</h1>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Memories in Motion</p>
      </header>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-2xl mx-auto max-w-sm mb-8 relative">
        <button
          onClick={() => setActiveTab("kissie")}
          className="flex-1 py-3 rounded-xl relative z-10 font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-2"
          style={{ color: activeTab === "kissie" ? "#db2777" : "#6b7280" }}
        >
          <Heart size={16} fill={activeTab === "kissie" ? "currentColor" : "none"} />
          Kissie Vault
        </button>
        <button
          onClick={() => setActiveTab("dance")}
          className="flex-1 py-3 rounded-xl relative z-10 font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-2"
          style={{ color: activeTab === "dance" ? "#7c3aed" : "#6b7280" }}
        >
          <Music size={16} />
          Dance Floor
        </button>

        {/* Sliding Background */}
        <motion.div
          className="absolute top-1 bottom-1 bg-white rounded-xl shadow-sm"
          initial={false}
          animate={{
            left: activeTab === "kissie" ? "4px" : "50%",
            width: "calc(50% - 4px)",
            x: activeTab === "kissie" ? 0 : 0 
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
        >
          {siteData.videos[activeTab].map((video, index) => (
            <div key={index} className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative group">
                <div className="aspect-[9/16] relative rounded-xl overflow-hidden bg-black">
                     <video
                        src={video.src}
                        poster={video.poster}
                        controls
                        className="w-full h-full object-cover"
                        playsInline
                      />
                      {/* Play overlay if needed, native controls usually sufficient */}
                </div>
            </div>
          ))}
          
          {siteData.videos[activeTab].length === 0 && (
             <div className="col-span-full py-12 text-center text-gray-400 flex flex-col items-center">
                <div className="bg-gray-100 p-4 rounded-full mb-3">
                    {activeTab === 'kissie' ? <Heart size={24} /> : <Music size={24} />}
                </div>
                <p>No videos yet! Add them to siteData.ts</p>
             </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
