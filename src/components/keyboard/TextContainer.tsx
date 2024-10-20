import React, { useEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";

interface DocumentContainerProps {
  text: string;
}

export const TextContainer: React.FC<DocumentContainerProps> = ({ text }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, [text]);

  return (
    <Textarea
      ref={textRef}
      value={text}
      className="min-h-32 w-full resize-none overflow-y-auto p-4 text-5xl"
    />
  );
};
