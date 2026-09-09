"use client";

/* ============ VIBELY 2.0 — Navbar + Mobile Tab Bar (PRD §2 / §25) ============ */

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./bits";
import { useModals } from "./provider";
import { Home, Megaphone, Trophy, CircleHelp, Plus, Search, ArrowRight, Menu, X } from "lucide-react";

const LINKS = [
  { href: "#campaigns", label: "Campaigns" },
  { href: "#results", label: "Results" },
  { href: "#pricing", label: "Pricing" },
  { href: "#how", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openOrder, openTrack } = useModals();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div
        className={cn(
          "mx-auto max-w-6xl px-4 sm:px-6 transition-all duration-300",
          scrolled ? "pt-2" : "pt-3 sm:pt-4"
        )}
      >
        <nav
          className={cn(
            "flex items-center justify-between gap-3 rounded-2xl px-4 sm:px-5 py-2.5 transition-all duration-300",
            scrolled ? "glass border border-white/70 shadow-lift" : "bg-transparent border border-transparent"
          )}
          aria-label="Main navigation"
        >
          <a href="#top" className="shrink-0" aria-label="VIBELY SPACE — kembali ke atas">
            <Logo />
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-[#3E4E6E] hover:text-ink hover:bg-white/70 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => openTrack()}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D8E2F2] bg-white/80 px-4 py-2 text-sm font-semibold text-ink hover:border-[#2E6BFF]/40 hover:text-[#2E6BFF] transition-colors"
            >
              <Search className="h-4 w-4" />
              Track Campaign
            </button>
            <button
              onClick={() => openOrder()}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-navy transition-colors"
            >
              Start Campaign
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden grid h-10 w-10 place-items-center rounded-xl border border-[#D8E2F2] bg-white/80 text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden mt-2 rounded-2xl glass border border-white/70 shadow-lift p-3 animate-pop-in">
            <div className="flex flex-col">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-ink hover:bg-white/70"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    openTrack();
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#D8E2F2] bg-white px-4 py-3 text-sm font-semibold text-ink"
                >
                  <Search className="h-4 w-4" />
                  Track
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    openOrder();
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white"
                >
                  Start
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------- Mobile bottom tab bar (PRD §25) ---------- */

const TABS = [
  { href: "#top", label: "Home", icon: Home },
  { href: "#campaigns", label: "Campaigns", icon: Megaphone },
  { href: "#results", label: "Results", icon: Trophy },
  { href: "#faq", label: "FAQ", icon: CircleHelp },
];

export function MobileTabBar() {
  const { openOrder } = useModals();
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-3 mb-3 rounded-2xl glass border border-white/70 shadow-lift">
        <div className="grid grid-cols-5 items-end px-2 pt-2 pb-2">
          {TABS.slice(0, 2).map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="flex flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-semibold text-[#5B6B8A] active:text-[#2E6BFF]"
            >
              <t.icon className="h-5 w-5" />
              {t.label}
            </a>
          ))}

          <div className="flex justify-center">
            <button
              onClick={() => openOrder()}
              aria-label="Start Campaign"
              className="-mt-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-pink ring-4 ring-white transition-transform active:scale-95"
            >
              <Plus className="h-7 w-7" />
            </button>
          </div>

          {TABS.slice(2).map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="flex flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-semibold text-[#5B6B8A] active:text-[#2E6BFF]"
            >
              <t.icon className="h-5 w-5" />
              {t.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
