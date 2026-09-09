import { Navbar, MobileTabBar } from "@/components/v2/navbar";
import { ModalProvider } from "@/components/v2/provider";
import { Hero } from "@/components/v2/hero";
import { TrustBar, WhatIs, HowItWorks } from "@/components/v2/sections-a";
import { LiveCampaigns, Results } from "@/components/v2/sections-b";
import { PlatformPreview } from "@/components/v2/platform";
import { Pricing, Safety } from "@/components/v2/pricing";
import { Faq, FinalCta, Footer } from "@/components/v2/closing";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VIBELY SPACE",
  url: "https://vibely-space.vercel.app",
  slogan: "Turn Giveaway Exposure Into Real Audience Growth.",
  description:
    "Jalankan campaign giveaway untuk meningkatkan exposure dan pertumbuhan audience Instagram di Indonesia.",
  sameAs: ["https://instagram.com/vibely.space"],
};

export default function Home() {
  return (
    <ModalProvider>
      <div id="top" className="flex min-h-screen flex-col overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1 pb-24 md:pb-0">
          <Hero />
          <TrustBar />
          <WhatIs />
          <HowItWorks />
          <LiveCampaigns />
          <Results />
          <PlatformPreview />
          <Pricing />
          <Safety />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
        <MobileTabBar />
      </div>
    </ModalProvider>
  );
}
