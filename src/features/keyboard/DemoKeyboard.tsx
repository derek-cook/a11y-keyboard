"use client";
import { useState } from "react";
import DocumentContainer from "~/app/keyboards/default/page";
import { Button } from "~/components/ui/button";

export const DemoKeyboard = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  return (
    <div id="demo-keyboard">
      {!isDemoOpen && (
        <Button variant="link" onClick={() => setIsDemoOpen(true)}>
          Demo
        </Button>
      )}

      {isDemoOpen && (
        <div className="transition-all duration-500 animate-in fade-in">
          <DocumentContainer />
        </div>
      )}
    </div>
  );
};
