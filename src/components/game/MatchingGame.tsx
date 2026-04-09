"use client";

import { useState, useEffect, useMemo } from "react";
import GameCard from "./GameCard";
import SuccessModal from "./SuccessModal";
import { gamePairs, GamePair } from "@/data/gameData";
import { motion } from "framer-motion";

interface ShuffledItem {
  id: number;
  content: string;
}

export default function MatchingGame() {
  const [shuffledPhrases, setShuffledPhrases] = useState<ShuffledItem[]>([]);
  const [shuffledAuthors, setShuffledAuthors] = useState<ShuffledItem[]>([]);
  
  const [selectedPhraseId, setSelectedPhraseId] = useState<number | null>(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState<number | null>(null);
  
  const [matches, setMatches] = useState<number[]>([]);
  const [wrongMatch, setWrongMatch] = useState<{ phraseId: number; authorId: number } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize and shuffle game
  const initGame = () => {
    const shuffle = <T,>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const phrases = gamePairs.map(p => ({ id: p.id, content: p.phrase }));
    const authors = gamePairs.map(p => ({ id: p.id, content: p.author }));
    
    setShuffledPhrases(shuffle(phrases));
    setShuffledAuthors(shuffle(authors));
    
    setMatches([]);
    setSelectedPhraseId(null);
    setSelectedAuthorId(null);
    setWrongMatch(null);
    setShowSuccess(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  // Match validation logic
  useEffect(() => {
    if (selectedPhraseId !== null && selectedAuthorId !== null) {
      if (selectedPhraseId === selectedAuthorId) {
        // Correct match
        setMatches(prev => [...prev, selectedPhraseId]);
        setSelectedPhraseId(null);
        setSelectedAuthorId(null);
      } else {
        // Wrong match
        setWrongMatch({ phraseId: selectedPhraseId, authorId: selectedAuthorId });
        
        const timer = setTimeout(() => {
          setWrongMatch(null);
          setSelectedPhraseId(null);
          setSelectedAuthorId(null);
        }, 800);
        
        return () => clearTimeout(timer);
      }
    }
  }, [selectedPhraseId, selectedAuthorId]);

  // Check for game completion
  useEffect(() => {
    if (matches.length === gamePairs.length && gamePairs.length > 0) {
      const timer = setTimeout(() => setShowSuccess(true), 500);
      return () => clearTimeout(timer);
    }
  }, [matches]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Relaciona Conceptos</h1>
        <p className="text-gray-600">Une cada frase célebre con su autor correspondiente.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Phrases Column */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 px-2 mb-4">Frases</h2>
          {shuffledPhrases.map((item) => (
            <GameCard
              key={`phrase-${item.id}`}
              id={`phrase-${item.id}`}
              content={item.content}
              type="phrase"
              isSelected={selectedPhraseId === item.id}
              isMatched={matches.includes(item.id)}
              isWrong={wrongMatch?.phraseId === item.id}
              onClick={() => !wrongMatch && setSelectedPhraseId(item.id)}
              disabled={!!wrongMatch}
            />
          ))}
        </div>

        {/* Authors Column */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 px-2 mb-4">Autores</h2>
          {shuffledAuthors.map((item) => (
            <GameCard
              key={`author-${item.id}`}
              id={`author-${item.id}`}
              content={item.content}
              type="author"
              isSelected={selectedAuthorId === item.id}
              isMatched={matches.includes(item.id)}
              isWrong={wrongMatch?.authorId === item.id}
              onClick={() => !wrongMatch && setSelectedAuthorId(item.id)}
              disabled={!!wrongMatch}
            />
          ))}
        </div>
      </div>

      <SuccessModal isOpen={showSuccess} onRestart={initGame} />
      
      {/* Progress Indicator */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        Completado: {matches.length} de {gamePairs.length}
      </footer>
    </div>
  );
}
