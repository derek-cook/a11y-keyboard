"use client";
import { Keyboard } from "~/components/keyboard/Keyboard";
import { TextContainer } from "~/components/keyboard/TextContainer";
import { useText } from "~/lib/hooks/useText";

export default function DocumentContainer() {
  const { text, appendText, backspace } = useText();

  return (
    <div className="container flex h-dvh flex-col justify-between">
      <TextContainer text={text} />

      <Keyboard
        appendText={appendText}
        backspace={backspace}
        layout="alphabetical"
      />
    </div>
  );
}
