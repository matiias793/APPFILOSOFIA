"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import GameCard from "./GameCard";
import SuccessModal from "./SuccessModal";
import { gamePairs, GamePair } from "@/data/gameData";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";
import { Timer, Volume2, VolumeX, RefreshCcw } from "lucide-react";
import confetti from "canvas-confetti";

interface ShuffledItem {
  id: number;
  content: string;
  image?: string;
  type: "phrase" | "author";
}

export default function MatchingGame() {
  const { playSuccess, playError, isMuted, toggleMute } = useAudio();
  
  const [shuffledPhrases, setShuffledPhrases] = useState<ShuffledItem[]>([]);
  const [shuffledAuthors, setShuffledAuthors] = useState<ShuffledItem[]>([]);
  
  const [selectedPhraseId, setSelectedPhraseId] = useState<number | null>(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState<number | null>(null);
  
  const [matches, setMatches] = useState<number[]>([]);
  const [wrongMatch, setWrongMatch] = useState<{ phraseId: number; authorId: number } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Timer state
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setIsActive(false);
    }
  };

  const shuffle = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initGame = () => {
    const phrases: ShuffledItem[] = gamePairs.map(p => ({ id: p.id, content: p.phrase, type: "phrase" }));
    const authors: ShuffledItem[] = gamePairs.map(p => ({ id: p.id, content: p.author, image: p.image, type: "author" }));
    
    setShuffledPhrases(shuffle(phrases));
    setShuffledAuthors(shuffle(authors));
    
    setMatches([]);
    setSelectedPhraseId(null);
    setSelectedAuthorId(null);
    setWrongMatch(null);
    setShowSuccess(false);
    setSeconds(0);
    stopTimer();
  };

  useEffect(() => {
    initGame();
    return () => stopTimer();
  }, []);

  // Handle Match Logic
  useEffect(() => {
    if (selectedPhraseId !== null && selectedAuthorId !== null) {
      if (selectedPhraseId === selectedAuthorId) {
        // Correct
        playSuccess();
        setMatches(prev => [...prev, selectedPhraseId]);
        setSelectedPhraseId(null);
        setSelectedAuthorId(null);
        
        if (matches.length + 1 === gamePairs.length) {
          stopTimer();
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#22c55e', '#facc15', '#f87171']
          });
          setTimeout(() => setShowSuccess(true), 1500);
        }
      } else {
        // Wrong
        playError();
        setWrongMatch({ phraseId: selectedPhraseId, authorId: selectedAuthorId });
        
        setTimeout(() => {
          setWrongMatch(null);
          setSelectedPhraseId(null);
          setSelectedAuthorId(null);
        }, 800);
      }
    }
  }, [selectedPhraseId, selectedAuthorId, matches.length, playSuccess, playError]);

  const handleSelectPhrase = (id: number) => {
    if (wrongMatch) return;
    if (!isActive) startTimer();
    setSelectedPhraseId(id);
  };

  const handleSelectAuthor = (id: number) => {
    if (wrongMatch) return;
    if (!isActive) startTimer();
    setSelectedAuthorId(id);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      {/* Top Bar: Timer & Audio */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-4 z-30 p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl">
          <Timer className="w-5 h-5 text-blue-600" />
          <span className="font-mono text-xl font-bold text-slate-800">{formatTime(seconds)}</span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={toggleMute}
            className="p-3 rounded-2xl hover:bg-slate-100 transition-colors"
            title={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? <VolumeX className="w-6 h-6 text-slate-400" /> : <Volume2 className="w-6 h-6 text-blue-600" />}
          </button>
          <button
            onClick={initGame}
            className="p-3 rounded-2xl hover:bg-slate-100 transition-colors"
            title="Reiniciar juego"
          >
            <RefreshCcw className="w-6 h-6 text-slate-600" />
          </button>
        </div>
      </div>

      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Genios de la <span className="text-blue-600">Pedagogía</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
          Pon a prueba tus conocimientos relacionando a cada filósofo con su pensamiento fundamental.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Phrases Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-slate-800">Frases Célebres</h2>
            <span className="text-sm font-semibold text-slate-400">Match: {matches.length}/5</span>
          </div>
          <div className="grid gap-4">
            {shuffledPhrases.map((item) => (
              <GameCard
                key={`phrase-${item.id}`}
                id={`phrase-${item.id}`}
                content={item.content}
                type="phrase"
                isSelected={selectedPhraseId === item.id}
                isMatched={matches.includes(item.id)}
                isWrong={wrongMatch?.phraseId === item.id}
                onClick={() => handleSelectPhrase(item.id)}
                disabled={!!wrongMatch}
              />
            ))}
          </div>
        </div>

        {/* Authors Column */}
        <div className="space-y-4">
          <div className="px-2">
            <h2 className="text-xl font-bold text-slate-800">Autores</h2>
          </div>
          <div className="grid gap-4">
            {shuffledAuthors.map((item) => (
              <GameCard
                key={`author-${item.id}`}
                id={`author-${item.id}`}
                content={item.content}
                type="author"
                image={item.image}
                isSelected={selectedAuthorId === item.id}
                isMatched={matches.includes(item.id)}
                isWrong={wrongMatch?.authorId === item.id}
                onClick={() => handleSelectAuthor(item.id)}
                disabled={!!wrongMatch}
              />
            ))}
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccess} 
        onRestart={initGame} 
        time={formatTime(seconds)} 
        score={Math.max(100 - seconds, 0) + matches.length * 10}
      />
    </div>
  );
}
