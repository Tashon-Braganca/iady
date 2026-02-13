"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, X } from "lucide-react";
import { siteData } from "@/content/siteData";
import MusicPlayer from "@/components/MusicPlayer";

export default function LevelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const level = siteData.levels.find((l) => l.id === slug);

  if (!level) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Level not found :(</p>
        <button onClick={() => router.back()} className="text-blue-500 ml-2">Go back</button>
      </div>
    );
  }

  // Get all images for the gallery
  const allImages = level.previewImages || [];

  return (
    <div className="h-screen bg-[#FDFBF7] relative overflow-hidden flex flex-col">
      <MusicPlayer />
      
      {/* Header with colored background - Compact */}
      <div className={`absolute top-0 left-0 w-full h-32 ${level.color || "bg-blue-100"} rounded-b-[2rem] z-0`} />

      <div className="relative z-10 px-4 pt-4 flex-none">
        <button 
            onClick={() => router.back()} 
            className="bg-white/50 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors shadow-sm"
        >
            <ArrowLeft size={20} />
        </button>
      </div>

      {/* Content Area - Flex Column */}
      <div className="flex-1 flex flex-col p-4 relative z-10 overflow-hidden gap-4">
        
        {/* Gallery Grid - Takes up available space */}
        <div className="flex-1 w-full max-w-lg mx-auto overflow-y-auto no-scrollbar rounded-3xl bg-white/50 backdrop-blur-sm p-2 shadow-inner border border-white/60">
             <div className="grid grid-cols-2 gap-2">
                {allImages.map((img, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`rounded-xl bg-gray-100 overflow-hidden cursor-pointer hover:opacity-95 transition-opacity shadow-sm ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
                        onClick={() => setSelectedImage(img)}
                    >
                        <img src={img} alt={`${level.title} ${i+1}`} className="w-full h-full object-cover" loading="lazy" />
                    </motion.div>
                ))}
             </div>
        </div>

        {/* Floating Caption Card - Fixed at bottom */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-5 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] w-full max-w-lg mx-auto flex-none border border-gray-100"
        >
            <div className="flex flex-col items-center text-center">
                <h1 className="text-xl font-serif font-bold text-gray-800 mb-1">{level.content.title}</h1>
                <p className="text-gray-600 text-sm leading-relaxed mb-3 font-medium opacity-90">
                    {level.content.text}
                </p>

                {/* Specific Custom content for special IDs */}
                 {slug === 'fell-hard' && (
                    <div className="bg-red-50 p-2 rounded-lg mb-2 border border-red-100 w-full">
                        <p className="font-bold text-red-800 text-[10px] mb-1 uppercase tracking-wide">Reasons:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                             {["Your Smile", "Your Kindness", "Your Laugh"].map((reason, i) => (
                                 <span key={i} className="text-[10px] bg-white px-2 py-0.5 rounded-full text-red-600 border border-red-100 shadow-sm">{reason}</span>
                             ))}
                        </div>
                    </div>
                )}

                {slug === 'aot' && (
                    <div className="bg-gray-900 text-white p-3 rounded-xl w-full mb-2 shadow-lg shadow-gray-200">
                        <p className="italic font-serif text-xs tracking-wide">"I will always wrap that scraf around you"</p>
                    </div>
                )}
                
                <div className="pt-2 border-t border-gray-100 w-full flex justify-center">
                    <Heart className="text-pink-400 animate-bounce drop-shadow-sm" fill="currentColor" size={24} />
                </div>
            </div>
        </motion.div>
      </div>

      {/* Image Modal Popup */}
      <AnimatePresence>
        {selectedImage && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
                onClick={() => setSelectedImage(null)}
            >
                <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                    <X size={24} />
                </button>
                <motion.img 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    src={selectedImage} 
                    alt="Full size memory" 
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                />
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
