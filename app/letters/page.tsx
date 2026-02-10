"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { siteData } from "@/content/siteData";

export default function LettersPage() {
  const router = useRouter();
  const [selectedLetter, setSelectedLetter] = useState<any>(null);

  return (
    <div className="min-h-screen bg-pink-50 p-6 flex flex-col items-center">
      <header className="w-full flex items-center justify-between mb-12 max-w-2xl">
        <button
          onClick={() => router.back()}
          className="bg-white/80 p-3 rounded-full shadow-sm text-pink-900"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-serif font-bold text-pink-900">Love Letters</h1>
        <div className="w-12" /> {/* Spacer */}
      </header>

      <div className="flex flex-col gap-8 w-full max-w-sm">
        {siteData.letters.map((letter, index) => (
          <motion.button
            key={letter.id}
            initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -1 : 1 }}
            animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
            whileHover={{ scale: 1.02, rotate: 0 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => setSelectedLetter(letter)}
            className="group relative w-full perspective-1000"
          >
            {/* Envelope Look - Refined */}
            <div className="bg-white border border-pink-100 p-8 rounded-2xl shadow-[0_10px_40px_-10px_rgba(255,183,178,0.3)] flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden transition-all duration-300 group-hover:shadow-[0_20px_50px_-10px_rgba(255,183,178,0.5)]">
                {/* Washi Tape Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-pink-100/50 rotate-1 transform" />
                
                <Heart className="text-pink-300 mb-4 group-hover:text-pink-400 group-hover:scale-110 transition-all duration-300" fill="currentColor" size={42} />
                <h3 className="font-serif text-2xl font-medium text-gray-700">{letter.title}</h3>
                <span className="text-xs text-pink-300 mt-3 uppercase tracking-widest font-bold">Open Me</span>
            </div>
          </motion.button>
        ))}
      </div>
      
      {/* Letter Modal */}
      <AnimatePresence>
        {selectedLetter && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                 <motion.div
                    layoutId={selectedLetter.id}
                    initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                    className="bg-[#fffdf9] w-full max-w-lg p-8 md:p-12 rounded-sm shadow-2xl relative"
                    style={{ backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px)', backgroundSize: '100% 2em', lineHeight: '2em' }}
                 >
                    <button 
                        onClick={() => setSelectedLetter(null)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
                    >
                        <X size={24} />
                    </button>

                    <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6 border-b-2 border-gray-100 pb-4">
                        {selectedLetter.title}
                    </h2>
                    
                    <div className="font-serif text-lg text-gray-700 whitespace-pre-line leading-loose">
                        {selectedLetter.content}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                        <p className="font-cursive text-xl text-gray-500">Always yours,</p>
                    </div>
                 </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
}
