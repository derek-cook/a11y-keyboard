"use client";
import { Keyboard } from "~/features/keyboard/Keyboard";
import { TextContainer } from "~/features/keyboard/TextContainer";
import { Button } from "~/components/ui/button";
import { useKeyboard } from "~/features/keyboard/KeyboardProvider";

export default function DocumentContainer() {
  const { text, setText } = useKeyboard();

  const handleSpeak = async () => {
    if (!text) return;
    const res = await fetch("/api/text-to-speech", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    const audioBlob = await res.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className="container flex h-dvh flex-col justify-between">
      <div className="grid grid-cols-5 gap-1 p-1">
        <div className="col-span-4">
          <TextContainer />
        </div>
        <div id="editor-actions" className="flex flex-col gap-1">
          <Button
            variant="destructive"
            className="flex-1 text-3xl"
            onClick={() => setText("")}
          >
            Clear all
          </Button>
          <Button className="flex-1 text-3xl" onClick={handleSpeak}>
            Speak
          </Button>
        </div>
      </div>
      <Keyboard />
    </div>
  );
}
