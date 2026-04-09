"use client";

import { useState } from "react";
import HomeHub from "@/components/home/HomeHub";
import QuizGame from "@/components/game/QuizGame";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [view, setView] = useState<"home" | "game">("home");

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {view === "home" ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <HomeHub onStartGame={() => setView("game")} />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <QuizGame onBack={() => setView("home")} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
