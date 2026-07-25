export interface VoiceOption {
  id: string;
  name: string;
  gender: "Male" | "Female";
}

export const VOICES: VoiceOption[] = [
  {
    id: "Aria",
    name: "Aria",
    gender: "Female",
  },
  {
    id: "Jenny",
    name: "Jenny",
    gender: "Female",
  },
  {
    id: "Guy",
    name: "Guy",
    gender: "Male",
  },
  {
    id: "Davis",
    name: "Davis",
    gender: "Male",
  },
];