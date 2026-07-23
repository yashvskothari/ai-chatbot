export type AttachmentKind = "document" | "image";

export interface PendingAttachment {
  // Local id used to key/render/remove before (and after) upload completes.
  localId: string;
  file: File;
  name: string;
  size: number;
  kind: AttachmentKind;
  status: "uploading" | "ready" | "error";
  error?: string;

  // Populated once the upload finishes successfully.
  remoteId?: string;
  content?: string; // extracted text / image analysis
  preview?: string; // data URL, images only
}

export const DOCUMENT_EXTENSIONS = [".pdf", ".docx", ".txt", ".md"];
export const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
export const ACCEPTED_EXTENSIONS = [
  ...DOCUMENT_EXTENSIONS,
  ...IMAGE_EXTENSIONS,
];

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB, matches backend

export function getAttachmentKind(filename: string): AttachmentKind {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext) ? "image" : "document";
}

export function isAcceptedFile(filename: string): boolean {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return ACCEPTED_EXTENSIONS.includes(ext);
}
