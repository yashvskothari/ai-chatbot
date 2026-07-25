import { createContext } from "react";
import type { VoiceOption } from "../constants/voices";

export interface VoiceContextType {
  voiceEnabled: boolean;
  setVoiceEnabled: React.Dispatch<React.SetStateAction<boolean>>;

  selectedVoice: VoiceOption;
  setSelectedVoice: React.Dispatch<React.SetStateAction<VoiceOption>>;
}

export const VoiceContext =
  createContext<VoiceContextType | null>(null);