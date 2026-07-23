export interface MessageAttachment {
  id: string;
  filename: string;
  type: "document" | "image";
  size: number;
  preview?: string; // data URL, images only
}

export interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  attachments?: MessageAttachment[];
  streaming?: boolean;
}
