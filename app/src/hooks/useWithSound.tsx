import { useEffect, useRef } from "react";

export const useWithSound = (audioSource: string, loop: boolean = false) => {
  const soundRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    soundRef.current = new Audio(audioSource);
    soundRef.current.loop = loop;
  }, []);

  const playSound = () => {
    if (soundRef.current) soundRef.current.play();
  };

  const stopSound = () => {
    if (soundRef.current) {
      soundRef.current.pause();
      soundRef.current.currentTime = 0;
    }
  };

  return [playSound, stopSound];
};
