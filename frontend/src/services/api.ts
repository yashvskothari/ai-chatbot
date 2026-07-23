import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------- Types ----------

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
export const sendChatMessage = async (payload: ChatRequestPayload) => {
  const response = await api.post("/chat", payload);
  return response.data as { response: string };
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
) => {
  try {
    const response = await fetch(`${BASE_URL}/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
  signal?: AbortSignal,
): Promise<UploadResult> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    signal,
  });

  return response.data;
};

export default api;
