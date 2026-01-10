'use client';

import { useSoundContext } from '@/lib/audio/SoundContext';

// This hook now delegates to the global SoundContext
export function useScifiSound() {
  const context = useSoundContext();
  
  return { 
    playHover: context.playHover,
    playClick: context.playClick,
    playConfirm: context.playConfirm,
    playOpen: context.playOpen,
    playDenied: context.playDenied,
    isMuted: context.isMuted,
    toggleMute: context.toggleMute
  };
}
