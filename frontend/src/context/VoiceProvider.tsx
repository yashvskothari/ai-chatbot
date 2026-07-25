import { useEffect, useState } from "react";
import { VOICES, type VoiceOption } from "../constants/voices";
import { VoiceContext } from "./VoiceContext";


export function VoiceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [voiceEnabled, setVoiceEnabled] = useState(() => {
    return localStorage.getItem("voiceEnabled") === "true";
  });

  const [selectedVoice, setSelectedVoice] = useState(() => {
    const saved = localStorage.getItem("voice");

    return (
      VOICES.find((v) => v.id === saved) ??
      VOICES[0]
    );
  });

  useEffect(() => {
    localStorage.setItem(
      "voiceEnabled",
      String(voiceEnabled)
    );
  }, [voiceEnabled]);

  useEffect(() => {
    localStorage.setItem(
      "voice",
      selectedVoice.id
    );
  }, [selectedVoice]);

  return (
    <VoiceContext.Provider
      value={{
        voiceEnabled,
        setVoiceEnabled,

        selectedVoice,
        setSelectedVoice,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}