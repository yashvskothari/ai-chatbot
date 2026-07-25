
export type Provider = "groq";

export interface AIModel {
  id: string;
  name: string;
  provider: Provider;
  description: string;
}

export const MODELS: AIModel[] = [
  // ---------- GROQ ----------
  {
    id: "llama-3.3-70b-versatile",
    name: "Llama 3.3 70B",
    provider: "groq",
    description: "Fast general-purpose model",
  },

];