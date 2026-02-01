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

      {/* Content Card - Centered and Scrollable if needed, but fits viewport */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10 overflow-hidden">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-5 shadow-xl w-full max-w-lg max-h-full overflow-y-auto no-scrollbar flex flex-col"
        >
            {/* Gallery Collage - Compact & Clickable */}
            <div className="mb-4 flex-shrink-0">
              {allImages.length === 1 && (
                <div 
                    className="aspect-[4/3] w-full rounded-2xl bg-gray-100 overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
                    onClick={() => setSelectedImage(allImages[0])}
                >
                  <img src={allImages[0]} alt={level.title} className="w-full h-full object-cover" />
                </div>
              )}

              {allImages.length === 2 && (
                <div className="grid grid-cols-2 gap-2">
                  {allImages.map((img, i) => (
                    <div 
                        key={i} 
                        className="aspect-square rounded-xl bg-gray-100 overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
                        onClick={() => setSelectedImage(img)}
                    >
                      <img src={img} alt={`${level.title} ${i+1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {allImages.length === 3 && (
                <div className="grid grid-cols-2 gap-2">
                  <div 
                    className="aspect-square rounded-xl bg-gray-100 overflow-hidden row-span-2 cursor-pointer hover:opacity-95 transition-opacity"
                    onClick={() => setSelectedImage(allImages[0])}
                  >
                    <img src={allImages[0]} alt={`${level.title} 1`} className="w-full h-full object-cover" />
                  </div>
                  <div 
                    className="aspect-square rounded-xl bg-gray-100 overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
                    onClick={() => setSelectedImage(allImages[1])}
                  >
                    <img src={allImages[1]} alt={`${level.title} 2`} className="w-full h-full object-cover" />
                  </div>
                  <div 
                    className="aspect-square rounded-xl bg-gray-100 overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
                    onClick={() => setSelectedImage(allImages[2])}
                  >
                    <img src={allImages[2]} alt={`${level.title} 3`} className="w-full h-full object-cover" />
                  </div>
                </div>
              )}

              {allImages.length >= 4 && (
                <div className="grid grid-cols-2 gap-2">
                  {allImages.slice(0, 4).map((img, i) => (
                    <div 
                        key={i} 
                        className="aspect-square rounded-xl bg-gray-100 overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
                        onClick={() => setSelectedImage(img)}
                    >
                      <img src={img} alt={`${level.title} ${i+1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Title and Description - Compact */}
            <div className="flex-1 overflow-y-auto">
                <h1 className="text-2xl font-serif font-bold text-gray-800 mb-2">{level.content.title}</h1>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-4">
                    {level.content.text}
                </p>
                
                {/* Custom Content based on ID */}
                 {slug === 'fell-hard' && (
                    <div className="bg-red-50 p-3 rounded-xl mb-3 border border-red-100">
                        <p className="font-bold text-red-800 text-xs mb-1">What Made Me Fall:</p>
                        <ul className="list-disc list-inside text-xs text-red-700 space-y-0.5">
                            <li>The way you smile</li>
                            <li>Your genuine kindness</li>
                            <li>How you make me feel safe</li>
                            <li>Your adorable laugh</li>
                        </ul>
                    </div>
                )}

                {slug === 'aot' && (
                    <div className="bg-gray-900 text-white p-4 rounded-xl text-center mb-3">
                        <p className="italic font-serif text-sm">"If you don't fight, you can't win."</p>
                    </div>
                )}
            </div>

            <div className="flex justify-center mt-4 pt-2 border-t border-gray-100">
                <Heart className="text-pink-400 animate-bounce" fill="currentColor" size={24} />
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
                className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
                onClick={() => setSelectedImage(null)}
            >
                <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 bg-white/20 p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                >
                    <X size={24} />
                </button>
                <motion.img 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    src={selectedImage} 
                    alt="Full size memory" 
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                />
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
