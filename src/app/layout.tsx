import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const serifDisplay = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-juke",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://volateria.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "VOLATERÍA — el tiro al pato de feria, reimaginado",
  description:
    "Oleadas veloces, señuelos traidores, globos de poder y EL PATO REAL cada cuatro rondas. Atardecer WebGL que envejece a noche, hitstop, screen-shake, plumas y sonido 100% sintetizado con WebAudio. Récord en tu navegador.",
  keywords: [
    "duck hunt",
    "juego arcade",
    "shooter",
    "canvas",
    "WebGL",
    "WebAudio",
    "volatería",
  ],
  openGraph: {
    title: "VOLATERÍA — el tiro al pato de feria, reimaginado",
    description:
      "Oleadas veloces, señuelos traidores, globos de poder y EL PATO REAL cada cuatro rondas. Sonido sintetizado, atardecer que envejece a noche y récord en tu navegador.",
    siteName: "VOLATERÍA",
    type: "website",
    locale: "es_CL",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  width: "device-width",
  initialScale: 1,
  /* V70: el zoom ya no se bloquea (WCAG 1.4.4) — el juego ya usa
     touch-action: none, que es la herramienta correcta para que los
     gestos no estorben al disparo */
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${grotesk.variable} ${serifDisplay.variable} ${mono.variable}`}
    >
      <body className="antialiased bg-ink text-cream">{children}</body>
    </html>
  );
}
