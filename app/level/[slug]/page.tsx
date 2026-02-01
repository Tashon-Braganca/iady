"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import { siteData } from "@/content/siteData";
import MusicPlayer from "@/components/MusicPlayer";

export default function LevelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();

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
    <div className="min-h-screen bg-[#FDFBF7] relative pb-20">
      <MusicPlayer />
      
      {/* Header with colored background */}
      <div className={`absolute top-0 left-0 w-full h-48 ${level.color || "bg-blue-100"} rounded-b-[3rem]`} />

      <div className="relative z-10 px-6 pt-8">
        <button 
            onClick={() => router.back()} 
            className="bg-white/50 backdrop-blur-md p-3 rounded-full mb-8 hover:bg-white transition-colors"
        >
            <ArrowLeft size={24} />
        </button>

        {/* Content Card */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-xl max-w-2xl mx-auto"
        >
            {/* Gallery Collage */}
            <div className="mb-6">
              {allImages.length === 1 && (
                <div className="aspect-[4/3] w-full rounded-2xl bg-gray-100 overflow-hidden">
                  <img src={allImages[0]} alt={level.title} className="w-full h-full object-cover" />
                </div>
              )}

              {allImages.length === 2 && (
                <div className="grid grid-cols-2 gap-2">
                  {allImages.map((img, i) => (
                    <div key={i} className="aspect-square rounded-xl bg-gray-100 overflow-hidden">
                      <img src={img} alt={`${level.title} ${i+1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {allImages.length === 3 && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden row-span-2">
                    <img src={allImages[0]} alt={`${level.title} 1`} className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden">
                    <img src={allImages[1]} alt={`${level.title} 2`} className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden">
                    <img src={allImages[2]} alt={`${level.title} 3`} className="w-full h-full object-cover" />
                  </div>
                </div>
              )}

              {allImages.length >= 4 && (
                <div className="grid grid-cols-2 gap-2">
                  {allImages.slice(0, 4).map((img, i) => (
                    <div key={i} className="aspect-square rounded-xl bg-gray-100 overflow-hidden">
                      <img src={img} alt={`${level.title} ${i+1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Title and Description */}
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4">{level.content.title}</h1>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {level.content.text}
            </p>
            
            {/* Custom Content based on ID */}
             {slug === 'fell-hard' && (
                <div className="bg-red-50 p-4 rounded-xl mb-4 border border-red-100">
                    <p className="font-bold text-red-800 text-sm mb-2">What Made Me Fall:</p>
                    <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                        <li>The way you smile when you talk about your passions</li>
                        <li>Your genuine kindness to everyone</li>
                        <li>How you make me feel safe</li>
                        <li>Your adorable laugh</li>
                    </ul>
                </div>
            )}

            {slug === 'aot' && (
                <div className="bg-gray-900 text-white p-6 rounded-xl text-center mb-4">
                    <p className="italic font-serif">"If you don't fight, you can't win."</p>
                </div>
            )}

            <div className="flex justify-center mt-8">
                <Heart className="text-pink-400 animate-bounce" fill="currentColor" size={32} />
            </div>

        </motion.div>
      </div>
    </div>
  );
}
