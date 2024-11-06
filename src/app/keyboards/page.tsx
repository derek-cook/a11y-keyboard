import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function KeyboardsPage() {
  return (
    <div className="container mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center">
      <nav className="mx-auto mb-4 flex w-full items-center justify-between p-6">
        <div id="left-nav">
          <Link className="text-lg font-semibold text-blue-950" href="/">
            Keyboard
          </Link>
        </div>
        <div id="right-nav">
          <SignedOut>
            <Button asChild>
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      <main className="flex w-full max-w-xl flex-col gap-4 p-6">
        <h1 className="text-4xl">My keyboards</h1>
        <ul className="border-t">
          <li className="flex items-center justify-between border-b p-3">
            <Button className="grow justify-start" variant="link" asChild>
              <Link href="/keyboards/default" target="_blank">
                Default keyboard
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" disabled>
                Edit
              </Button>
              <Button variant="outline" disabled>
                Delete
              </Button>
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
}
