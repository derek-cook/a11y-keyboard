"use client";
import React, { useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { Delete, MessageCircleMore } from "lucide-react";
import { useLongPress } from "@uidotdev/usehooks";

const qwertyLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const alphabeticalLayout = [
  ["A", "B", "C", "D", "E"],
  ["F", "G", "H", "I", "J"],
  ["K", "L", "M", "N", "O"],
  ["P", "Q", "R", "S", "T"],
  ["U", "V", "W", "X", "Y", "Z"],
];

const numbersAndSpecialCharsLayout = [
  ["1", "2", "3", "4", "5"],
  ["6", "7", "8", "9", "0"],
  ["!", "?", "@", "$", "#", "&"],
];

const moreLayout = [
  ["Tired", "Hungry", "Thirsty"],
  ["Cold", "Hot", "Pain", "Bathroom"],
  ["Yes", "No", "I don't know"],
];

const emojiLayout = [
  ["😴", "🍽️", "🥤", "💊"],
  ["🥶", "🥵", "😣", "🚽"],
  ["✅", "❌", "🥰", "🪑"],
];

type Mode = "ALPHA" | "MORE" | "NUMERIC" | "EMOJI";
const modes: Record<Mode, { layout: string[][] }> = {
  ALPHA: {
    layout: alphabeticalLayout,
  },
  MORE: {
    layout: moreLayout,
  },
  NUMERIC: {
    layout: numbersAndSpecialCharsLayout,
  },
  EMOJI: {
    layout: emojiLayout,
  },
};

type KeyboardProps = {
  setText: (text: string) => void;
  appendText: (key: string) => void;
  backspace: () => void;
};

interface KeyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const KeyButton = ({ className = "", children, ...rest }: KeyButtonProps) => {
  return (
    <Button
      className={cn("h-36 py-2 text-5xl font-extrabold", "flex-1", className)}
      {...rest}
    >
      {children}
    </Button>
  );
};

export const Keyboard: React.FC<KeyboardProps> = ({
  setText,
  appendText,
  backspace,
}) => {
  const { onMouseDown, onMouseLeave, onMouseUp, onTouchEnd, onTouchStart } =
    useLongPress(() => console.log("long press"));

  const [mode, setMode] = useState<Mode>("ALPHA");

  const { layout } = modes[mode];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col p-1 pt-0">
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="mb-1 flex h-full justify-center gap-1">
          {row.map((keyValue) => (
            <KeyButton key={keyValue} onClick={() => appendText(keyValue)}>
              {keyValue}
            </KeyButton>
          ))}
        </div>
      ))}
      {mode === "EMOJI" ? (
        <div className="grid h-full">
          <KeyButton className="" onClick={() => setMode("ALPHA")}>
            abc
          </KeyButton>
        </div>
      ) : (
        <div className="grid h-full grid-cols-6 gap-1">
          <KeyButton onClick={() => setMode("EMOJI")}>
            <MessageCircleMore size={48} />
          </KeyButton>

          {mode !== "ALPHA" && (
            <KeyButton onClick={() => setMode("ALPHA")}>{"abc"}</KeyButton>
          )}
          {mode !== "NUMERIC" && (
            <KeyButton onClick={() => setMode("NUMERIC")}>{"123"}</KeyButton>
          )}
          <KeyButton className="col-span-2" onClick={() => appendText(" ")}>
            {"Space"}
          </KeyButton>
          <KeyButton onClick={() => appendText(".")}>{"."}</KeyButton>
          <KeyButton
            className="bg-destructive"
            onClick={() => backspace()}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseLeave={onMouseLeave}
          >
            <Delete size={48} />
          </KeyButton>
        </div>
      )}
    </div>
  );
};
