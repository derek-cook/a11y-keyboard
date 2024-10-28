"use client";
import { Keyboard } from "~/features/keyboard/Keyboard";
import { TextContainer } from "~/features/keyboard/TextContainer";
import { Button } from "~/components/ui/button";
import { useKeyboard } from "~/features/keyboard/KeyboardProvider";

export default function DocumentContainer() {
  const { text, setText } = useKeyboard();

  const handleSpeak = async () => {
    if (!text) return;
    try {
      const res = await fetch("/api/text-to-speech", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      const audioBuffer = await res.arrayBuffer();
      const audioContext = new AudioContext();
      const decodedData = await audioContext.decodeAudioData(audioBuffer);
      const source = audioContext.createBufferSource();
      source.buffer = decodedData;
      source.connect(audioContext.destination);
      source.start(0);
    } catch (error) {
      console.error("Failed to play audio:", error);
    }
  };

  return (
    <div className="container flex h-dvh flex-col justify-between">
      <div className="grid h-full max-h-48 grid-cols-5 gap-1 p-1">
        <div className="col-span-4 h-full">
          <TextContainer />
        </div>
        <div id="editor-actions" className="flex flex-col justify-start gap-1">
          <Button
            variant="destructive"
            className="truncate text-2xl"
            onClick={() => setText("")}
          >
            Clear
          </Button>
          <Button
            value={text}
            className="truncate text-2xl"
            onClick={handleSpeak}
          >
            Speak
          </Button>
        </div>
      </div>
      <Keyboard />
    </div>
  );
}
