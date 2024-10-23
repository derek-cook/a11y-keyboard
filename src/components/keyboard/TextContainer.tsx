import React, { useEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";

interface DocumentContainerProps {
  text: string;
  setText: (text: string) => void;
}

export const TextContainer: React.FC<DocumentContainerProps> = ({
  text,
  setText,
}) => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, [text]);

  return (
    <Textarea
      className="min-h-32 w-full resize-none overflow-y-auto p-4 text-5xl focus-visible:ring-0"
      ref={textRef}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};
