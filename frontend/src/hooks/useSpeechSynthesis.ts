import { useEffect, useRef, useState } from "react";

import type { VoiceOption } from "../constants/voices";

export function useSpeechSynthesis(
  selectedVoice: VoiceOption
) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [speaking, setSpeaking] = useState(false);

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

const matchedVoice = voices.find(
  (voice) =>
    voice.name
      .toLowerCase()
      .includes(selectedVoice.id.toLowerCase())
);

if (matchedVoice) {
  utterance.voice = matchedVoice;
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