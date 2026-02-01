"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/content/siteData";
import { useRouter } from "next/navigation";
import { CheckCircle2, Lock, ChevronDown, Coffee, Plane, Sword, Flower2, Candy, Utensils, Film, Palette, Moon, Video, Smile, Heart, PlayCircle } from "lucide-react";
import MusicPlayer from "@/components/MusicPlayer";
import Timeline from "@/components/Timeline";
import BucketList from "@/components/BucketList";
import CurvyPath from "@/components/CurvyPath";

// Map icon strings to components
const iconMap: any = {
  Coffee, Plane, Sword, Flower2, Candy, Utensils, Film, Palette, Moon, Video, Smile,
  Instagram: Heart, Heart: Heart, Lock: Lock
};

export default function PathPage() {
  const router = useRouter();
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<any>(null);

  useEffect(() => {
    // Load progress
    const saved = localStorage.getItem("completedLevels");
    if (saved) {
      setCompletedLevels(JSON.parse(saved));
    } else {
        const firstLevelId = siteData.levels[0].id;
        // Don't auto-set here, just leave empty or rely on logic
    }
  }, []);

  const isLevelLocked = (index: number) => {
    if (index === 0) return false;
    const prevLevelId = siteData.levels[index - 1].id;
    return !completedLevels.includes(prevLevelId);
  };

  const handleLevelClick = (level: any, index: number) => {
    if (isLevelLocked(index)) return;
    setSelectedLevel(level);
  };

  const openLevel = () => {
    if (!selectedLevel) return;
    
    if (!completedLevels.includes(selectedLevel.id)) {
        const newCompleted = [...completedLevels, selectedLevel.id];
        setCompletedLevels(newCompleted);
        localStorage.setItem("completedLevels", JSON.stringify(newCompleted));
    }

    if (selectedLevel.id === 'vc') router.push('/gallery'); 
    else if (selectedLevel.id === 'hug') router.push('/level/hug'); 
    else router.push(`/level/${selectedLevel.id}`);
  };

  // Render function for the Curvy Path nodes
  const renderLevelNode = (level: any, index: number, isLeft: boolean) => {
    const Icon = iconMap[level.icon] || Heart;
    const locked = isLevelLocked(index);
    const completed = completedLevels.includes(level.id);

    return (
        <div className={`flex items-center gap-4 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
             {/* The Button Node */}
             <div className="relative group">
                <motion.button
                    whileHover={{ scale: 1.1, rotate: isLeft ? -5 : 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLevelClick(level, index)}
                    className={`
                        relative w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 border-4
                        ${locked 
                            ? "bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed" 
                            : "bg-white border-blue-100 text-primary hover:border-blue-300 hover:shadow-2xl"
                        }
                        ${completed ? "border-green-200 ring-2 ring-green-100" : ""}
                    `}
                >
                    {locked ? <Lock size={24} /> : <Icon size={32} strokeWidth={2.5} />}
                    
                    {completed && (
                         <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -bottom-1 -right-1 bg-green-400 text-white rounded-full p-1 border-2 border-white shadow-sm"
                         >
                            <CheckCircle2 size={12} />
                        </motion.div>
                    )}
                </motion.button>
                
                {/* Pop Burst Effect on Unlock (Simulated here if active) */}
                {!locked && !completed && (
                    <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-blue-400 pointer-events-none" />
                )}
             </div>

             {/* Label Tooltip (Floating to the side) */}
             <motion.div 
                initial={{ opacity: 0, x: isLeft ? -10 : 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`glass-panel px-4 py-2 rounded-xl text-center min-w-[100px] shadow-sm ${locked ? "opacity-50 grayscale" : ""}`}
             >
                <h3 className="font-bold text-sm text-gray-700 leading-tight">{level.title}</h3>
                {!locked && <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-1">Open</p>}
             </motion.div>
        </div>
    );
  };

  return (
    <div className="min-h-screen pb-32 relative overflow-x-hidden">
       <MusicPlayer />
       
      <header className="pt-16 pb-12 px-6 text-center relative z-10">
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
            className="inline-block mb-4"
        >
             <span className="text-4xl">🌤️</span>
        </motion.div>
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-800 mb-2 drop-shadow-sm"
            style={{ fontFamily: "var(--font-comic)" }}
        >
            {siteData.hero.title}
        </motion.h1>
        <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-blue-400 font-bold text-lg tracking-wide"
        >
            {siteData.hero.subtitle}
        </motion.p>
      </header>

      {/* Timeline Section - Now using simplified vertical layout or could also be curvy? 
          Let's keep Timeline simple vertical but styled better, as requested "Curvy path line... apply to timeline".
          Actually, let's keep the Timeline component as is for now but style it to match the glassmorphism.
      */}
      <div className="mb-12">
          <Timeline />
      </div>

      <div className="relative z-10">
        {/* Path Label */}
        <div className="text-center mb-12">
            <span className="bg-white/60 backdrop-blur-md text-blue-500 px-6 py-2 rounded-full text-sm font-bold shadow-sm border border-white/50">
                Start Your Journey 👇
            </span>
        </div>

        {/* The Curvy Path */}
        <CurvyPath 
            items={siteData.levels} 
            renderItem={renderLevelNode}
        />

         {/* Floating Menu Buttons */}
         <div className="mt-12 flex flex-col items-center gap-4 relative z-20 px-6">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/videos')}
                className="glass-panel w-full max-w-xs py-4 rounded-2xl flex items-center justify-center gap-3 text-indigo-600 font-bold shadow-md hover:bg-white/60 transition-colors"
            >
                <span className="bg-indigo-100 p-2 rounded-full text-indigo-500"><PlayCircle size={20} /></span>
                Video Vault
            </motion.button>
            
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/letters')}
                className="glass-panel w-full max-w-xs py-4 rounded-2xl flex items-center justify-center gap-3 text-pink-600 font-bold shadow-md hover:bg-white/60 transition-colors"
            >
                <span className="bg-pink-100 p-2 rounded-full text-pink-500"><Heart size={20} /></span>
                Open Letters
            </motion.button>

             <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/final')}
                className="bg-gray-900 text-white w-full max-w-xs py-4 rounded-2xl font-bold shadow-xl hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
                The Finale ✨
            </motion.button>
         </div>

      </div>
      
      {/* Bucket List Section */}
      <BucketList />

      <AnimatePresence>
        {selectedLevel && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl relative overflow-hidden"
            >
               <div className={`absolute top-0 left-0 right-0 h-32 ${selectedLevel.color || "bg-blue-100"}`} />
               
               <div className="relative z-10 mt-12 flex flex-col items-center text-center">
                    <div className="bg-white p-5 rounded-full shadow-lg mb-6 ring-4 ring-white/50">
                        {(() => {
                            const Icon = iconMap[selectedLevel.icon] || Heart;
                            return <Icon size={48} className="text-gray-700" />;
                        })()}
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-3 text-gray-800">{selectedLevel.title}</h2>
                    <p className="text-gray-500 mb-8 font-medium leading-relaxed">{selectedLevel.description}</p>
                    
                    <div className="flex gap-4 w-full">
                        <button 
                            onClick={() => setSelectedLevel(null)}
                            className="flex-1 py-4 rounded-2xl border-2 border-gray-100 font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            Close
                        </button>
                        <button 
                            onClick={openLevel}
                            className="flex-1 py-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black shadow-lg hover:shadow-xl transition-all"
                        >
                            Open It! 🚀
                        </button>
                    </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
