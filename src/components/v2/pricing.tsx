"use client";

/* ============ VIBELY 2.0 — Pricing + Comparison + Safety (PRD §11 / §12 / §14) ============ */

import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  FileText,
  KeyRound,
  MessagesSquare,
  Minus,
  ShieldCheck,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PACKAGES } from "@/lib/data";
import { Reveal, SectionHead } from "./bits";
import { useModals } from "./provider";

type View = "followers" | "reach" | "campaign";

const VIEWS: { id: View; label: string }[] = [
  { id: "followers", label: "Followers" },
  { id: "reach", label: "Reach" },
  { id: "campaign", label: "Campaign" },
];

const COMPARE_ROWS: { label: string; free: number }[] = [
  { label: "Campaign", free: 0 },
  { label: "Tracking", free: 0 },
  { label: "Guarantee", free: 0 },
  { label: "Analytics", free: 3 },
  { label: "Priority Support", free: 4 },
];

/* ---------- PRICING (§11) ---------- */

export function Pricing() {
  const [view, setView] = useState<View>("followers");
  const { openOrder } = useModals();

  return (
    <section id="pricing" aria-label="Pilihan paket" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          tag="Pricing"
          title={
            <>
              Choose Your <span className="text-gradient">Growth</span>
            </>
          }
          sub="Semua paket termasuk campaign, tracking dashboard, dan garansi target."
        />

        {/* Toggle */}
        <Reveal delay={100} className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-[#D8E2F2] bg-white p-1 shadow-soft" role="tablist" aria-label="Tampilan paket">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                role="tab"
                aria-selected={view === v.id}
                onClick={() => setView(v.id)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold transition-all",
                  view === v.id
                    ? "bg-ink text-white shadow-soft"
                    : "text-muted-foreground hover:text-ink"
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {PACKAGES.map((p, i) => {
            const inner = (
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl p-6 transition-all duration-300",
                  p.popular
                    ? "bg-ink text-white shadow-lift"
                    : "border border-[#E3EAF6] bg-white shadow-soft hover:-translate-y-1.5 hover:shadow-lift hover:border-[#2E6BFF]/30"
                )}
              >
                {p.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-pink">
                    <Star className="h-3 w-3" fill="currentColor" />
                    Most Popular
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 font-display text-[10px] font-bold tracking-widest",
                      p.popular ? "bg-white/10 text-[#9DB8E8]" : "bg-[#F0F4FC] text-[#5B6B8A]"
                    )}
                  >
                    {p.code}
                  </span>
                  <span
                    className={cn(
                      "font-display text-sm font-bold uppercase tracking-widest",
                      p.popular ? "text-white" : "text-ink"
                    )}
                  >
                    {p.name}
                  </span>
                </div>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span
                    className={cn(
                      "font-display text-4xl font-bold tracking-tight",
                      p.popular ? "text-white" : "text-ink"
                    )}
                  >
                    {p.priceLabel}
                  </span>
                  <span className={cn("text-sm font-medium", p.popular ? "text-[#9DB8E8]" : "text-muted-foreground")}>
                    / campaign
                  </span>
                </div>

                <p
                  className={cn(
                    "mt-1 text-sm font-semibold",
                    p.popular ? "text-[#8FE3C0]" : "text-emerald-600"
                  )}
                >
                  {view === "followers" && `${p.target.toLocaleString("id-ID")} Guaranteed Followers`}
                  {view === "reach" && `Est. ${p.reach} Reach`}
                  {view === "campaign" && `Campaign ${p.duration}`}
                </p>

                <ul className={cn("mt-5 space-y-2.5 border-t pt-5 flex-1", p.popular ? "border-white/10" : "border-[#EDF2FB]")}>
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <span
                        className={cn(
                          "grid h-5 w-5 shrink-0 place-items-center rounded-full",
                          p.popular ? "bg-white/10" : "bg-[#EAF1FF]"
                        )}
                      >
                        <Check className={cn("h-3 w-3", p.popular ? "text-[#8FE3C0]" : "text-[#2E6BFF]")} />
                      </span>
                      <span className={p.popular ? "text-[#C9D6F2]" : "text-[#3E4E6E]"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openOrder(p.id)}
                  className={cn(
                    "group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all",
                    p.popular
                      ? "bg-gradient-brand text-white shadow-pink hover:opacity-95"
                      : "bg-ink text-white hover:bg-navy"
                  )}
                >
                  Start Campaign
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );

            return (
              <Reveal key={p.id} delay={i * 80} className={cn(p.popular && "lg:-mt-4 lg:mb-[-1rem]")}>
                {p.popular ? (
                  <div className="rounded-3xl bg-gradient-brand p-[1.5px] shadow-lift">{inner}</div>
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Semua paket tanpa biaya tersembunyi · Garansi target aktif otomatis
        </p>

        <Comparison />
      </div>
    </section>
  );
}

/* ---------- PACKAGE COMPARISON (§12) ---------- */

function Comparison() {
  return (
    <Reveal delay={100} className="mt-14">
      <div className="rounded-3xl border border-[#E3EAF6] bg-white shadow-soft overflow-hidden">
        <div className="border-b border-[#EDF2FB] px-6 py-5">
          <h3 className="font-display text-lg font-bold text-ink">Package Comparison</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">Bandingkan fitur di semua paket.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <caption className="sr-only">Perbandingan fitur antar paket VIBELY SPACE</caption>
            <thead>
              <tr className="bg-[#F9FBFF] text-left">
                <th scope="col" className="px-6 py-3.5 font-semibold text-muted-foreground">Feature</th>
                {PACKAGES.map((p) => (
                  <th key={p.id} scope="col" className="px-4 py-3.5 text-center font-display font-bold text-ink">
                    {p.name}
                    {p.popular && <span className="ml-1 align-top text-[10px] text-[#F0479C]">★</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.label} className="border-t border-[#EDF2FB]">
                  <th scope="row" className="px-6 py-3.5 text-left font-medium text-[#3E4E6E]">{row.label}</th>
                  {PACKAGES.map((p, idx) => (
                    <td key={p.id} className="px-4 py-3.5 text-center">
                      {idx >= row.free ? (
                        <Check className="mx-auto h-5 w-5 text-emerald-500" aria-label="Termasuk" />
                      ) : (
                        <Minus className="mx-auto h-5 w-5 text-[#C9D6EC]" aria-label="Tidak termasuk" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- ACCOUNT SAFETY (§14) ---------- */

const SAFETY = [
  {
    icon: KeyRound,
    title: "No Password Required",
    desc: "Kami tidak pernah meminta password Instagram Anda. Hanya @username.",
  },
  {
    icon: BarChart3,
    title: "Transparent Tracking",
    desc: "Pantau progress campaign real-time lewat Campaign Tracking.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy Protected",
    desc: "Data Anda hanya dipakai untuk campaign — tidak pernah dibagikan.",
  },
  {
    icon: MessagesSquare,
    title: "Human Support",
    desc: "Tim support manusia (bukan bot) yang siap membantu 24/7.",
  },
  {
    icon: FileText,
    title: "Clear Campaign Terms",
    desc: "Syarat, durasi, dan garansi tertulis jelas sebelum Anda order.",
  },
];

export function Safety() {
  return (
    <section
      aria-label="Keamanan akun"
      className="py-20 lg:py-28 bg-white/60 border-y border-[#EDF2FB]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          tag="Account Safety"
          title={
            <>
              Your Account. <span className="text-gradient">Your Control.</span>
            </>
          }
          sub="Campaign berjalan di sisi VIBELY — akun Anda tetap sepenuhnya milik Anda."
        />

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {SAFETY.map((s, i) => (
            <Reveal key={s.title} delay={i * 80} className={cn(i === 4 && "col-span-2 md:col-span-1")}>
              <div className="h-full rounded-3xl border border-[#E3EAF6] bg-white p-5 text-center shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand-soft">
                  <s.icon className="h-6 w-6 text-[#2E6BFF]" />
                </span>
                <h3 className="mt-4 font-display text-sm font-bold text-ink leading-snug">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
