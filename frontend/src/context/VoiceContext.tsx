import { createContext } from "react";

export interface VoiceContextType {
  voiceEnabled: boolean;
  setVoiceEnabled: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  voices: SpeechSynthesisVoice[];

  selectedVoice: SpeechSynthesisVoice | null;

  setSelectedVoice: React.Dispatch<
    React.SetStateAction<SpeechSynthesisVoice | null>
  >;
}

export const VoiceContext =
  createContext<VoiceContextType | null>(null);
;

