import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
        className={`${geistSans.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
