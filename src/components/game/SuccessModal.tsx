"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCcw } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onRestart: () => void;
}

export default function SuccessModal({ isOpen, onRestart }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl text-center"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="bg-yellow-100 p-4 rounded-full">
                <Trophy className="w-12 h-12 text-yellow-600" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-900 mb-2"
            >
              ¡Excelente trabajo!
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-8"
            >
              Has relacionado correctamente todos los autores con sus frases pedagógicas.
            </motion.p>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={onRestart}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-blue-600 text-white rounded-2xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Volver a jugar
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
