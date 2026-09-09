import type { Metadata } from "next";
import { Fredoka, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sponsor Giveaway by VIBELY SPACE ✨",
  description: "Jadi Sponsor Giveaway! Dapatkan followers real indo+aktif dengan harga terjangkau. Murah, cepat & lebih terpercaya!",
  keywords: ["sponsor giveaway", "followers instagram", "ig followers", "giveaway indo", "vibely space"],
  authors: [{ name: "VIBELY SPACE" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Sponsor Giveaway by VIBELY SPACE ✨",
    description: "Dapatkan followers real indo+aktif dengan harga terjangkau!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${fredoka.variable} ${jakarta.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
