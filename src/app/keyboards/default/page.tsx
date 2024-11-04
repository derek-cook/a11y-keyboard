"use client";
import { Keyboard } from "~/features/keyboard/Keyboard";
import { TextContainer } from "~/features/keyboard/TextContainer";
import { Button } from "~/components/ui/button";
import { useKeyboard } from "~/features/keyboard/KeyboardProvider";
import { useRef } from "react";

export default function DocumentContainer() {
  const { text, setText } = useKeyboard();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSpeak = async () => {
    if (!text) return;
    try {
      const res = await fetch("/api/text-to-speech", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      const audioBlob = await res.blob();
      // const audioBuffer = await res.arrayBuffer();
      // const audioContext = new AudioContext();
      // const decodedData = await audioContext.decodeAudioData(audioBuffer);
      // const source = audioContext.createBufferSource();
      // source.buffer = decodedData;
      // source.connect(audioContext.destination);
      // source.start(0);
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current!.src = audioUrl;
      await audioRef.current?.play();
    } catch (error) {
      console.error("Failed to play audio:", error);
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
            className="h-full truncate text-2xl"
            onClick={() => setText("")}
          >
            Clear
          </Button>
          <Button
            value={text}
            className="h-full truncate text-2xl"
            onClick={handleSpeak}
          >
            <audio ref={audioRef} />
            Speak
          </Button>
        </div>
      </div>
      <Keyboard />
    </div>
  );
}
