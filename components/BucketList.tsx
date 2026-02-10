"use client";

import { motion } from "framer-motion";
import { siteData } from "@/content/siteData";
import { CheckSquare } from "lucide-react";
import { useState } from "react";

export default function BucketList() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (checkedItems.includes(index)) {
      setCheckedItems(checkedItems.filter((i) => i !== index));
    } else {
      setCheckedItems([...checkedItems, index]);
    }
  };

  return (
    <div className="py-10 px-8 max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] mt-16 mb-24 relative overflow-visible border border-white/60">
       {/* Tape effect at top */}
       <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#f0f0f0]/80 rotate-2 shadow-sm backdrop-blur-sm z-10" />

       <div className="flex items-center justify-center gap-3 mb-8 mt-2">
            <div className="bg-blue-100 p-3 rounded-full text-blue-500">
                <CheckSquare size={24} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight" style={{ fontFamily: "var(--font-comic)" }}>Our Future</h2>
       </div>

       <ul className="space-y-4">
            {siteData.bucketList.map((item, index) => {
                const isChecked = checkedItems.includes(index);
                return (
                    <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white/50 transition-colors cursor-pointer select-none"
                        onClick={() => toggleItem(index)}
                    >
                        <div className={`mt-1.5 w-5 h-5 rounded-md border-2 transition-colors shrink-0 flex items-center justify-center ${isChecked ? 'border-pink-400 bg-pink-400' : 'border-pink-200 bg-white group-hover:border-pink-400'}`}>
                             {/* Checkmark */}
                             {isChecked && (
                                <motion.svg 
                                    initial={{ scale: 0 }} 
                                    animate={{ scale: 1 }} 
                                    className="w-3.5 h-3.5 text-white" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor" 
                                    strokeWidth={3}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </motion.svg>
                             )}
                        </div>
                        <span className={`text-base font-medium transition-all duration-300 relative ${isChecked ? 'text-gray-400 line-through decoration-pink-300' : 'text-gray-600 group-hover:text-gray-900'}`}>
                            {item}
                        </span>
                    </motion.li>
                );
            })}
       </ul>
       
       <div className="text-center mt-8 pb-2">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest opacity-60">...and a million more things</p>
       </div>
    </div>
  );
}
