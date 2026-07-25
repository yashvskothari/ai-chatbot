import { useState } from "react";
import { MODELS } from "../constants/models";
import { ModelContext } from "./ModelContext";

export function ModelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);

  return (
    <ModelContext.Provider
      value={{
        selectedModel,
        setSelectedModel,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}