"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PlayCircle, Lock, Phone } from "lucide-react";

interface LevelBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  level: any;
  onOpenLevel: () => void;
  onOpenMemories?: () => void;
  isLocked?: boolean;
}

export default function LevelBottomSheet({ 
    isOpen, 
    onClose, 
    level, 
    onOpenLevel,
    onOpenMemories,
    isLocked = false 
}: LevelBottomSheetProps) {
    const sheetRef = useRef<HTMLDivElement>(null);

    // Close on Esc
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    if (!level) return null;

    const handleAction = () => {
        if (level.meetLink) {
            window.open(level.meetLink, '_blank');
        } else {
            onOpenLevel();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                        aria-hidden="true"
                    />

                    {/* Sheet */}
                    <motion.div
                        ref={sheetRef}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-[70] bg-[#FDFBF7] rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] max-h-[90vh] overflow-y-auto outline-none"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="sheet-title"
                        tabIndex={-1}
                    >
                        {/* Drag Handle */}
                        <div className="w-full flex justify-center pt-4 pb-2" onClick={onClose}>
                            <div className="w-12 h-1.5 bg-gray-200 rounded-full cursor-pointer" />
                        </div>

                        <div className="p-6 pb-12 max-w-lg mx-auto">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex gap-4">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${level.color || "bg-gray-100"}`}>
                                        <span className="drop-shadow-sm">✨</span>
                                    </div>
                                    <div>
                                        <h2 id="sheet-title" className="text-2xl font-bold text-gray-800 leading-tight">
                                            {level.title}
                                        </h2>
                                        <p className="text-gray-500 font-medium text-sm mt-1">
                                            {level.description}
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-500"
                                    aria-label="Close"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Photo Strip */}
                            {level.previewImages && level.previewImages.length > 0 && (
                                <div className="mb-8 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                                    <div className="flex gap-3">
                                        {level.previewImages.map((src: string, i: number) => (
                                            <div 
                                                key={i} 
                                                className="relative flex-shrink-0 w-32 h-40 bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-100 rotate-1 first:-rotate-1 even:rotate-1"
                                            >
                                                <img 
                                                    src={src} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Memory Notes */}
                            {level.memoryNotes && level.memoryNotes.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Memory Fragments</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {level.memoryNotes.map((note: string, i: number) => (
                                            <span 
                                                key={i} 
                                                className="px-3 py-1.5 bg-white border border-gray-100 rounded-full text-sm text-gray-600 shadow-sm"
                                            >
                                                {note}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3 mt-4">
                                {level.meetLink ? (
                                    <>
                                        <button
                                            onClick={() => onOpenMemories?.()}
                                            className="flex-1 py-4 rounded-xl border border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                                        >
                                            Open Memories
                                        </button>
                                        <button
                                            onClick={handleAction}
                                            disabled={isLocked}
                                            className={`
                                                flex-1 py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2
                                                ${isLocked ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 hover:scale-[1.02]"}
                                            `}
                                        >
                                            {isLocked ? <Lock size={18} /> : <Phone size={18} />}
                                            {isLocked ? "Locked" : "Call Now 📞"}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={onClose}
                                            className="flex-1 py-4 rounded-xl border border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                                        >
                                            Later
                                        </button>
                                        <button
                                            onClick={handleAction}
                                            disabled={isLocked}
                                            className={`
                                                flex-1 py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2
                                                ${isLocked ? "bg-gray-300 cursor-not-allowed" : level.meetLink ? "bg-green-600 hover:bg-green-700 hover:scale-[1.02]" : "bg-gray-900 hover:scale-[1.02]"}
                                            `}
                                        >
                                            {isLocked ? <Lock size={18} /> : level.meetLink ? <Phone size={18} /> : <PlayCircle size={18} />}
                                            {isLocked ? "Locked" : level.meetLink ? "Call Now 📞" : "Open Memory"}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
