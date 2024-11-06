import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Providers } from "~/components/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Keyboard Home",
  description: "Home page for the keyboard app",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en" className={`${GeistSans.variable}`}>
          <body>
            {children}
            <SpeedInsights />
            <Analytics />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
