"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type AudioContextType = {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (sound: "slide" | "click" | "success") => void;
};

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<globalThis.AudioContext | null>(null);

  // Inicializar estado do localStorage no cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMuted(localStorage.getItem("audioMuted") === "true");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    try {
      const AudioContextClass = globalThis.AudioContext || (globalThis as any).webkitAudioContext;
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass() as globalThis.AudioContext;
      }
    } catch (err) {
      console.debug("AudioContext not available:", err);
    }

    return () => {
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch (err) {
          console.debug("Error closing AudioContext:", err);
        }
      }
    };
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newValue = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("audioMuted", String(newValue));
      }
      return newValue;
    });
  };

  const playSound = (sound: "slide" | "click" | "success") => {
    if (isMuted || !audioContextRef.current) return;

    try {
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Frequências e durações diferentes para cada som
      const sounds = {
        slide: { freq: 400, duration: 0.1, type: "sine" as OscillatorType },
        click: { freq: 600, duration: 0.05, type: "square" as OscillatorType },
        success: { freq: 800, duration: 0.15, type: "sine" as OscillatorType },
      };

      const config = sounds[sound];
      oscillator.frequency.value = config.freq;
      oscillator.type = config.type;

      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + config.duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + config.duration);
    } catch (err) {
      // Silenciosamente falha se áudio não estiver disponível
      console.debug("Audio not available:", err);
    }
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
}
