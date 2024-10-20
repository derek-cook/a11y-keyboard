import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1>Demo Keyboard</h1>
      <Link href="/doc">Document</Link>
      {/* <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16"></div> */}
    </main>
  );
}
