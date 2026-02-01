"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/content/siteData";
import { useRouter } from "next/navigation";
import { CheckCircle2, Lock, ChevronDown, Coffee, Plane, Sword, Flower2, Candy, Utensils, Film, Palette, Moon, Video, Smile, Heart, PlayCircle, Star, ArrowDown } from "lucide-react";
import MusicPlayer from "@/components/MusicPlayer";
import Timeline from "@/components/Timeline";
import BucketList from "@/components/BucketList";
import CurvyPath from "@/components/CurvyPath";
import LevelBottomSheet from "@/components/LevelBottomSheet";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useMusic } from "@/lib/MusicContext";

// Map icon strings to components
const iconMap: any = {
  Coffee, Plane, Sword, Flower2, Candy, Utensils, Film, Palette, Moon, Video, Smile,
  Instagram: Heart, Heart: Heart, Lock: Lock
};

export default function PathPage() {
  const router = useRouter();
  const { isPlaying: isMusicPlaying } = useMusic();
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const [showToast, setShowToast] = useState<{message: string, visible: boolean}>({ message: "", visible: false });
  
  // Load progress
  useEffect(() => {
    const saved = localStorage.getItem("completedLevels");
    if (saved) {
      setCompletedLevels(JSON.parse(saved));
    }
  }, []);

  const isLevelLocked = (index: number) => {
    if (index === 0) return false;
    const prevLevelId = siteData.levels[index - 1].id;
    return !completedLevels.includes(prevLevelId);
  };

  const handleLevelClick = (level: any, index: number) => {
    if (isLevelLocked(index)) {
        showToastMessage("Complete previous memory first 🔒");
        return;
    }
    setSelectedLevel(level);
  };

  const showToastMessage = (msg: string) => {
      setShowToast({ message: msg, visible: true });
      setTimeout(() => setShowToast(prev => ({ ...prev, visible: false })), 3000);
  };

  const openLevel = () => {
    if (!selectedLevel) return;
    
    // Mark as complete if not already
    if (!completedLevels.includes(selectedLevel.id)) {
        const newCompleted = [...completedLevels, selectedLevel.id];
        setCompletedLevels(newCompleted);
        localStorage.setItem("completedLevels", JSON.stringify(newCompleted));
    }

    // Navigation Logic
    if (selectedLevel.id === 'vc') router.push('/gallery'); 
    else if (selectedLevel.id === 'hug') router.push('/level/hug'); 
    else router.push(`/level/${selectedLevel.id}`);
  };

  const scrollToLatest = () => {
      // Find the last unlocked index
      let lastUnlockedIndex = 0;
      siteData.levels.forEach((_, i) => {
          if (!isLevelLocked(i)) lastUnlockedIndex = i;
      });

      // Calculate approximate position (50 + index * 160)
      const yPos = 50 + lastUnlockedIndex * 160;
      window.scrollTo({ top: yPos + 300, behavior: 'smooth' }); // +offset for header
  };

  // Render function for the Curvy Path nodes
  const renderLevelNode = (level: any, index: number, isLeft: boolean) => {
    const Icon = iconMap[level.icon] || Heart;
    const locked = isLevelLocked(index);
    const completed = completedLevels.includes(level.id);

    return (
        <div className={`flex items-center gap-6 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
             {/* The Button Node */}
             <div className="relative group">
                {/* Connector dot to path */}
                <div className={`absolute top-1/2 ${isLeft ? "-right-8" : "-left-8"} w-8 h-[2px] bg-indigo-200/50 -translate-y-1/2`} />

                <motion.button
                    whileHover={!locked ? { scale: 1.1, rotate: isLeft ? -5 : 5 } : {}}
                    whileTap={!locked ? { scale: 0.95 } : {}}
                    onClick={() => handleLevelClick(level, index)}
                    className={`
                        relative w-24 h-24 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.25)] transition-all duration-300 border-[4px]
                        ${locked 
                            ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed" 
                            : `${level.color} border-white text-white hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.8)]`
                        }
                        ${completed ? "ring-4 ring-green-400 ring-offset-4" : ""}
                    `}
                >
                    {locked ? <Lock size={32} strokeWidth={2.5} /> : <Icon size={40} strokeWidth={2.5} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />}
                    
                    {/* Completion Badge */}
                    {completed && (
                         <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-green-400 text-white rounded-full p-1 border-2 border-white shadow-sm z-20"
                         >
                            <CheckCircle2 size={12} strokeWidth={3} />
                        </motion.div>
                    )}
                </motion.button>
             </div>

             {/* Label Tooltip - EXTREME VISIBILITY FOR MOBILE */}
             <motion.div 
                initial={{ opacity: 0, x: isLeft ? -10 : 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white px-5 py-3 rounded-2xl text-center shadow-2xl border-4 border-indigo-400"
                style={{
                    backgroundColor: '#ffffff',
                    opacity: 1,
                }}
             >
                <h3 className="font-black text-lg text-black leading-tight" style={{ fontFamily: 'var(--font-comic)', WebkitTextStroke: '0.5px black' }}>{level.title}</h3>
                <div className="text-xs text-black font-black uppercase tracking-wider mt-1.5 flex justify-center items-center gap-2">
                    {index + 1} <span className="w-2 h-2 rounded-full bg-black" /> {level.group || "Memory"}
                </div>
             </motion.div>
        </div>
    );
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen pb-32 relative overflow-x-hidden selection:bg-pink-100">
       <MusicPlayer />
       
       {/* Sticky Mini Header */}
       <div className="fixed top-0 left-0 right-0 z-40 px-6 py-4 pointer-events-none">
           <div className="flex justify-between items-start">
               <motion.div 
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/50 pointer-events-auto flex items-center gap-2"
                >
                   <span className="text-xl">✈️</span>
                   <div>
                       <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">Journey</div>
                       <div className="text-xs font-bold text-gray-800 leading-none mt-0.5">
                           {completedLevels.length} / {siteData.levels.length} Unlocked
                       </div>
                   </div>
               </motion.div>
           </div>
       </div>

      <header className="pt-24 pb-12 px-6 text-center relative z-10">
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
            className="inline-block mb-4 relative"
        >
             <div className="text-6xl filter drop-shadow-sm">💌</div>
             <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -right-2 text-2xl"
             >
                 ✨
             </motion.div>
        </motion.div>
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-800 mb-3 drop-shadow-sm tracking-tight"
            style={{ fontFamily: "var(--font-comic)" }}
        >
            {siteData.hero.title}
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-indigo-400 font-bold text-lg tracking-wide uppercase text-xs"
        >
            {siteData.hero.subtitle}
        </motion.p>
      </header>

      {/* Timeline with better integration */}
      <div className="mb-16 relative z-10">
          <Timeline />
      </div>

      <div className="relative z-10">
        {/* Start Label */}
        <div className="text-center mb-8">
            <motion.div 
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex flex-col items-center gap-2"
            >
                <span className="bg-white/80 backdrop-blur-md text-indigo-500 px-6 py-2 rounded-full text-sm font-bold shadow-sm border border-white/50">
                    Start Here
                </span>
                <ArrowDown size={16} className="text-indigo-300" />
            </motion.div>
        </div>

        {/* The Curvy Path */}
        <CurvyPath 
            items={siteData.levels} 
            renderItem={renderLevelNode}
            isMusicPlaying={isMusicPlaying}
        />

         {/* Floating Menu Buttons */}
         <div className="mt-24 flex flex-col items-center gap-4 relative z-20 px-6 pb-12">
            <div className="w-full max-w-xs grid grid-cols-2 gap-3">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/videos')}
                    className="bg-white/80 backdrop-blur-sm py-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-indigo-600 font-bold shadow-sm hover:shadow-md transition-all border border-white/60"
                >
                    <PlayCircle size={24} className="text-indigo-400" />
                    <span className="text-sm">Videos</span>
                </motion.button>
                
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/letters')}
                    className="bg-white/80 backdrop-blur-sm py-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-pink-600 font-bold shadow-sm hover:shadow-md transition-all border border-white/60"
                >
                    <Heart size={24} className="text-pink-400" />
                    <span className="text-sm">Letters</span>
                </motion.button>
            </div>

             <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/final')}
                className="bg-gray-900 text-white w-full max-w-xs py-5 rounded-2xl font-bold shadow-xl hover:bg-black transition-colors flex items-center justify-center gap-2 mt-4"
            >
                <Star size={18} className="text-yellow-400" fill="currentColor" />
                The Finale
            </motion.button>
         </div>
      </div>
      
      {/* Bucket List Section */}
      <BucketList />

      {/* Floating Jump Button */}
      <motion.button
          onClick={scrollToLatest}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-24 right-6 z-30 bg-white text-indigo-500 p-3 rounded-full shadow-lg border border-indigo-100"
      >
          <ArrowDown size={20} />
      </motion.button>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast.visible && (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[80] bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium whitespace-nowrap"
            >
                {showToast.message}
            </motion.div>
        )}
      </AnimatePresence>

      {/* Level Bottom Sheet */}
      <LevelBottomSheet 
        isOpen={!!selectedLevel}
        onClose={() => setSelectedLevel(null)}
        level={selectedLevel}
        onOpenLevel={openLevel}
        isLocked={selectedLevel && isLevelLocked(siteData.levels.findIndex(l => l.id === selectedLevel.id))}
       />
     </div>
    </ProtectedRoute>
  );
}
