"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { siteData } from "@/content/siteData";

export default function GalleryPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4 md:p-8">
      <header className="flex items-center justify-between mb-8 sticky top-0 z-20 bg-[#FDFBF7]/80 backdrop-blur-md py-4 -mx-4 px-4 border-b border-gray-100/50">
        <button
          onClick={() => router.back()}
          className="bg-white p-3 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-gray-100 text-gray-600 active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Our Memories</h1>
        <div className="w-10" />
      </header>

      {/* Masonry Layout - optimized columns */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 pb-20">
        {siteData.gallery.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ delay: index * 0.05 }}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm bg-gray-100 cursor-zoom-in"
            onClick={() => setSelectedImage(photo.src)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md"
                onClick={() => setSelectedImage(null)}
            >
                <button className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full backdrop-blur-sm">
                    <X size={24} />
                </button>
                <motion.img
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    src={selectedImage}
                    className="max-w-full max-h-screen rounded-md shadow-2xl"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                />
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
