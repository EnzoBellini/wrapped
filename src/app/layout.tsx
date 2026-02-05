import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
            {/* brilho / blobs - blur só em telas maiores para performance no celular */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-fuchsia-500/30 sm:-left-40 sm:-top-40 sm:h-[520px] sm:w-[520px] sm:bg-fuchsia-500/40 sm:blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-lime-400/25 sm:-bottom-48 sm:-right-48 sm:h-[620px] sm:w-[620px] sm:bg-lime-400/35 sm:blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.14),transparent_60%)]" />

            {children}
          </div>
        </AudioProvider>
      </body>
    </html>
  );
}
