import { createContext } from "react";
import type { AIModel } from "../constants/models";

export interface ModelContextType {
  selectedModel: AIModel;
  setSelectedModel: React.Dispatch<React.SetStateAction<AIModel>>;
}

export const ModelContext =
  createContext<ModelContextType | null>(null);