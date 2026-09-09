"use client";

/* ============ VIBELY 2.0 — Live Campaigns + Real Results (PRD §7 / §9 / §10) ============ */

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bell,
  Clock,
  Eye,
  Flame,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CAMPAIGNS, CASE_STUDIES, fmtID, type CaseStudy } from "@/lib/data";
import { Avatar, GrowthLine, ProgressBar, Reveal, SectionHead, StatusDot } from "./bits";
import { useModals } from "./provider";

/* ---------- LIVE CAMPAIGNS (§7) ---------- */

export function LiveCampaigns() {
  const { openTrack, openOrder } = useModals();
  const active = CAMPAIGNS.filter((c) => c.status === "active");
  const upcoming = CAMPAIGNS.find((c) => c.status === "upcoming");
  const completed = CAMPAIGNS.filter((c) => c.status === "completed");

  return (
    <section id="campaigns" aria-label="Live campaigns" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          tag="Live Now"
          title={
            <>
              Live <span className="text-gradient">Campaigns</span>
            </>
          }
          sub="Campaign yang sedang berjalan sekarang — progress diperbarui real-time."
        />

        <div className="mt-14 grid md:grid-cols-3 gap-4 lg:gap-5">
          {active.map((c, i) => (
            <Reveal key={c.id} delay={i * 110}>
              <article className="h-full rounded-3xl border border-[#E3EAF6] bg-white p-5 sm:p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="flex items-center gap-3">
                  <Avatar name={c.handle} className="h-11 w-11 text-base" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-bold text-ink truncate">@{c.handle}</p>
                    <p className="text-xs text-muted-foreground">{c.niche}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-2.5 py-1">
                    <StatusDot color="bg-red-500" pulseClass="animate-pulse-ring-red" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">Live</span>
                  </span>
                </div>

                <div className="mt-5">
                  <ProgressBar value={c.progress} height="h-2.5" />
                  <div className="mt-2.5 flex items-baseline justify-between">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-display font-bold text-ink">{fmtID(c.current)}</span>
                      {" / "}
                      {fmtID(c.target)} followers
                    </p>
                    <p className="font-display text-lg font-bold text-gradient">{c.progress.toFixed(1)}%</p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-dashed border-[#E3EAF6] pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {c.remaining}
                  </span>
                  <button
                    onClick={() => openTrack(c.id)}
                    className="inline-flex items-center gap-1 text-sm font-bold text-[#2E6BFF] hover:gap-2 transition-all"
                    aria-label={`Lihat campaign ${c.handle}`}
                  >
                    VIEW
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Upcoming + Completed */}
        <Reveal delay={150} className="mt-5 grid md:grid-cols-2 gap-4 lg:gap-5">
          {upcoming && (
            <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-dashed border-[#C9D6EC] bg-white/70 p-5">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#FFF7E0]">
                <Bell className="h-5 w-5 text-amber-500" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold text-ink">
                  {upcoming.id} · @{upcoming.handle}
                </p>
                <p className="text-xs text-muted-foreground capitalize">{upcoming.remaining}</p>
              </div>
              <button
                onClick={() => openOrder()}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#D8E2F2] bg-white px-4 py-2.5 text-xs font-bold text-ink hover:border-[#2E6BFF]/40 hover:text-[#2E6BFF] transition-colors"
              >
                Amankan Slot
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-[#E3EAF6] bg-white/70 p-5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50">
              <BadgeCheck className="h-5 w-5 text-emerald-500" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display font-bold text-ink">Campaign selesai</p>
              <p className="truncate text-xs text-muted-foreground">
                {completed.map((c) => `${c.id} ✓`).join("  ·  ")}
              </p>
            </div>
            <a
              href="#results"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#D8E2F2] bg-white px-4 py-2.5 text-xs font-bold text-ink hover:border-[#2E6BFF]/40 hover:text-[#2E6BFF] transition-colors"
            >
              Lihat Hasil
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- REAL RESULTS (§9 / §10) ---------- */

export function Results() {
  const [selected, setSelected] = useState<CaseStudy | null>(null);
  const { openOrder } = useModals();

  return (
    <section
      id="results"
      aria-label="Hasil campaign"
      className="py-20 lg:py-28 bg-white/60 border-y border-[#EDF2FB]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          tag="Case Studies"
          title={
            <>
              Real Campaign <span className="text-gradient">Results</span>
            </>
          }
          sub="Before → after nyata dari campaign yang sudah selesai. Klik kartu untuk melihat timeline hariannya."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {CASE_STUDIES.map((cs, i) => (
            <Reveal key={cs.code} delay={i * 90}>
              <button
                onClick={() => setSelected(cs)}
                className="group h-full w-full rounded-3xl border border-[#E3EAF6] bg-white p-5 sm:p-6 text-left shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:border-[#F0479C]/30"
                aria-label={`Lihat case study ${cs.handle}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={cs.handle} className="h-9 w-9 text-sm" />
                    <div>
                      <p className="font-display text-sm font-bold text-ink">@{cs.handle}</p>
                      <p className="text-[11px] text-muted-foreground">{cs.niche}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#F0F4FC] px-2.5 py-1 text-[10px] font-bold text-[#5B6B8A]">
                    {cs.code}
                  </span>
                </div>

                <div className="mt-5 flex items-end justify-between gap-2 rounded-2xl bg-[#F9FBFF] border border-[#EDF2FB] p-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Before</p>
                    <p className="font-display text-lg font-bold text-ink tabular-nums">{fmtID(cs.before)}</p>
                  </div>
                  <ArrowRight className="mb-1.5 h-4 w-4 shrink-0 text-[#F0479C]" />
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">After</p>
                    <p className="font-display text-lg font-bold text-gradient tabular-nums">{fmtID(cs.after)}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-600">
                    <TrendingUp className="h-3 w-3" />
                    +{fmtID(cs.gained)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#FFE3F0] px-2.5 py-1 text-xs font-bold text-[#D6337F]">
                    {cs.rate}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF1FF] px-2.5 py-1 text-xs font-bold text-[#1D4ED8]">
                    <Flame className="h-3 w-3" />
                    {cs.days} hari
                  </span>
                </div>

                <p className="mt-4 inline-flex items-center gap-1.5 border-t border-dashed border-[#E3EAF6] pt-3.5 w-full text-sm font-bold text-[#2E6BFF] transition-all group-hover:gap-2.5">
                  <Eye className="h-4 w-4" />
                  VIEW CASE STUDY
                  <ArrowRight className="h-4 w-4" />
                </p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Case study detail dialog */}
      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent className="max-w-lg rounded-3xl border-[#E3EAF6] p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          {selected && (
            <div>
              <div className="bg-ink px-6 pt-6 pb-6 grid-bg-dark">
                <DialogTitle className="text-white">
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#9DB8E8]">
                    Case Study {selected.code}
                  </span>
                  <span className="mt-2.5 block font-display text-xl font-bold">{selected.title}</span>
                </DialogTitle>
                <p className="mt-1 text-sm text-[#9DB8E8]">
                  @{selected.handle} · Campaign {selected.days} hari · Est. exposure {selected.exposure}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    { label: "Starting", value: fmtID(selected.before) },
                    { label: "Ending", value: fmtID(selected.after) },
                    { label: "Growth", value: `+${fmtID(selected.gained)}`, hl: true },
                  ].map((s) => (
                    <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#9DB8E8]">{s.label}</p>
                      <p
                        className={cn(
                          "mt-0.5 font-display text-lg font-bold tabular-nums",
                          s.hl ? "text-gradient" : "text-white"
                        )}
                      >
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-6 py-5 space-y-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-600">
                    Growth Rate {selected.rate}
                  </span>
                  <span className="rounded-full bg-[#EAF1FF] px-3 py-1.5 text-xs font-bold text-[#1D4ED8]">
                    Duration {selected.days} Days
                  </span>
                </div>

                {/* Growth chart */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground mb-2">
                    Followers Growth
                  </p>
                  <GrowthLine
                    data={selected.daily.reduce<number[]>((acc, d) => {
                      acc.push((acc[acc.length - 1] ?? selected.before) + d);
                      return acc;
                    }, [])}
                    labels={selected.daily.map((_, i) => `D${i + 1}`)}
                    height={180}
                    id={`cs-${selected.code}`}
                  />
                </div>

                {/* Campaign timeline */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground mb-3">
                    Campaign Timeline
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {selected.daily.map((d, i) => (
                      <div key={i} className="rounded-xl border border-[#E3EAF6] bg-[#F9FBFF] p-2 text-center">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Day {i + 1}</p>
                        <p className="font-display text-sm font-bold text-ink">+{fmtID(d)}</p>
                        <div className="mt-1.5 h-1 rounded-full bg-[#E9EFFB] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-brand"
                            style={{ width: `${(d / Math.max(...selected.daily)) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelected(null);
                    openOrder();
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand px-5 py-3.5 text-sm font-semibold text-white shadow-pink hover:opacity-95 transition-opacity"
                >
                  Mulai Campaign Seperti Ini
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
