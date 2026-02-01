"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface CurvyPathProps {
  items: any[];
  renderItem: (item: any, index: number, isLeft: boolean) => React.ReactNode;
  isMusicPlaying?: boolean;
}

export default function CurvyPath({ items, renderItem, isMusicPlaying }: CurvyPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(1000);
  
  // Refined vertical spacing
  const START_Y = 50;
  const ITEM_SPACING = 160; 

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Create a drawing effect that is slightly ahead of scroll
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1.2]);

  useEffect(() => {
    setSvgHeight(items.length * ITEM_SPACING + 100);
  }, [items.length]);

  // Generate a path that passes through the item centers
  // Items are at: x = 25 or 75, y = START_Y + i * ITEM_SPACING
  const generateSnakePath = () => {
    let path = `M 50 0`; // Start top center

    items.forEach((_, i) => {
        const isLeft = i % 2 === 0;
        const x = isLeft ? 25 : 75;
        const y = START_Y + i * ITEM_SPACING;
        
        const prevY = i === 0 ? 0 : START_Y + (i - 1) * ITEM_SPACING;
        const prevX = i === 0 ? 50 : ( (i-1) % 2 === 0 ? 25 : 75 );
        
        // Control points for smooth curve
        const cp1x = prevX;
        const cp1y = prevY + (y - prevY) * 0.5;
        
        const cp2x = x;
        const cp2y = y - (y - prevY) * 0.5;
        
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
    });

    return path;
  };

  const d = generateSnakePath();

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto mb-24" style={{ height: svgHeight }}>
      {/* SVG Path Layer */}
      <svg 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible" 
        viewBox={`0 0 100 ${svgHeight}`} 
        preserveAspectRatio="none"
      >
        {/* Glow Effect when Music is Playing */}
        {isMusicPlaying && (
             <motion.path 
                d={d} 
                stroke="#60A5FA" 
                strokeWidth="12" 
                fill="none" 
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="blur-xl"
            />
        )}

        {/* 1. Stitched/Dotted Underlay (Sewing look) */}
        <path 
            d={d} 
            stroke="#e2e8f0" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round"
        />
        <path 
            d={d} 
            stroke="#94a3b8" 
            strokeWidth="1.5" 
            fill="none" 
            strokeDasharray="2 6"
            strokeLinecap="round"
            className="opacity-40"
        />
        
        {/* 2. Progress Path (Pastel Gradient feel via solid color for now, can use gradient defs if needed) */}
        {/* Using a nice pastel blue/indigo */}
        <motion.path 
            d={d} 
            stroke="#818cf8" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round"
            style={{ pathLength }}
            className="drop-shadow-sm"
        />
      </svg>

      {/* Items Layer */}
      {items.map((item, index) => {
        const isLeft = index % 2 === 0;
        const xPos = isLeft ? 25 : 75; // %
        const yPos = START_Y + index * ITEM_SPACING;
        
        return (
             <div 
                key={index} 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 w-auto"
                style={{ 
                    left: `${xPos}%`, 
                    top: `${yPos}px`
                }}
             >
                {renderItem(item, index, isLeft)}
             </div>
        );
      })}
    </div>
  );
}
