"use client";

import { motion } from "framer-motion";
import { siteData } from "@/content/siteData";
import { Instagram, Heart, Lock, Calendar } from "lucide-react";

const iconMap: any = {
    Instagram, Heart, Lock
};

export default function Timeline() {
  return (
    <div className="py-12 px-6 relative max-w-md mx-auto">
       <h2 className="text-center font-serif text-2xl font-bold text-gray-800 mb-12">Our Story</h2>
       
       <div className="relative border-l-2 border-blue-200 ml-6 space-y-12">
            {siteData.timeline.map((item, index) => {
                const Icon = iconMap[item.icon] || Calendar;
                return (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="relative pl-8"
                    >
                        {/* Dot */}
                        <div className="absolute -left-[9px] top-1 bg-white border-4 border-blue-300 w-4 h-4 rounded-full" />
                        
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{item.date}</span>
                            <div className="flex items-center gap-2">
                                <Icon size={16} className="text-gray-400" />
                                <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                        </div>
                    </motion.div>
                );
            })}
            
            {/* Continuing Line Gradient */}
             <div className="absolute left-[-2px] bottom-0 w-[2px] h-24 bg-gradient-to-b from-blue-200 to-transparent" />
       </div>
    </div>
  );
}
