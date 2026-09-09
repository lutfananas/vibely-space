import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = "https://vibely-space.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "VIBELY SPACE — Sponsor Giveaway & Audience Growth",
  description:
    "Jalankan campaign giveaway untuk meningkatkan exposure dan pertumbuhan audience Instagram di Indonesia. Pilih paket, kirim username, pantau pertumbuhan secara transparan.",
  keywords: [
    "vibely space",
    "sponsor giveaway",
    "campaign giveaway",
    "audience growth",
    "followers instagram",
    "instagram campaign indonesia",
  ],
  authors: [{ name: "VIBELY SPACE" }],
  icons: {
    icon: "/logo.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "VIBELY SPACE — Sponsor Giveaway & Audience Growth",
    description:
      "Turn Giveaway Exposure Into Real Audience Growth. Jalankan campaign giveaway untuk brand dan creator Indonesia.",
    url: SITE_URL,
    siteName: "VIBELY SPACE",
    images: [
      {
        url: "/hero-image.png",
        width: 511,
        height: 437,
        alt: "VIBELY SPACE Campaign",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIBELY SPACE — Sponsor Giveaway & Audience Growth",
    description:
      "Turn Giveaway Exposure Into Real Audience Growth. Jalankan campaign giveaway untuk brand dan creator Indonesia.",
    images: ["/hero-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1526",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
