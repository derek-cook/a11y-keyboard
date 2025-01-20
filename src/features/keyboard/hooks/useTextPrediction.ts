"use client";
import { useState, useRef, useEffect } from "react";
import { useDebouncedValue } from "~/lib/hooks/useDebouncedValue";

export const useTextPrediction = ({ text }: { text: string }) => {
  const debouncedText = useDebouncedValue(text, 1000);
  const [result, setResult] = useState("");
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const worker = new Worker(
      new URL("../../../app/workers/worker.ts", import.meta.url),
    );
    workerRef.current = worker;

    worker.onmessage = (
      event: MessageEvent<{ output: string; status: string }>,
    ) => {
      console.log("Hook Received message:", event.data);
      if (event.data.status === "complete") {
        setResult(event.data.output);
      }
    };

    worker.postMessage({ type: "load" });

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const generateText = (text: string) => {
    workerRef.current?.postMessage({ type: "generate", text });
  };

  useEffect(() => {
    if (debouncedText) {
      generateText(debouncedText);
    }
  }, [debouncedText]);

  return { result };
};
