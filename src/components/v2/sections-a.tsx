"use client";

/* ============ VIBELY 2.0 — TrustBar / WhatIs / HowItWorks (PRD §4-6) ============ */

import {
  BadgeCheck,
  Compass,
  Megaphone,
  MousePointerClick,
  Radio,
  TrendingUp,
  Users,
  LineChart,
  AtSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TRUST_STATS } from "@/lib/data";
import { CountUp, Reveal, SectionHead } from "./bits";

/* ---------- TRUST BAR (§4) ---------- */

export function TrustBar() {
  return (
    <section aria-label="Kepercayaan" className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <dl className="grid grid-cols-2 lg:grid-cols-4 rounded-3xl border border-[#E3EAF6] bg-white/80 shadow-soft overflow-hidden">
            {TRUST_STATS.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-7 sm:py-8 text-center",
                  i !== 0 && "border-l border-[#EDF2FB]",
                  i >= 2 && "border-t lg:border-t-0 border-[#EDF2FB]",
                  i === 2 && "border-l-0 lg:border-l",
                )}
              >
                <dd className="font-display text-3xl sm:text-4xl font-bold text-ink tabular-nums">
                  <CountUp to={s.value} suffix={s.suffix} />
                </dd>
                <dt className="text-sm font-semibold text-ink">{s.label}</dt>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- WHAT IS VIBELY (§5) ---------- */

const PILLARS = [
  { icon: Megaphone, name: "Exposure", result: "Campaign", desc: "Akun Anda tampil sebagai sponsor utama giveaway." },
  { icon: Compass, name: "Discovery", result: "New Users", desc: "Peserta baru menemukan brand Anda setiap hari." },
  { icon: TrendingUp, name: "Growth", result: "Followers", desc: "Pengunjung berubah jadi followers yang nyata." },
];

export function WhatIs() {
  return (
    <section id="about" aria-label="Tentang VIBELY" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHead
              align="left"
              tag="What is VIBELY"
              title={
                <>
                  More Than <span className="text-gradient">A Giveaway.</span>
                </>
              }
              sub="VIBELY membantu brand, creator, dan bisnis mendapatkan exposure melalui campaign giveaway yang terstruktur — bukan sekadar angka, tetapi audiens yang benar-benar menemukan Anda."
            />
            <Reveal delay={150} className="mt-6 space-y-3 max-w-xl">
              <p className="text-base leading-relaxed text-muted-foreground">
                Setiap campaign dirancang seperti funnel: peserta giveaway melihat akun Anda, mengunjungi profil,
                dan memutuskan untuk follow. Karena mereka datang karena minat sendiri, pertumbuhan yang dihasilkan
                lebih relevan dan lebih bertahan dibanding metode biasa.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Semua berjalan dengan aturan main yang jelas: tanpa password, garansi target, dan progress yang bisa
                dipantau kapan saja melalui Campaign Tracking.
              </p>
            </Reveal>
          </div>

          {/* Diagram */}
          <Reveal delay={200}>
            <div className="rounded-3xl border border-[#E3EAF6] bg-white/80 shadow-soft p-6 sm:p-8 grid-bg">
              <div className="flex flex-col items-center">
                <span className="inline-flex items-center gap-2 rounded-2xl bg-ink px-6 py-3.5 font-display text-lg font-bold text-white shadow-lift">
                  <span className="text-gradient font-bold">✦</span> VIBELY
                </span>

                <span className="h-7 w-px bg-[#C9D6EC]" aria-hidden />
                <span className="h-px w-3/4 bg-[#C9D6EC]" aria-hidden />

                <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full">
                  {PILLARS.map((p) => (
                    <div key={p.name} className="flex flex-col items-center">
                      <span className="h-7 w-px bg-[#C9D6EC]" aria-hidden />
                      <div className="w-full rounded-2xl border border-[#E3EAF6] bg-white p-3.5 sm:p-4 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                        <span className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand-soft">
                          <p.icon className="h-5 w-5 text-[#2E6BFF]" />
                        </span>
                        <p className="mt-2.5 font-display text-sm font-bold uppercase tracking-wide text-ink">
                          {p.name}
                        </p>
                        <p className="mt-0.5 text-[11px] font-semibold text-[#F0479C]">{p.result}</p>
                        <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground hidden sm:block">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                  Satu campaign — tiga lapis hasil: dilihat, ditemukan, diikuti.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS (§6) ---------- */

const STEPS = [
  {
    n: "01",
    icon: MousePointerClick,
    title: "Choose Your Campaign",
    desc: "Pilih target growth dan paket yang sesuai dengan budget Anda.",
  },
  {
    n: "02",
    icon: AtSign,
    title: "Submit Your Account",
    desc: "Masukkan username Instagram — tanpa password, tanpa akses login.",
  },
  {
    n: "03",
    icon: Radio,
    title: "Campaign Goes Live",
    desc: "Akun Anda masuk sebagai sponsor di campaign giveaway yang berjalan.",
  },
  {
    n: "04",
    icon: Users,
    title: "Audience Discovers You",
    desc: "Ribuan peserta melihat, mengunjungi, dan mengikuti akun Anda.",
  },
  {
    n: "05",
    icon: LineChart,
    title: "Track Your Growth",
    desc: "Pantau progress real-time lewat Campaign ID di dashboard tracking.",
  },
  {
    n: "06",
    icon: BadgeCheck,
    title: "Campaign Completed",
    desc: "Campaign selesai sesuai target dan hasil tersimpan di laporan Anda.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" aria-label="Cara kerja" className="py-20 lg:py-28 bg-white/60 border-y border-[#EDF2FB]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          tag="How It Works"
          title={
            <>
              How <span className="text-gradient">VIBELY</span> Works
            </>
          }
          sub="Enam langkah sederhana — dari memilih paket sampai laporan hasil di tangan Anda."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="group relative h-full rounded-3xl border border-[#E3EAF6] bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:border-[#2E6BFF]/30">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand-soft transition-colors group-hover:bg-gradient-brand">
                    <s.icon className="h-6 w-6 text-[#2E6BFF] transition-colors group-hover:text-white" />
                  </span>
                  <span className="font-display text-4xl font-bold text-[#E9EFFB] transition-colors group-hover:text-[#D8E2F2]">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
