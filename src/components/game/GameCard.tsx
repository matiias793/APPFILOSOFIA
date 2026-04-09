"use client";

import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GameCardProps {
  id: string;
  content: string;
  type: "phrase" | "author";
  image?: string;
  isSelected: boolean;
  isMatched: boolean;
  isWrong: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function GameCard({
  content,
  type,
  image,
  isSelected,
  isMatched,
  isWrong,
  onClick,
  disabled
}: GameCardProps) {
  const isAuthor = type === "author";

  return (
    <motion.button
      layout
      whileTap={!isMatched ? { scale: 0.95 } : {}}
      whileHover={!disabled && !isMatched ? { scale: 1.05, y: -2 } : {}}
      animate={
        isWrong
          ? { x: [-10, 10, -10, 10, 0], backgroundColor: "#fee2e2" }
          : isMatched
          ? { scale: 1, backgroundColor: "#f0fdf4", borderColor: "#22c55e" }
          : isSelected
          ? { scale: 1.05, backgroundColor: "#eff6ff", borderColor: "#3b82f6" }
          : { backgroundColor: "#ffffff", borderColor: "#e5e7eb" }
      }
      transition={{ duration: 0.3 }}
      onClick={onClick}
      disabled={disabled || isMatched}
      className={cn(
        "group relative w-full p-4 rounded-3xl border-2 transition-all duration-300",
        "flex flex-col items-center justify-center gap-3 overflow-hidden shadow-sm",
        !disabled && !isMatched && "cursor-pointer hover:shadow-xl",
        isMatched && "border-green-500 shadow-lg shadow-green-100",
        isSelected && !isWrong && "border-blue-500 shadow-lg shadow-blue-100",
        isWrong && "border-red-500",
        "touch-none select-none",
        isAuthor ? "min-h-[160px]" : "min-h-[100px]"
      )}
    >
      {/* Background Glow for Matched */}
      {isMatched && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-green-500/5 blur-xl pointer-events-none"
        />
      )}

      {isAuthor && image && (
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-inner mb-2 group-hover:scale-110 transition-transform duration-300">
          <Image
            src={image}
            alt={content}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
      )}

      <span className={cn(
        "text-center font-medium leading-snug transition-colors duration-300",
        isAuthor ? "text-lg font-bold text-gray-800" : "text-base text-gray-700",
        isMatched && "text-green-700",
        isSelected && "text-blue-700",
        isWrong && "text-red-700"
      )}>
        {content}
      </span>

      {/* Connection Indicator */}
      {isMatched && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}
