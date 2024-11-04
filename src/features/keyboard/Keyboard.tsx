"use client";
import React from "react";
import { Delete, Space, Speech } from "lucide-react";
import { KeyButton } from "./KeyButton";
import { useKeyboard } from "./KeyboardProvider";
import { useSuggestions } from "./hooks/useSuggestions";

export const Keyboard = () => {
  const { layout, mode, appendText, backspace, setMode, text } = useKeyboard();
  const { suggestions } = useSuggestions({ text });

  return (
    <div className="mx-auto flex w-full max-w-3xl grow flex-col justify-end p-1 pt-0">
      {suggestions.length > 0 && mode === "ALPHA" && (
        <div className="mb-1 flex h-full max-h-32 gap-1">
          {suggestions.map(
            (suggestion, i) =>
              suggestion && (
                <KeyButton
                  key={i}
                  text={suggestion}
                  value={suggestion}
                  onClick={() => appendText(suggestion)}
                  className="min-w-fit text-2xl md:text-3xl"
                />
              ),
          )}
        </div>
      )}
      {layout.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="mb-1 flex h-full max-h-32 justify-center gap-1"
        >
          {row.map((keyData) => (
            <KeyButton
              key={keyData.text}
              text={keyData.text}
              value={keyData.value}
              onClick={() => appendText(keyData.value ?? "")}
            />
          ))}
        </div>
      ))}
      <div className="grid h-full max-h-32 grid-cols-6 gap-1">
        {mode === "EMOJI" ? (
          <KeyButton
            className="col-span-full text-3xl"
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
                className="text-3xl"
                aria-label="toggle alphabet"
                text="abc"
                onClick={() => setMode("ALPHA")}
              />
            )}
            {mode !== "NUMERIC" && (
              <KeyButton
                text="123"
                className="text-3xl"
                aria-label="toggle numeric and special characters"
                onClick={() => setMode("NUMERIC")}
              />
            )}
            <KeyButton
              className="col-span-2"
              value=" "
              onClick={() => appendText(" ")}
            >
              <Space size={48} />
            </KeyButton>
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
