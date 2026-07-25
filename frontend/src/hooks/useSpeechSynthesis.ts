import { useEffect, useRef, useState } from "react";


export function useSpeechSynthesis(
  selectedVoice: SpeechSynthesisVoice | null
) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [speaking, setSpeaking] = useState(false);

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

const utterance = new SpeechSynthesisUtterance(text);

if (selectedVoice) {
  utterance.voice = selectedVoice;
}

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setSpeaking(true);

    utterance.onend = () => setSpeaking(false);

    utterance.onerror = () => setSpeaking(false);

    utteranceRef.current = utterance;

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const pause = () => {
    window.speechSynthesis.pause();
  };

  const resume = () => {
    window.speechSynthesis.resume();
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return {
    speak,
    stop,
    pause,
    resume,
    speaking,
  };
}