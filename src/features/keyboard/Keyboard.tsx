"use client";
import React from "react";
import { Delete, Smile } from "lucide-react";
import { KeyButton } from "./KeyButton";
import { useKeyboard } from "./KeyboardProvider";

export const Keyboard = () => {
  const { layout, mode, appendText, backspace, setMode } = useKeyboard();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col p-1 pt-0">
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="mb-1 flex h-full justify-center gap-1">
          {row.map((keyData) => (
            <KeyButton
              key={keyData.text}
              text={keyData.text}
              value={keyData.value}
              onClick={() => appendText(keyData.value || "")}
            />
          ))}
        </div>
      ))}
      {mode === "EMOJI" ? (
        <div className="grid h-full">
          <KeyButton text="abc" onClick={() => setMode("ALPHA")} />
        </div>
      ) : (
        <div className="grid h-full grid-cols-6 gap-1">
          <KeyButton aria-label="emoji" onClick={() => setMode("EMOJI")}>
            <Smile size={48} />
          </KeyButton>

          {mode !== "ALPHA" && (
            <KeyButton
              aria-label="toggle alphabet"
              text="abc"
              onClick={() => setMode("ALPHA")}
            />
          )}
          {mode !== "NUMERIC" && (
            <KeyButton
              aria-label="toggle numeric and special characters"
              text="123"
              onClick={() => setMode("NUMERIC")}
            />
          )}
          <KeyButton
            className="col-span-2"
            text="Space"
            value=" "
            onClick={() => appendText(" ")}
          />
          <KeyButton text="." onClick={() => appendText(".")} />
          <KeyButton
            aria-label="backspace"
            className="bg-destructive"
            onClick={() => backspace()}
          >
            <Delete size={48} />
          </KeyButton>
        </div>
      )}
    </div>
  );
};
