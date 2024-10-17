'use client';
import { useEffect, useState } from 'react';

export default function useSound(path: string) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize audio object only on the client side
      const newAudio = new Audio(path);
      setAudio(newAudio);
    }
  }, [path]); // Update the effect if the path changes

  return audio;
}
