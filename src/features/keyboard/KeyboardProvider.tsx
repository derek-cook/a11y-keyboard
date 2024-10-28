"use client";
import { createContext, useContext, useState } from "react";
import type { Mode } from "./constants";
import { modes } from "./constants";
import { capitalizeFirstLetterOfSentences } from "~/lib/textTransformers";
import { pipe } from "~/lib/utils";
import type { KeyButtonData } from "./types";

type KeyboardContext = {
  text: string;
  setText: (text: string) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  layout: KeyButtonData[][];
  appendText: (text: string) => void;
  backspace: () => void;
};

export const Context = createContext<KeyboardContext | null>(null);

export const KeyboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<Mode>("ALPHA");
  const { layout } = modes[mode];

  const appendText = (text: string) => {
    setText((prevText) => {
      return pipe(capitalizeFirstLetterOfSentences)(
        prevText + text.toLowerCase(),
      );
    });
  };

  const backspace = () => {
    setText((prevText) => prevText.slice(0, prevText.length - 1));
  };

  return (
    <Context.Provider
      value={{
        text,
        setText,
        mode,
        setMode,
        layout,
        appendText,
        backspace,
      }}
    >
      {children}
    </Context.Provider>
  );
};

Context.displayName = "KeyboardContext";

export const useKeyboard = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error(
      "useKeyboardContext must be used within a KeyboardProvider",
    );
  }
  return context;
};
