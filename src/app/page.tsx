import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/button";

// classic top nav
// export default function HomePage() {
//   return (
//     <div className="min-h-screen">
//       <nav className="mx-auto mt-10 flex w-full max-w-2xl items-center justify-between p-4">
//         <div id="left-nav">
//           <Link className="text-lg font-semibold text-blue-950" href="/">
//             Keyboard
//           </Link>
//         </div>
//         <div id="right-nav">
//           <SignedOut>
//             <Button>
//               <SignInButton />
//             </Button>
//           </SignedOut>
//           <SignedIn>
//             <Button>
//               <UserButton />
//             </Button>
//           </SignedIn>
//         </div>
//       </nav>
//       <main className="flex flex-col justify-center">
//         <SignedIn>
//           <h1></h1>
//           <Link href="/doc" target="_blank">
//             Document
//           </Link>
//         </SignedIn>
//       </main>
//     </div>
//   );
// }

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <SignedIn>
        <div className="fixed right-3 top-3">
          <UserButton />
        </div>
      </SignedIn>
      <div className="container flex max-w-lg flex-col gap-2">
        <h1 className="mb-1 text-5xl">
          Intellitype
          <span className="ml-4 rounded bg-blue-200 px-2 py-1 align-middle text-lg">
            beta
          </span>
        </h1>
        <p className="mb-8 text-lg">A custom and accessible keyboard</p>
        <div className="flex gap-4">
          <SignedIn>
            <Button asChild>
              <Link href="/keyboards">My keyboards</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button asChild>
              <SignInButton>Get started</SignInButton>
            </Button>
          </SignedOut>
          <Button asChild variant="link">
            <Link href="/about">Learn more</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
