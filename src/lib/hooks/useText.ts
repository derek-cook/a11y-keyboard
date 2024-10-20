import { useState } from "react";
import { pipe } from "../utils";
import { capitalizeFirstLetterOfSentences } from "../textTransformers";

export const useText = () => {
  const [text, setText] = useState("");

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

  return { text, appendText, backspace } as const;
};
