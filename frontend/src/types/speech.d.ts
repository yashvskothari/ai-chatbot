declare class webkitSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;

  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;

  start(): void;
  stop(): void;
}

interface Window {
  webkitSpeechRecognition: typeof webkitSpeechRecognition;
}