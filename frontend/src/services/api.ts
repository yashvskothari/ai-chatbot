import axios from "axios";



const BASE_URL = "http://127.0.0.1:8000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------- Types ----------
export type AIProvider =
  | "groq";

  export type AIModel =
  | "llama-3.3-70b-versatile"

  export type AIModelId =
  | "groq-llama"

export interface ChatMessagePayload {
  role: "user" | "assistant";
  content: string;
}

export interface AttachmentContextPayload {
  filename: string;
  type: "document" | "image";
  content: string;
}

export interface ChatRequestPayload {
  message: string;
  history?: ChatMessagePayload[];
  attachments?: AttachmentContextPayload[];

  modelId?: AIModel;
}

export interface UploadResult {
  id: string;
  filename: string;
  type: "document" | "image";
  content: string;
  preview: string | null;
  size: number;
}

// ---------- Chat (non-streaming) ----------
export const sendChatMessage = async (
  payload: ChatRequestPayload,
  token?: string | null
) => {
  const response = await api.post(
    "/chat",
    payload,
    {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    }
  );

  return response.data;
};

// ---------- Chat (streaming) ----------
// The backend returns Server-Sent Events over a POST response. EventSource
// doesn't support POST bodies, so we read the stream manually via fetch.
export const streamChatMessage = async (
  payload: ChatRequestPayload,
  handlers: {
    onToken: (token: string) => void;
    onDone: () => void;
    onError: (message: string) => void;
  },
  signal?: AbortSignal,
  token?: string | null
) => {
  try {
    const response = await fetch(`${BASE_URL}/chat/stream`, {
      method: "POST",
      headers: {
  "Content-Type": "application/json",

  ...(token && {
    Authorization: `Bearer ${token}`,
  }),
},
      body: JSON.stringify(payload),
      signal,
    });

    if (!response.ok || !response.body) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const events = buffer.split("\n\n");
      buffer = events.pop() ?? "";

      for (const event of events) {
        const line = event.trim();
        if (!line.startsWith("data:")) continue;

        const data = line.slice(5).trim();

        if (data === "[DONE]") {
          handlers.onDone();
          return;
        }

        try {
          const parsed = JSON.parse(data) as {
            token?: string;
            error?: string;
          };

          if (parsed.error) {
            handlers.onError(parsed.error);
            return;
          }

          if (parsed.token) {
            handlers.onToken(parsed.token);
          }
        } catch {
          // ignore malformed chunk
        }
      }
    }

    handlers.onDone();
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      // Generation was intentionally stopped; not an error state.
      handlers.onDone();
      return;
    }

    handlers.onError(
      error instanceof Error ? error.message : "Something went wrong.",
    );
  }
};

// ---------- File Upload ----------
export const uploadFile = async (
  file: File,
  provider: AIProvider,
  model: string,
  signal?: AbortSignal,
): Promise<UploadResult> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("provider", provider);
formData.append("model", model);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    signal,
  });

  return response.data;
};

export default api;
