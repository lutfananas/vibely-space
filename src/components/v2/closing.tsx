"use client";

/* ============ VIBELY 2.0 — FAQ + Final CTA + Footer (PRD §13 / §29) ============ */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Instagram, MessageCircle, ShieldCheck } from "lucide-react";
import { FAQS, WA_LINK, IG_LINK } from "@/lib/data";
import { Logo, Reveal, SectionHead } from "./bits";
import { useModals } from "./provider";

/* ---------- FAQ (§13) ---------- */

export function Faq() {
  return (
    <section id="faq" aria-label="Pertanyaan umum" className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHead
          tag="FAQ"
          title={
            <>
              Questions? <span className="text-gradient">Answered.</span>
            </>
          }
          sub="Hal yang paling sering ditanyakan sebelum memulai campaign."
        />

        <Reveal delay={120} className="mt-12">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-2xl border border-[#E3EAF6] bg-white px-5 shadow-soft transition-colors data-[state=open]:border-[#2E6BFF]/30 last:border-b"
              >
                <AccordionTrigger className="py-4 text-left font-display text-[15px] font-bold text-ink hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal delay={200} className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Masih ada pertanyaan?{" "}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#2E6BFF] hover:gap-2 transition-all"
            >
              Chat tim kami
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */

export function FinalCta() {
  const { openOrder, openTrack } = useModals();

  return (
    <section aria-label="Mulai campaign" className="pb-20 lg:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 sm:px-12 lg:px-16 lg:py-20 text-center grid-bg-dark">
            {/* Glows */}
            <div className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[#2E6BFF]/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-[#F0479C]/25 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9DB8E8]">
                <span className="text-gradient font-bold">✦</span>
                Start Today
              </span>
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl sm:text-5xl font-bold leading-[1.1] text-white">
                Ready to Grow Your <span className="text-gradient">Audience?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#9DB8E8]">
                Campaign berikutnya bisa dimulai hari ini. Pilih paket, kirim username, dan pantau followers Anda
                naik dari dashboard.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => openOrder()}
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-brand px-8 py-4 text-base font-semibold text-white shadow-pink transition-all hover:-translate-y-0.5"
                >
                  Start a Campaign
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => openTrack()}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-all hover:border-white/30 hover:-translate-y-0.5"
                >
                  Track Campaign
                </button>
              </div>

              <p className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-medium text-[#7E93BC]">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Tanpa password
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Tracking transparan
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Garansi target
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */

export function Footer() {
  const { openTrack } = useModals();

  return (
    <footer className="mt-auto bg-ink text-[#9DB8E8]" aria-label="Footer">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Turn Giveaway Exposure Into Real Audience Growth.
            </p>
            <p className="mt-2 text-xs text-[#5F76A3]">
              Giveaway Campaign & Audience Growth Platform — untuk brand & creator Indonesia.
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={IG_LINK}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram VIBELY SPACE"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 hover:border-[#F0479C]/50 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp VIBELY SPACE"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 hover:border-emerald-400/50 hover:text-white transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Platform">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">Platform</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#campaigns" className="hover:text-white transition-colors">Campaigns</a></li>
              <li><a href="#results" className="hover:text-white transition-colors">Results</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#how" className="hover:text-white transition-colors">How It Works</a></li>
            </ul>
          </nav>

          <nav aria-label="Support">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">Support</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li>
                <button onClick={() => openTrack()} className="hover:text-white transition-colors">
                  Track Campaign
                </button>
              </li>
              <li><a href={WA_LINK} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp</a></li>
              <li><a href={IG_LINK} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>@vibely.space</li>
              <li>WhatsApp 24/7</li>
              <li>Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[#5F76A3]">
          <p>© 2026 VIBELY SPACE — Campaign Growth Platform</p>
          <p>Made with care in Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
