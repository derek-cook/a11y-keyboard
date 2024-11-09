import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex h-svh flex-col items-center justify-center p-8">
      <SignedIn>
        <div className="fixed right-3 top-3">
          <UserButton />
        </div>
      </SignedIn>
      <div className="container flex max-w-lg grow flex-col items-start justify-end">
        <h1 className="mb-4 text-5xl md:text-6xl">
          Intellitype
          <span className="ml-2 rounded-full bg-blue-200 px-3 py-1 align-middle text-sm md:text-lg">
            beta
          </span>
        </h1>
        <p className="text-md mb-4 font-medium md:text-xl">
          A quick and accessible keyboard for those with motor, visual, or
          verbal impairments.
        </p>
        <ul className="mb-4 flex list-inside list-disc flex-col gap-1 text-sm">
          <li>text-to-speech</li>
          <li>predictive text</li>
          <li>
            Free and{" "}
            <Link
              className="underline"
              href="https://github.com/derek-cook/a11y-keyboard"
              target="_blank"
            >
              open source
            </Link>
          </li>
        </ul>
        <div className="mt-6 flex items-start gap-4">
          <SignedIn>
            <Button size="lg" asChild>
              <Link href="/keyboards">My keyboards</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button size="lg" asChild>
              <SignUpButton>Get started</SignUpButton>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <SignInButton>Sign in</SignInButton>
            </Button>
          </SignedOut>
        </div>
      </div>
      <div className="flex w-full grow items-end justify-center gap-3">
        <div>
          <Button asChild variant="ghost">
            <Link href="/about">Learn more</Link>
          </Button>
        </div>
        <div>
          <Button asChild variant="ghost">
            <Link href="/keyboards/default">Demo</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
