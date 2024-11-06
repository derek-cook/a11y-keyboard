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
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <SignedIn>
        <div className="fixed right-3 top-3">
          <UserButton />
        </div>
      </SignedIn>
      <div className="container flex max-w-lg flex-col items-start gap-2">
        <h1 className="mb-1 text-4xl md:text-6xl">
          Intellitype
          <span className="ml-2 rounded-full bg-blue-200 px-3 py-1 align-middle text-sm md:text-lg">
            beta
          </span>
        </h1>
        <p className="text-md md:text-xl">A custom and accessible keyboard.</p>
        <div className="mt-6 flex items-end gap-4">
          <SignedIn>
            <Button asChild>
              <Link href="/keyboards">My keyboards</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button asChild>
              <SignUpButton>Get started</SignUpButton>
            </Button>
            <Button className="p-0 text-xs" variant="link" asChild>
              <SignInButton>Already have a profile? Sign in</SignInButton>
            </Button>
          </SignedOut>
        </div>
      </div>
      <div className="absolute bottom-48 flex w-full justify-center gap-3">
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
