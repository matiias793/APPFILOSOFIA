"use client";

import { useCallback, useRef, useEffect, useState } from "react";

export function useAudio() {
  const audioContext = useRef<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Only initialize on user interaction to comply with browser policies
    const init = () => {
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    window.addEventListener("click", init, { once: true });
    return () => window.removeEventListener("click", init);
  }, []);

  const playSuccess = useCallback(() => {
    if (isMuted || !audioContext.current) return;
    const ctx = audioContext.current;
    
    // Nice "clink" sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.1); // C6
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }, [isMuted]);

  const playError = useCallback(() => {
    if (isMuted || !audioContext.current) return;
    const ctx = audioContext.current;
    
    // Subtle "buzz" sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  }, [isMuted]);

  const toggleMute = () => setIsMuted(prev => !prev);

  return { playSuccess, playError, isMuted, toggleMute };
}
