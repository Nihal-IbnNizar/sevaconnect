import type { Metadata } from "next";
import { Space_Grotesk, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SevaConnect — Kerala & National Civic Router",
  description: "Accelerated router for Kerala e-District, PSC Thulasi, Land Revenue, Aadhaar updates, and client-side document processing engines. Zero intermediaries.",
  keywords: [
    "SevaConnect",
    "Kerala e-Services",
    "e-District Kerala",
    "Kerala PSC Thulasi",
    "reLIS Kerala Land Tax",
    "Aadhaar UIDAI",
    "Parivahan Kerala MVD",
    "PSC Photo Resizer 150x200",
    "Document PDF Compressor",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${hankenGrotesk.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-body bg-surface text-on-surface selection:bg-primary selection:text-on-primary antialiased">
        {children}
      </body>
    </html>
  );
}
