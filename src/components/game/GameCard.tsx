"use client";

import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GameCardProps {
  id: string;
  content: string;
  type: "phrase" | "author";
  isSelected: boolean;
  isMatched: boolean;
  isWrong: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function GameCard({
  content,
  isSelected,
  isMatched,
  isWrong,
  onClick,
  disabled
}: GameCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      animate={
        isWrong
          ? { x: [-5, 5, -5, 5, 0], backgroundColor: "#fee2e2" }
          : isMatched
          ? { scale: 1, backgroundColor: "#dcfce7", borderColor: "#22c55e" }
          : isSelected
          ? { backgroundColor: "#dbeafe", borderColor: "#3b82f6" }
          : { backgroundColor: "#ffffff", borderColor: "#e5e7eb" }
      }
      transition={{ duration: 0.2 }}
      onClick={onClick}
      disabled={disabled || isMatched}
      className={cn(
        "w-full min-h-[80px] p-4 text-center rounded-2xl border-2 transition-shadow duration-200",
        "flex items-center justify-center text-sm md:text-base font-medium leading-tight",
        "shadow-sm hover:shadow-md",
        "active:shadow-inner",
        !disabled && !isMatched && "cursor-pointer",
        isMatched && "text-green-700 bg-green-50 border-green-500 cursor-default",
        isSelected && !isWrong && "border-blue-500 bg-blue-50 text-blue-700",
        isWrong && "border-red-500 text-red-700",
        "touch-none select-none" // Prevents accidental zoom and selection
      )}
      style={{ minHeight: "44px" }} // Ensure touch-first sizing target
    >
      {content}
    </motion.button>
  );
}
