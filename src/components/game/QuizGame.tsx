"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import GameCard from "./GameCard";
import SuccessModal from "./SuccessModal";
import { gamePairs, GamePair } from "@/data/gameData";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";
import { Timer, Volume2, VolumeX, ArrowLeft, CheckCircle2, HelpCircle, Lightbulb } from "lucide-react";
import confetti from "canvas-confetti";
import Image from "next/image";

interface QuizGameProps {
  onBack: () => void;
}

export default function QuizGame({ onBack }: QuizGameProps) {
  const { playSuccess, playError, isMuted, toggleMute } = useAudio();
  
  // Game state
  const [shuffledQuestions, setShuffledQuestions] = useState<GamePair[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [choices, setChoices] = useState<GamePair[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Timer state
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Hint state
  const [showHint, setShowHint] = useState(false);
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = shuffledQuestions[currentIndex];

  const shuffle = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getChoices = useCallback((correctPair: GamePair) => {
    const others = gamePairs.filter(p => p.id !== correctPair.id);
    const distractors = shuffle(others).slice(0, 2);
    return shuffle([correctPair, ...distractors]);
  }, []);

  const initGame = useCallback(() => {
    // Reset all states
    const shuffled = shuffle(gamePairs);
    setShuffledQuestions(shuffled);
    setCurrentIndex(0);
    setChoices(getChoices(shuffled[0]));
    setCompleted([]);
    setSelectedId(null);
    setIsCorrect(null);
    setSeconds(0);
    setIsActive(true);
    setShowSuccess(false);
    setShowHint(false);
    
    // Clear and restart timer
    if (timerRef.current) clearInterval(timerRef.current);
    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  }, [getChoices]);

  useEffect(() => {
    initGame();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [initGame]);

  const handleChoice = (id: number) => {
    if (selectedId !== null) return;
    
    // Hide hint if it was visible
    setShowHint(false);
    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);

    setSelectedId(id);
    const correct = id === currentQuestion.id;
    setIsCorrect(correct);

    if (correct) {
      playSuccess();
      setCompleted(prev => [...prev, id]);
      
      setTimeout(() => {
        if (currentIndex < shuffledQuestions.length - 1) {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          setChoices(getChoices(shuffledQuestions[nextIndex]));
          setSelectedId(null);
          setIsCorrect(null);
          setShowHint(false); // Ensure hint is reset for next question
        } else {
          // Finish
          if (timerRef.current) clearInterval(timerRef.current);
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
          setTimeout(() => setShowSuccess(true), 1000);
        }
      }, 1500);
    } else {
      playError();
      setTimeout(() => {
        setSelectedId(null);
        setIsCorrect(null);
      }, 1000);
    }
  };

  const handleShowHint = () => {
    if (showHint || selectedId !== null) return;
    
    // Penalización
    setSeconds(prev => prev + 5);
    setShowHint(true);

    // Auto-cierre en 5 segundos
    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    hintTimeoutRef.current = setTimeout(() => {
      setShowHint(false);
    }, 5000);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      {/* HUD */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all font-bold text-slate-600"
        >
          <ArrowLeft className="w-5 h-5" />
          Salir
        </button>

        <div className="bg-white px-6 py-2 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-lg font-black text-blue-600">
            <Timer className="w-5 h-5" />
            {formatTime(seconds)}
          </div>
          <div className="w-[2px] h-6 bg-slate-100" />
          <div className="text-slate-400 font-bold text-sm">
            {currentIndex + 1} / {shuffledQuestions.length}
          </div>
        </div>

        <button
          onClick={toggleMute}
          className="p-4 bg-white rounded-full border border-slate-100 shadow-sm text-blue-600"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      <div className="w-full max-w-2xl flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-8"
            >
              {/* Question Card */}
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-white text-center relative overflow-visible">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-6">
                  <HelpCircle className="w-4 h-4" />
                  ¿A quién le pertenece esta frase?
                </div>
                
                <div className="flex flex-col items-center gap-4">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                    "{currentQuestion.phrase}"
                  </h2>

                  {/* Inline Hint Container */}
                  <AnimatePresence>
                    {showHint && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        className="w-full overflow-hidden"
                      >
                        <div className="bg-amber-50 border-2 border-amber-100 p-5 rounded-[2rem] text-amber-900 italic text-sm md:text-base font-medium leading-relaxed shadow-inner">
                          <div className="flex items-start gap-3">
                            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <span>{currentQuestion.hint}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Hint Button */}
                  <div className="relative mt-2">
                    <button
                      onClick={handleShowHint}
                      disabled={selectedId !== null || showHint}
                      className={`
                        flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold transition-all duration-300
                        ${showHint 
                          ? 'bg-amber-100 text-amber-600 border-amber-200 opacity-50' 
                          : 'bg-slate-50 text-slate-400 hover:text-amber-500 hover:bg-amber-50 border-slate-100 hover:border-amber-100'
                        }
                        border shadow-sm
                      `}
                    >
                      <Lightbulb className={`w-5 h-5 ${showHint ? 'fill-amber-500' : ''}`} />
                      <span className="text-sm">¿Necesitas una pista? (+5s)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Choices Grid */}
              <div className="grid gap-4">
                {choices.map((choice) => (
                  <motion.button
                    key={choice.id}
                    whileHover={selectedId === null ? { scale: 1.02 } : {}}
                    whileTap={selectedId === null ? { scale: 0.98 } : {}}
                    onClick={() => handleChoice(choice.id)}
                    disabled={selectedId !== null}
                    className={`
                      relative w-full p-6 rounded-[2rem] border-2 flex items-center gap-5 transition-all duration-300
                      ${selectedId === choice.id 
                        ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                        : 'border-slate-100 bg-white hover:border-blue-400'
                      }
                      ${selectedId !== null && choice.id === currentQuestion.id && !isCorrect ? 'border-green-300 bg-green-50/50' : ''}
                    `}
                  >
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                      <Image src={choice.image} alt={choice.author} fill className="object-cover" />
                    </div>
                    <span className={`text-xl font-black ${selectedId === choice.id ? (isCorrect ? 'text-green-700' : 'text-red-700') : 'text-slate-800'}`}>
                      {choice.author}
                    </span>
                    
                    {selectedId === choice.id && (
                      <div className="ml-auto">
                        {isCorrect ? (
                          <div className="bg-green-500 text-white p-2 rounded-full shadow-lg shadow-green-200">
                             <CheckCircle2 className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="bg-red-500 text-white p-2 rounded-full shadow-lg shadow-red-200">
                             <span className="text-lg leading-none">✕</span>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-2xl mt-8">
        <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(currentIndex / shuffledQuestions.length) * 100}%` }}
            className="h-full bg-blue-600 rounded-full"
          />
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccess} 
        onRestart={initGame} 
        time={formatTime(seconds)} 
        score={Math.max(1000 - seconds * 5, 0)}
      />
    </div>
  );
}
