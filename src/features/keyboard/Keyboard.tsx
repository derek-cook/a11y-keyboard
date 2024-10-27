"use client";
import React from "react";
import { Delete, Speech } from "lucide-react";
import { KeyButton } from "./KeyButton";
import { useKeyboard } from "./KeyboardProvider";

export const Keyboard = () => {
  const { layout, mode, appendText, backspace, setMode } = useKeyboard();

  return (
    <div className="mx-auto flex w-full max-w-3xl grow flex-col justify-end p-1 pt-0">
      {layout.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="mb-1 flex h-full max-h-36 justify-center gap-1"
        >
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
      <div className="grid h-full max-h-36 grid-cols-6 gap-1">
        {mode === "EMOJI" ? (
          <KeyButton
            className="col-span-full"
            text="abc"
            onClick={() => setMode("ALPHA")}
          />
        ) : (
          <>
            <KeyButton aria-label="emoji" onClick={() => setMode("EMOJI")}>
              <Speech size={48} />
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
          </>
        )}
      </div>
    </div>
  );
};
