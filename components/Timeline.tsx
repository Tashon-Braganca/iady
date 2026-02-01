"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/content/siteData";
import { Instagram, Heart, Lock, Calendar, X } from "lucide-react";

const iconMap: any = {
    Instagram, Heart, Lock
};

export default function Timeline() {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <>
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
                              <div className="absolute -left-[9px] top-1 bg-white border-4 border-blue-300 w-4 h-4 rounded-full z-10" />
                              
                              <div 
                                onClick={() => setSelectedItem(item)}
                                className="flex flex-col gap-1 bg-white/90 backdrop-blur-sm p-4 -ml-2 rounded-xl transition-all cursor-pointer relative z-20 active:scale-95 shadow-md hover:shadow-lg border border-white/50"
                              >
                                  <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">{item.date}</span>
                                  <div className="flex items-center gap-2">
                                      <Icon size={18} className="text-blue-400" />
                                      <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                                  </div>
                                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                              </div>
                          </motion.div>
                      );
              })}
              
              {/* Continuing Line Gradient */}
               <div className="absolute left-[-2px] bottom-0 w-[2px] h-24 bg-gradient-to-b from-blue-200 to-transparent" />
         </div>
      </div>

      {/* Pop-up Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-[90vw]"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                {(() => {
                  const Icon = iconMap[selectedItem.icon] || Calendar;
                  return <Icon size={20} className="text-blue-400" />;
                })()}
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{selectedItem.date}</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedItem.title}</h3>
              <p className="text-gray-600">{selectedItem.description}</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
