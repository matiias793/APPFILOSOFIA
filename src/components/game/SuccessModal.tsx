"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCcw, Info, CheckCircle2 } from "lucide-react";
import { gamePairs } from "@/data/gameData";
import Image from "next/image";
import { useState } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onRestart: () => void;
  time: string;
  score: number;
}

export default function SuccessModal({ isOpen, onRestart, time, score }: SuccessModalProps) {
  const [selectedAuthor, setSelectedAuthor] = useState<number | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl overflow-y-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden my-8"
          >
            {/* Header / Hero Section */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-12 text-white text-center relative overflow-hidden">
              <motion.div
                initial={{ rotate: -20, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                className="inline-block bg-white/20 p-4 rounded-3xl mb-6 backdrop-blur-sm"
              >
                <Trophy className="w-16 h-16 text-yellow-300" />
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">¡Vitoria Magistral!</h2>
              <p className="text-blue-100 text-lg max-w-md mx-auto font-medium">
                Has demostrado un dominio excepcional de los pilares de la pedagogía.
              </p>

              {/* Stats Bar */}
              <div className="flex justify-center gap-4 mt-8">
                <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
                  <span className="block text-xs uppercase font-bold text-blue-200">Tiempo</span>
                  <span className="text-2xl font-black">{time}</span>
                </div>
                <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
                  <span className="block text-xs uppercase font-bold text-blue-200">Puntaje</span>
                  <span className="text-2xl font-black">{score}</span>
                </div>
              </div>
            </div>

            {/* Content Section: Author Gallery */}
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                Resumen de los Maestros
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {gamePairs.map((author) => (
                  <motion.div
                    key={author.id}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedAuthor(author.id)}
                    className="cursor-pointer group"
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-100 mb-2 group-hover:border-blue-400 transition-colors">
                      <Image
                        src={author.image}
                        alt={author.author}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-white text-xs font-bold flex items-center gap-1">
                          <Info className="w-3 h-3" /> Saber más
                        </span>
                      </div>
                    </div>
                    <p className="text-center text-sm font-bold text-slate-700 leading-tight">{author.author}</p>
                  </motion.div>
                ))}
              </div>

              {/* Educational Fact Popover (Simulated as a simple conditional section) */}
              <AnimatePresence mode="wait">
                {selectedAuthor && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-8 p-6 bg-blue-50 border-2 border-blue-100 rounded-3xl"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="bg-blue-600 p-2 rounded-xl text-white">
                        <Info className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-black text-blue-900 mb-1">
                          {gamePairs.find(a => a.id === selectedAuthor)?.author}
                        </h4>
                        <p className="text-blue-800 leading-relaxed italic">
                          "{gamePairs.find(a => a.id === selectedAuthor)?.details}"
                        </p>
                      </div>
                      <button 
                        onClick={() => setSelectedAuthor(null)}
                        className="ml-auto text-blue-400 hover:text-blue-600 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onRestart}
                  className="flex-1 flex items-center justify-center gap-2 py-5 px-8 bg-slate-900 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <RotateCcw className="w-6 h-6" />
                  Jugar de Nuevo
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
