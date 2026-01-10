'use client';

import { useCallback, useRef, useEffect } from 'react';

type SoundType = 'hover' | 'click' | 'confirm' | 'denied' | 'open';

export function useScifiSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isMuted = useRef(false);

  useEffect(() => {
    // Initialize AudioContext only on client side interaction
    // We defer creation until needed or first interaction to adhere to browser policies
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (Ctx) {
        audioContextRef.current = new Ctx();
    }
  }, []);

  const play = useCallback((type: SoundType) => {
    if (isMuted.current || !audioContextRef.current) return;

    if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
    }

    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
      case 'hover':
        // High frequency short chirp
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
        
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        
        osc.start(now);
        osc.stop(now + 0.05);
        break;

      case 'click':
        // Mechanical low click
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
        
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        
        osc.start(now);
        osc.stop(now + 0.1);
        break;

      case 'confirm':
        // Pleasant ascending major 3rd
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.1); // C#
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        
        osc.start(now);
        osc.stop(now + 0.3);
        break;
        
      case 'open':
        // Sci-fi swipe sound (noise-like via multiple oscillators or slide)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.4);
        
        gainNode.gain.setValueAtTime(0.02, now);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.4);
        
        osc.start(now);
        osc.stop(now + 0.4);
        break;
    }
  }, []);

  return { 
    playHover: () => play('hover'),
    playClick: () => play('click'),
    playConfirm: () => play('confirm'),
    playOpen: () => play('open'),
  };
}
