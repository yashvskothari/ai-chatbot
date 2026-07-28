import { useEffect, useState } from "react";
import { VoiceContext } from "./VoiceContext";

export function VoiceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [voiceEnabled, setVoiceEnabled] = useState(() => {
    return localStorage.getItem("voiceEnabled") === "true";
  });

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);

  // Voice toggle
  useEffect(() => {
    localStorage.setItem(
      "voiceEnabled",
      String(voiceEnabled)
    );
  }, [voiceEnabled]);

  // Load browser voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices =
        window.speechSynthesis.getVoices();

      setVoices(availableVoices);

      const savedVoice =
        localStorage.getItem("voice");

let voice =
  availableVoices.find((v) => v.name === savedVoice);

if (!voice) {
  voice =
    availableVoices.find(
      (v) =>
        v.lang === "en-US" &&
        (
          v.name.includes("Aria") ||
          v.name.includes("Jenny") ||
          v.name.includes("Guy") ||
          v.name.includes("Davis")
        )
    ) ??
    availableVoices.find((v) => v.lang === "en-US") ??
    availableVoices.find((v) => v.lang.startsWith("en")) ??
    availableVoices.find((v) => v.default) ??
    availableVoices[0] ??
    null;
}

setSelectedVoice(voice);
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged =
      loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged =
        null;
    };
  }, []);

  // Save selected voice
  useEffect(() => {
    if (!selectedVoice) return;

    localStorage.setItem(
      "voice",
      selectedVoice.name
    );
  }, [selectedVoice]);

  return (
    <VoiceContext.Provider
      value={{
        voiceEnabled,
        setVoiceEnabled,

        voices,
        selectedVoice,
        setSelectedVoice,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}