"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/content/siteData";
import { Instagram, Heart, Lock, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";

const iconMap: any = {
    Instagram, Heart, Lock
};

export default function Timeline() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleOpen = (item: any) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedItem.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem?.images) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length);
  };

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
                                onClick={() => handleOpen(item)}
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-white rounded-2xl p-4 shadow-2xl w-auto max-w-[90vw] overflow-hidden flex flex-col"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-gray-100 transition-colors z-20 shadow-sm"
              >
                <X size={20} />
              </button>

              {/* Image Container */}
              <div className="relative rounded-xl overflow-hidden shadow-inner mb-4 flex-shrink-0 group" style={{ maxHeight: '60vh' }}>
                <img 
                  src={selectedItem.images ? selectedItem.images[currentImageIndex] : selectedItem.image} 
                  alt={selectedItem.title}
                  className="w-auto h-auto max-h-[60vh] object-contain mx-auto transition-all duration-300"
                />
                
                {/* Navigation Arrows */}
                {selectedItem.images && selectedItem.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={20} />
                    </button>
                    
                    {/* Dots Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {selectedItem.images.map((_: any, idx: number) => (
                        <div 
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1 min-w-[280px]">
                  <div className="flex items-center gap-2 mb-1">
                    {(() => {
                      const Icon = iconMap[selectedItem.icon] || Calendar;
                      return <Icon size={18} className="text-blue-400" />;
                    })()}
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{selectedItem.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 leading-tight">{selectedItem.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{selectedItem.description}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
