"use client";
import { Keyboard } from "~/features/keyboard/Keyboard";
import { TextContainer } from "~/features/keyboard/TextContainer";
import { Button } from "~/components/ui/button";
import { useKeyboard } from "~/features/keyboard/KeyboardProvider";
import { useRef, useState } from "react";
import { Loader } from "lucide-react";

export default function DocumentContainer() {
  const { text, setText } = useKeyboard();
  const [isLoadingSpeech, setIsLoadingSpeech] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSpeak = async () => {
    if (!text) return;
    setIsLoadingSpeech(true);
    try {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/06220ab5-05b5-4a70-94a2-6520c341cfdf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:18',message:'Client fetch start',data:{method:'POST',url:'/api/text-to-speech',textLength:text.length},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'A'})}).catch(()=>{/* ignore */});
      // #endregion
      const res = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/06220ab5-05b5-4a70-94a2-6520c341cfdf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:22',message:'Client fetch response',data:{status:res.status,statusText:res.statusText,ok:res.ok,headers:Object.fromEntries(res.headers.entries())},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'A'})}).catch(()=>{/* ignore */});
      // #endregion
      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current!.src = audioUrl;
      await audioRef.current?.play();
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/06220ab5-05b5-4a70-94a2-6520c341cfdf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:27',message:'Client fetch error',data:{error:error instanceof Error?error.message:String(error),errorName:error instanceof Error?error.name:'unknown'},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'A'})}).catch(()=>{/* ignore */});
      // #endregion
      console.error("Failed to play audio:", error);
    } finally {
      setIsLoadingSpeech(false);
    }
  };

  return (
    <div className="container flex h-dvh flex-col justify-between">
      <div className="grid grid-cols-5 gap-1 p-1">
        <div className="col-span-4 h-full">
          <TextContainer />
        </div>
        <div id="editor-actions" className="flex flex-col justify-start gap-1">
          <Button
            variant="destructive"
            className="h-full truncate text-lg md:text-2xl"
            onClick={() => setText("")}
          >
            Clear
          </Button>
          <Button
            disabled={isLoadingSpeech}
            value={text}
            className="h-full truncate text-lg md:text-2xl"
            onClick={handleSpeak}
          >
            <audio ref={audioRef} />
            {isLoadingSpeech ? <Loader className="animate-spin" /> : "Speak"}
          </Button>
        </div>
      </div>
      <Keyboard />
    </div>
  );
}
