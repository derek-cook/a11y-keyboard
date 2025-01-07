import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center">
      <nav className="mx-auto flex w-full items-center justify-between p-6">
        <div id="left-nav">
          <Link className="text-lg font-semibold" href="/">
            Intellitype
          </Link>
        </div>
        <div id="right-nav" className="flex justify-end gap-2">
          <SignedOut>
            <Button asChild>
              <SignUpButton>Get started</SignUpButton>
            </Button>
            <Button asChild variant="outline">
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      <main className="flex max-w-xl flex-col gap-3 p-6 pt-0">
        <h1 className="sr-only">About</h1>
        <div className="my-3 flex flex-col gap-3">
          <h2 className="text-4xl">The Problem</h2>
          <p>
            For disabled individuals, there are many accessibility tools
            available. Unfortunately, they are not always intuitive or readily
            usable.
          </p>
          <p>
            Consider iOS which has Accessibility Options. Although very
            powerful, it has a steep learning curve and may take some time to
            onboard. It also targets broad disabilities which may not be helpful
            for specific users&apos; conditions.
          </p>
          <p>
            The devices and software for more specific conditions are often
            expensive or have months-long waitlists depending on the healthcare
            provider.
          </p>
        </div>

        <div className="my-4 flex flex-col gap-3">
          <h2 className="text-4xl">The Solution</h2>
          <p>
            This application is not meant to be a replacement to accessibility
            settings on your device. However, it aims to provide quick and
            customized communication tools with minimal learning curve.
          </p>
        </div>

        <div className="my-3 flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Current features</h2>
          <ul className="list-inside list-disc">
            <li>Predictive text</li>
            <li>Text-to-speech</li>
            <li>
              Alphabetical layout (when qwerty is is too wide for the user)
            </li>
            <li>Large buttons for better motor and visual usability</li>
            <li>Frequent word bank mode for single-keystroke words</li>
            <li>Removed unhelpful keys that take up space</li>
          </ul>
        </div>

        <div className="my-3 flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Potential features</h2>
          <ul className="list-inside list-disc">
            <li>Customizable keyboard layout</li>
            <li>Improved predictive text</li>
            <li>Local LLM for speed and offline usage</li>
            <li>Integrate with built-in OS keyboard</li>
            <li>Enable cross-application usage</li>
          </ul>
          <p>More features will be added as feedback and use cases develop.</p>
        </div>
      </main>
    </div>
  );
}
