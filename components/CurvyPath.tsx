"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

interface CurvyPathProps {
  items: any[];
  renderItem: (item: any, index: number, isLeft: boolean) => React.ReactNode;
  isMusicPlaying?: boolean;
}

export default function CurvyPath({ items, renderItem, isMusicPlaying }: CurvyPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(1000);
  
  const START_Y = 50;
  const ITEM_SPACING = 160; 

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]); // Sync with train
  const trainProgressRaw = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const trainOffset = useMotionTemplate`${trainProgressRaw}%`;

  useEffect(() => {
    setSvgHeight(items.length * ITEM_SPACING + 100);
  }, [items.length]);

  const generateSnakePath = () => {
    let path = `M 50 0`;

    items.forEach((_, i) => {
        const isLeft = i % 2 === 0;
        const x = isLeft ? 25 : 75;
        const y = START_Y + i * ITEM_SPACING;
        
        const prevY = i === 0 ? 0 : START_Y + (i - 1) * ITEM_SPACING;
        const prevX = i === 0 ? 50 : ( (i-1) % 2 === 0 ? 25 : 75 );
        
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
      {/* SVG Path Layer - TRAIN TRACKS */}
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
                strokeWidth="20" 
                fill="none" 
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="blur-xl"
            />
        )}

        {/* 1. Track Bed (Ballast) */}
        <path 
            d={d} 
            stroke="#e5e7eb" 
            strokeWidth="14" 
            fill="none" 
            strokeLinecap="round"
            opacity="0.8"
        />

        {/* 2. Sleepers (Wooden Ties) */}
        {/* Using a thicker dashed line to simulate sleepers */}
        <path 
            d={d} 
            stroke="#5D4037" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="butt"
            strokeDasharray="1 4"
        />
        
        {/* 3. Rails (Steel) */}
        <path 
            d={d} 
            stroke="#374151" 
            strokeWidth="0.8" 
            fill="none" 
            strokeLinecap="round"
            transform="translate(-3, 0)"
        />
        <path 
            d={d} 
            stroke="#374151" 
            strokeWidth="0.8" 
            fill="none" 
            strokeLinecap="round"
            transform="translate(3, 0)"
        />

        {/* 4. Progress Fill (Golden/Magical) */}
        <motion.path 
            d={d} 
            stroke="#F59E0B" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round"
            style={{ pathLength }}
            className="drop-shadow-sm"
            transform="translate(-3, 0)"
        />
        <motion.path 
            d={d} 
            stroke="#F59E0B" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round"
            style={{ pathLength }}
            className="drop-shadow-sm"
            transform="translate(3, 0)"
        />

        {/* 5. Animated Train (INSIDE SVG to match coordinates) */}
        <motion.g
            style={{
                offsetPath: `path('${d}')`,
                offsetDistance: trainOffset,
                offsetRotate: 'auto',
            }}
        >
            {/* The train emoji centered on the path */}
            {/* Removed rotate(90) which was causing it to be sideways */}
            <text 
                x="0" 
                y="0" 
                fontSize="40" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))" }}
            >
                🚂
            </text>
        </motion.g>

      </svg>

      {/* Items Layer */}
      {items.map((item, index) => {
        const isLeft = index % 2 === 0;
        const xPos = isLeft ? 25 : 75;
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
