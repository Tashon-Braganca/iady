"use client";

import { motion } from "framer-motion";
import { siteData } from "@/content/siteData";
import { CheckSquare } from "lucide-react";

export default function BucketList() {
  return (
    <div className="py-12 px-8 max-w-md mx-auto glass-panel rounded-[2.5rem] shadow-xl mt-12 mb-12 relative overflow-hidden">
       {/* Decorative Header */}
       <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-200 via-pink-200 to-blue-200 opacity-50" />
       
       <div className="flex items-center justify-center gap-3 mb-10 mt-2">
            <CheckSquare className="text-blue-400" size={28} />
            <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: "var(--font-comic)" }}>Our Future</h2>
       </div>

       <ul className="space-y-5">
            {siteData.bucketList.map((item, index) => (
                <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex items-start gap-4 text-gray-600 hover:text-gray-900 transition-colors cursor-default"
                >
                    <div className="mt-2 w-3 h-3 rounded-md border-2 border-pink-300 group-hover:bg-pink-400 group-hover:border-pink-400 transition-colors shrink-0" />
                    <span className="text-lg font-medium decoration-gray-300 group-hover:line-through transition-all decoration-4 decoration-wavy">{item}</span>
                </motion.li>
            ))}
       </ul>
       
       <div className="text-center mt-10">
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">...and a million more things.</p>
       </div>
    </div>
  );
}
