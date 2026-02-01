"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import { siteData } from "@/content/siteData";

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

  return (
    <div className="min-h-screen bg-[#FDFBF7] relative">
      <div className={`absolute top-0 left-0 w-full h-64 ${level.color || "bg-blue-100"} rounded-b-[3rem]`} />

      <div className="relative z-10 px-6 pt-8 pb-20">
        <button 
            onClick={() => router.back()} 
            className="bg-white/50 backdrop-blur-md p-3 rounded-full mb-8 hover:bg-white transition-colors"
        >
            <ArrowLeft size={24} />
        </button>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-xl overflow-hidden"
        >
            <div className="aspect-video w-full rounded-2xl bg-gray-100 mb-6 overflow-hidden">
                <img 
                    src={level.content.image} 
                    alt={level.title} 
                    className="w-full h-full object-cover"
                />
            </div>

            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4">{level.content.title}</h1>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {level.content.text}
            </p>
            
            {/* Custom Content based on ID could go here (e.g., Checklist for Italy, Video for Movie night) */}
             {slug === 'italy' && (
                <div className="bg-blue-50 p-4 rounded-xl mb-4 border border-blue-100">
                    <p className="font-bold text-blue-800 text-sm mb-2">Our Italian Dream:</p>
                    <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                        <li>Rome (Colosseum & Gelato)</li>
                        <li>Venice (Gondola Ride)</li>
                        <li>Florence (Art & Wine)</li>
                        <li>Amalfi Coast (Sunsets)</li>
                    </ul>
                </div>
            )}

            {slug === 'aot' && (
                <div className="bg-gray-900 text-white p-6 rounded-xl text-center">
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
