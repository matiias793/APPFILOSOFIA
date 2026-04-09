"use client";

import { motion } from "framer-motion";
import { Play, BookOpen, Brain, Settings } from "lucide-react";
import Image from "next/image";

interface HomeHubProps {
  onStartGame: () => void;
}

export default function HomeHub({ onStartGame }: HomeHubProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 max-w-lg w-full"
      >
        <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-white">
          {/* Logo / Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 bg-blue-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg shadow-blue-200"
          >
            <Brain className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            APP <span className="text-blue-600">PEDAGOGÍA</span>
          </h1>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed font-semibold">
            Explora los cimientos del pensamiento educativo a través de desafíos dinámicos.
          </p>

          {/* Game Selection Grid */}
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartGame}
              className="w-full relative group overflow-hidden bg-white hover:bg-slate-50 border-2 border-slate-100 hover:border-blue-500 p-6 rounded-[2rem] flex items-center gap-6 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                <BookOpen className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Maestros del Pensamiento</h3>
                <p className="text-sm text-slate-500 font-medium">Desafío de frases y autores</p>
              </div>
              <div className="ml-auto bg-slate-100 p-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Play className="w-5 h-5 fill-current" />
              </div>
            </motion.button>

            {/* Placeholder for future games */}
            <div className="opacity-40 grayscale pointer-events-none">
              <div className="w-full bg-slate-200/50 border-2 border-dashed border-slate-300 p-6 rounded-[2rem] flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-300 rounded-2xl" />
                <div className="text-left">
                  <h3 className="text-xl font-bold text-slate-400">Próximamente...</h3>
                  <p className="text-sm text-slate-400">Nuevos juegos educativos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
