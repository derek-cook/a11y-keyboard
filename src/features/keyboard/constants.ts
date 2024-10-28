import type { KeyButtonData } from "./types";

export const qwertyLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export const alphabeticalLayout = [
  ["A", "B", "C", "D", "E"],
  ["F", "G", "H", "I", "J"],
  ["K", "L", "M", "N", "O"],
  ["P", "Q", "R", "S", "T"],
  ["U", "V", "W", "X", "Y", "Z"],
];

export const numbersAndSpecialCharsLayout = [
  ["1", "2", "3", "4", "5"],
  ["6", "7", "8", "9", "0"],
  ["!", "?", "@", "$", "#", "&"],
];

export const moreLayout = [
  ["Tired", "Hungry", "Thirsty"],
  ["Cold", "Hot", "Pain", "Bathroom"],
  ["Yes", "No", "I don't know"],
];

export const emojiLayout = [
  [
    { text: "😴", value: "tired" },
    { text: "🍽️", value: "hungry" },
    { text: "🥤", value: "thirsty" },
    { text: "💊", value: "medicine" },
  ],
  [
    { text: "🥶", value: "cold" },
    { text: "🥵", value: "hot" },
    { text: "😣", value: "pain" },
    { text: "🚽", value: "bathroom" },
  ],
  [
    { text: "✅", value: "yes" },
    { text: "❌", value: "no" },
    { text: "🛏️", value: "bed" },
    { text: "🪑", value: "chair" },
  ],
];

const getKeyButtonData = (layout: string[][]): KeyButtonData[][] =>
  layout.map((row) =>
    row.map((str) => ({
      text: str,
      value: str,
    })),
  );

export type Mode = "ALPHA" | "MORE" | "NUMERIC" | "EMOJI";
export const modes: Record<Mode, { layout: KeyButtonData[][] }> = {
  ALPHA: {
    layout: getKeyButtonData(alphabeticalLayout),
  },
  MORE: {
    layout: getKeyButtonData(moreLayout),
  },
  NUMERIC: {
    layout: getKeyButtonData(numbersAndSpecialCharsLayout),
  },
  EMOJI: {
    layout: emojiLayout,
  },
};
