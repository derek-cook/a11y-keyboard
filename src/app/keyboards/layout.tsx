import { KeyboardProvider } from "~/features/keyboard/KeyboardProvider";

export default function KeyboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <KeyboardProvider>{children}</KeyboardProvider>;
}
