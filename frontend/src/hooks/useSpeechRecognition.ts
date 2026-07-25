import { useEffect, useRef, useState } from "react";

declare global {
interface Window {
  SpeechRecognition: typeof webkitSpeechRecognition;
  webkitSpeechRecognition: typeof webkitSpeechRecognition;
}
}

export function useSpeechRecognition(
  onResult: (text: string) => void,
) {
const recognitionRef = useRef<InstanceType<typeof window.webkitSpeechRecognition> | null>(null);

  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        transcript += event.results[i][0].transcript;
      }

      onResult(transcript);
    };

    recognitionRef.current = recognition;
  }, [onResult]);

  const startListening = () => {
    recognitionRef.current?.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  return {
    startListening,
    stopListening,
    isListening,
    supported: !!(
      window.SpeechRecognition ||
      window.webkitSpeechRecognition
    ),
  };
}