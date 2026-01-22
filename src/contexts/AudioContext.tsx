"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type AudioContextType = {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (sound: "slide" | "click" | "success") => void;
};

const AudioContext = createContext<AudioContextType | null>(null);

// Sons simples usando Web Audio API (sem arquivos externos)
function createTone(frequency: number, duration: number, type: OscillatorType = "sine"): AudioBuffer {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const sampleRate = audioContext.sampleRate;
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate;
    data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 2);
  }

  return buffer;
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("audioMuted") === "true";
  });
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
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
