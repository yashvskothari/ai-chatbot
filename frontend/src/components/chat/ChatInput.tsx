import {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
  useCallback,
} from "react";

import {
  SendHorizontal,
  Paperclip,
  FileText,
  X,
  Loader2,
  AlertCircle,
  UploadCloud,
} from "lucide-react";

import { Button } from "../ui";
import { uploadFile } from "../../services/api";
import {
  ACCEPTED_EXTENSIONS,
  MAX_FILE_SIZE_BYTES,
  getAttachmentKind,
  isAcceptedFile,
  type PendingAttachment,
} from "../../types/attachment";

export interface ChatInputHandle {
  focus: () => void;
  setMessage: (text: string) => void;
  getElement: () => HTMLTextAreaElement | null;
}

interface ChatInputProps {
  onSend: (message: string, attachments: PendingAttachment[]) => void;
  onStop: () => void;
  loading: boolean;
}

const MAX_CHARACTERS = 4000;

let localIdCounter = 0;
const nextLocalId = () => `local-${Date.now()}-${localIdCounter++}`;

const ChatInput = forwardRef<ChatInputHandle, ChatInputProps>(
  ({ onSend, onStop, loading }, ref) => {
    const [message, setMessage] = useState("");
    const [attachments, setAttachments] = useState<PendingAttachment[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const dragCounter = useRef(0);

    useImperativeHandle(ref, () => ({
      focus: () => textareaRef.current?.focus(),
      setMessage: (text: string) => setMessage(text),
      getElement: () => textareaRef.current,
    }));

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "0px";
        textareaRef.current.style.height =
          Math.min(textareaRef.current.scrollHeight, 180) + "px";
      }
    }, [message]);

    const uploadOne = useCallback((file: File) => {
      const localId = nextLocalId();
      const kind = getAttachmentKind(file.name);

      if (!isAcceptedFile(file.name)) {
        setAttachments((prev) => [
          ...prev,
          {
            localId,
            file,
            name: file.name,
            size: file.size,
            kind,
            status: "error",
            error: "Unsupported file type",
          },
        ]);
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setAttachments((prev) => [
          ...prev,
          {
            localId,
            file,
            name: file.name,
            size: file.size,
            kind,
            status: "error",
            error: "File is too large (max 10MB)",
          },
        ]);
        return;
      }

      // Local image preview shown immediately, before the upload finishes.
      const localPreview =
        kind === "image" ? URL.createObjectURL(file) : undefined;

      setAttachments((prev) => [
        ...prev,
        {
          localId,
          file,
          name: file.name,
          size: file.size,
          kind,
          status: "uploading",
          preview: localPreview,
        },
      ]);

      uploadFile(file)
        .then((result) => {
          setAttachments((prev) =>
            prev.map((a) =>
              a.localId === localId
                ? {
                    ...a,
                    status: "ready",
                    remoteId: result.id,
                    content: result.content,
                    preview: result.preview ?? a.preview,
                  }
                : a,
            ),
          );
        })
        .catch((err) => {
          const detail =
            err?.response?.data?.detail ?? "Upload failed. Try again.";

          setAttachments((prev) =>
            prev.map((a) =>
              a.localId === localId
                ? { ...a, status: "error", error: detail }
                : a,
            ),
          );
        });
    }, []);

    const handleFiles = useCallback(
      (files: FileList | File[]) => {
        Array.from(files).forEach(uploadOne);
      },
      [uploadOne],
    );

    const removeAttachment = (localId: string) => {
      setAttachments((prev) => {
        const target = prev.find((a) => a.localId === localId);
        if (target?.preview && target.preview.startsWith("blob:")) {
          URL.revokeObjectURL(target.preview);
        }
        return prev.filter((a) => a.localId !== localId);
      });
    };

    const hasPendingUploads = attachments.some(
      (a) => a.status === "uploading",
    );

    const handleSend = () => {
      if (loading || hasPendingUploads) return;

      const readyAttachments = attachments.filter(
        (a) => a.status === "ready",
      );

      if (!message.trim() && readyAttachments.length === 0) return;

      onSend(message.trim(), readyAttachments);

      setMessage("");
      setAttachments([]);
    };

    // ---------- Drag & drop ----------
    const onDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      dragCounter.current += 1;
      if (e.dataTransfer.types.includes("Files")) setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      dragCounter.current -= 1;
      if (dragCounter.current <= 0) {
        dragCounter.current = 0;
        setIsDragging(false);
      }
    };

    const onDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };

    const onDrop = (e: React.DragEvent) => {
      e.preventDefault();
      dragCounter.current = 0;
      setIsDragging(false);

      if (e.dataTransfer.files?.length) {
        handleFiles(e.dataTransfer.files);
      }
    };

    return (
      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className="
    relative
    px-3
    pt-2
    pb-3

    sm:px-5
    sm:pb-5

    lg:px-8
    lg:pb-8
    lg:pt-3

    transition-all
    duration-300
  "
      >
        {isDragging && (
          <div
            className="
              pointer-events-none
              absolute
              inset-3
              sm:inset-5
              lg:inset-8

              z-10

              flex
              flex-col
              items-center
              justify-center
              gap-2

              rounded-3xl

              border-2
              border-dashed
              border-blue-500

              bg-blue-500/10

              backdrop-blur-sm
            "
          >
            <UploadCloud size={28} className="text-blue-500" />
            <p className="text-sm font-medium text-blue-500">
              Drop files to attach
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          hidden
          multiple
          accept={ACCEPTED_EXTENSIONS.join(",")}
          onChange={(e) => {
            if (e.target.files?.length) {
              handleFiles(e.target.files);
            }
            e.target.value = "";
          }}
        />
        <div
          className="
          mx-auto
          max-w-full
xl:max-w-5xl

          rounded-3xl
lg:rounded-[30px]

          border
          border-(--border-color)

          bg-(--bg-card)

          backdrop-blur-2xl

          shadow-(--shadow-soft)

          transition-all
          duration-300

          focus-within:border-blue-500/40
          focus-within:shadow-(--shadow-glow)
        "
        >
          {attachments.length > 0 && (
            <div
              className="
                flex
                flex-wrap
                gap-2

                m-4
                mb-0
              "
            >
              {attachments.map((attachment) => (
                <div
                  key={attachment.localId}
                  className={`
                    flex
                    items-center
                    gap-3

                    rounded-2xl

                    border

                    px-3
                    py-2

                    ${
                      attachment.status === "error"
                        ? "border-red-500/40 bg-red-500/10"
                        : "border-(--border-color) bg-(--bg-secondary)"
                    }
                  `}
                >
                  {attachment.kind === "image" && attachment.preview ? (
                    <img
                      src={attachment.preview}
                      alt={attachment.name}
                      className="h-9 w-9 rounded-lg object-cover"
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-blue-500/10
                      "
                    >
                      {attachment.status === "error" ? (
                        <AlertCircle size={16} className="text-red-500" />
                      ) : (
                        <FileText size={16} className="text-blue-500" />
                      )}
                    </div>
                  )}

                  <div className="max-w-40">
                    <p className="truncate text-sm font-medium text-(--text-primary)">
                      {attachment.name}
                    </p>
                    <p className="text-xs text-(--text-secondary)">
                      {attachment.status === "error"
                        ? attachment.error
                        : attachment.status === "uploading"
                          ? "Uploading…"
                          : `${(attachment.size / 1024).toFixed(1)} KB`}
                    </p>
                  </div>

                  {attachment.status === "uploading" && (
                    <Loader2
                      size={16}
                      className="animate-spin text-(--text-secondary)"
                    />
                  )}

                  <button
                    onClick={() => removeAttachment(attachment.localId)}
                    aria-label={`Remove ${attachment.name}`}
                    className="
                      rounded-lg

                      p-1

                      text-(--text-secondary)

                      transition

                      hover:bg-red-500/10
                      hover:text-red-500
                    "
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <textarea
            ref={textareaRef}
            rows={1}
            disabled={loading}
            value={message}
            placeholder={
              loading ? "Flux AI is thinking..." : "Message Flux AI..."
            }
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="
            w-full

            resize-none

            bg-transparent

           px-4
pt-4

sm:px-5
sm:pt-5

lg:px-6

            text-sm
lg:text-[18px]
            text-(--text-primary)

            outline-none

            placeholder:text-(--text-secondary)

            max-h-44

            transition-colors
          "
          />

          <div
            className="
            flex
            items-center
            justify-between

           px-3
pb-3
pt-2

sm:px-4
sm:pb-4
          "
          >
            {/* Left */}

            <div
              className="flex items-center gap-2
sm:gap-3
lg:gap-4"
            >
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="
                rounded-xl

                p-2
sm:p-2.5

                text-(--text-secondary)
                transition-all
                duration-300

                hover:bg-blue-500/10
                hover:text-blue-500
              "
              >
                <Paperclip size={18} />
              </button>
            </div>

            {/* Right */}

            <div className="flex items-center gap-4">
              {message.length > 0 && (
                <span
                  className="
                  hidden
                  sm:block
                  text-xs
                  text-(--text-secondary)
                "
                >
                  {message.length}/{MAX_CHARACTERS}
                </span>
              )}

              <span
                className="
                hidden
                md:block

                text-xs
                text-(--text-secondary)
              "
              >
                Ctrl + Enter
              </span>
              {loading ? (
                <Button
                  onClick={onStop}
                  className="
        rounded-2xl

        bg-red-600
        hover:bg-red-700

        px-4
        py-3

        text-white

        transition-all
        duration-300

        hover:scale-105
      "
                >
                  Stop
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSend}
                  disabled={
                    (!message.trim() &&
                      !attachments.some((a) => a.status === "ready")) ||
                    hasPendingUploads
                  }
                  className="
        rounded-2xl

        px-3
        py-3

        sm:px-4

        transition-all
        duration-300

        hover:scale-105
      "
                >
                  <SendHorizontal
                    size={16}
                    className="text-black dark:text-white"
                  />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ChatInput.displayName = "ChatInput";

export default ChatInput;
