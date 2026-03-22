"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface SpeechRecognitionResultLike {
  0: { transcript: string };
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionEventLike extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultLike[];
}

interface SpeechRecognitionLike extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: Event & { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

interface UseVoiceInputOptions {
  onTranscript: (text: string) => void;
}

const BENIGN_SPEECH_ERRORS = new Set(["aborted", "no-speech"]);

export function useVoiceInput({ onTranscript }: UseVoiceInputOptions) {
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const onTranscriptRef = useRef(onTranscript);
  const manuallyStoppedRef = useRef(false);
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep the callback ref in sync without re-creating the recognizer.
  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  // Create the SpeechRecognition instance exactly once per mount.
  useEffect(() => {
    const ctor =
      (
        window as Window & {
          SpeechRecognition?: SpeechRecognitionCtor;
          webkitSpeechRecognition?: SpeechRecognitionCtor;
        }
      ).SpeechRecognition ||
      (
        window as Window & {
          webkitSpeechRecognition?: SpeechRecognitionCtor;
        }
      ).webkitSpeechRecognition;

    if (!ctor) {
      setIsSupported(false);
      return;
    }

    const recognition = new ctor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .slice(event.resultIndex)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ")
        .trim();

      if (text) {
        onTranscriptRef.current(text);
      }
    };

    recognition.onerror = (event) => {
      const code = event.error ?? "";

      if (BENIGN_SPEECH_ERRORS.has(code) || manuallyStoppedRef.current) {
        setIsListening(false);
        return;
      }

      if (code === "not-allowed") {
        setError("Microphone access denied. Please allow mic permissions.");
      } else if (code === "network") {
        setError("Voice input network error. Check your connection.");
      } else {
        setError(code ? `Voice input failed: ${code}` : "Voice input failed.");
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      manuallyStoppedRef.current = false;
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    setIsSupported(true);

    return () => {
      manuallyStoppedRef.current = true;
      recognition.stop();
      recognitionRef.current = null;
    };
    // Empty deps — create once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) return;
    setError(null);
    manuallyStoppedRef.current = false;
    recognitionRef.current.start();
    setIsListening(true);
  }, [isListening]);

  const stopListening = useCallback(() => {
    manuallyStoppedRef.current = true;
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return {
    isSupported,
    isListening,
    error,
    startListening,
    stopListening,
  };
}
