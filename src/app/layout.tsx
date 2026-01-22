import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AudioProvider } from "@/contexts/AudioContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wrapped Deck",
  description: "Um slide deck full-screen estilo Spotify Wrapped (Next.js + Tailwind + Framer Motion).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full overflow-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-white/20 selection:text-white overflow-hidden`}
      >
        <AudioProvider>
          <div className="wrapped-bg relative h-dvh w-full overflow-hidden">
            {/* brilho / blobs */}
            <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-fuchsia-500/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-48 -right-48 h-[620px] w-[620px] rounded-full bg-lime-400/35 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.14),transparent_60%)]" />

            {children}
          </div>
        </AudioProvider>
      </body>
    </html>
  );
}
