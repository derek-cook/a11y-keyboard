"use client";
import React, { type ReactNode } from "react";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { Delete } from "lucide-react";

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

type KeyboardProps = {
  layout: "qwerty" | "alphabetical";
  appendText: (key: string) => void;
  backspace: () => void;
};

// const alphabeticalLayoutCols = (cols: number) => {
//   const flattened = alphabeticalLayout.flat();
//   const rows = [];
//   for (let i = 0; i < flattened.length / cols; i++) {
//     rows.push(flattened.slice(i * cols, i * cols + cols));
//   }
//   return rows;
// };

interface KeyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  keyValue: string;
}

const KeyButton = ({ className = "", children, ...rest }: KeyButtonProps) => {
  return (
    <Button
      className={cn(
        "mx-1 h-full py-2 text-5xl font-extrabold",
        "flex-1",
        className,
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};

export const Keyboard: React.FC<KeyboardProps> = ({
  layout,
  appendText,
  backspace,
}) => {
  const keyboardLayout =
    layout === "qwerty" ? qwertyLayout : alphabeticalLayout;

  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col p-4">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="mb-2 flex h-full justify-center">
          {row.map((keyValue) => (
            <KeyButton
              key={keyValue}
              keyValue={keyValue}
              onClick={() => appendText(keyValue)}
            >
              {keyValue}
            </KeyButton>
          ))}
        </div>
      ))}
      <div className="mb-2 grid h-full grid-cols-6">
        <KeyButton
          className="col-span-4"
          keyValue=" "
          onClick={() => appendText(" ")}
        >
          {"Space"}
        </KeyButton>
        <KeyButton keyValue="." onClick={() => appendText(".")}>
          {"."}
        </KeyButton>
        <KeyButton keyValue="backspace" onClick={() => backspace()}>
          <Delete size={48} />
        </KeyButton>
      </div>
    </div>
  );
};
