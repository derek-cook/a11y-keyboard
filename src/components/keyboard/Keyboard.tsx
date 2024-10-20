import React from "react";
import { cn } from "~/lib/utils";

type KeyboardProps = {
  layout: "qwerty" | "alphabetical";
  onKeyPress: (key: string) => void;
};

const qwertyLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const alphabeticalLayout = [
  ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  ["J", "K", "L", "M", "N", "O", "P", "Q", "R"],
  ["S", "T", "U", "V", "W", "X", "Y", "Z"],
];

export const Keyboard: React.FC<KeyboardProps> = ({ layout, onKeyPress }) => {
  const keyboardLayout =
    layout === "qwerty" ? qwertyLayout : alphabeticalLayout;

  return (
    <div className="mx-auto w-full max-w-3xl">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="mb-2 flex justify-center">
          {row.map((key) => (
            <button
              key={key}
              className={cn(
                "mx-1 rounded-lg bg-gray-200 px-2 py-3 text-sm font-medium text-gray-700",
                "hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400",
                "transition-colors duration-200 ease-in-out",
              )}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
