"use client";
import { Keyboard } from "~/features/keyboard/Keyboard";
import { TextContainer } from "~/features/keyboard/TextContainer";
import { Button } from "~/components/ui/button";
import { useKeyboard } from "~/features/keyboard/KeyboardProvider";
import { useRef, useState } from "react";
import { Loader } from "lucide-react";

export default function DocumentContainer() {
  const { text, setText } = useKeyboard();
  const [isLoadingSpeech, setIsLoadingSpeech] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSpeak = async () => {
    if (!text) return;
    setIsLoadingSpeech(true);
    try {
      const res = await fetch("/api/text-to-speech", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current!.src = audioUrl;
      await audioRef.current?.play();
    } catch (error) {
      console.error("Failed to play audio:", error);
    } finally {
      setIsLoadingSpeech(false);
    }
  };

  return (
    <div className="container flex h-dvh flex-col justify-between">
      <div className="grid grid-cols-5 gap-1 p-1">
        <div className="col-span-4 h-full">
          <TextContainer />
        </div>
        <div id="editor-actions" className="flex flex-col justify-start gap-1">
          <Button
            variant="destructive"
            className="h-full truncate text-lg md:text-2xl"
            onClick={() => setText("")}
          >
            Clear
          </Button>
          <Button
            disabled={isLoadingSpeech}
            value={text}
            className="h-full truncate text-lg md:text-2xl"
            onClick={handleSpeak}
          >
            <audio ref={audioRef} />
            {isLoadingSpeech ? <Loader className="animate-spin" /> : "Speak"}
          </Button>
        </div>
      </div>
      <Keyboard />
    </div>
  );
}
