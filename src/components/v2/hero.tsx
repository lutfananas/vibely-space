"use client";

/* ============ VIBELY 2.0 — Hero (PRD §3) ============ */

import Image from "next/image";
import { ArrowRight, Compass, Heart, ShieldCheck, Sparkles, TrendingUp, Users, Zap, BadgeCheck } from "lucide-react";
import { Avatar, CountUp, ProgressBar, useInView } from "./bits";
import { useModals } from "./provider";
import { cn } from "@/lib/utils";

export function Hero() {
  const { openOrder } = useModals();
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24" aria-label="Hero">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" />
        <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-[#FFD9EB] blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-40 -left-32 h-[460px] w-[460px] rounded-full bg-[#CFE0FF] blur-3xl opacity-80 animate-blob [animation-delay:-6s]" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-8 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <div
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-[#D8E2F2] bg-white/80 px-4 py-2 shadow-soft transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <Sparkles className="h-3.5 w-3.5 text-[#F0479C]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
                Indonesia Giveaway Campaign Platform
              </span>
            </div>

            <h1
              className={cn(
                "mt-6 font-display text-[2.6rem] leading-[1.06] sm:text-6xl lg:text-[4.2rem] font-bold text-ink transition-all duration-700 delay-100",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              Grow Your Audience.
              <br />
              <span className="text-gradient">Get Seen. Get Followed.</span>
            </h1>

            <p
              className={cn(
                "mx-auto lg:mx-0 mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground transition-all duration-700 delay-200",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              Jalankan <span className="font-semibold text-ink">campaign giveaway</span> yang membantu brand dan
              creator mendapatkan exposure kepada audiens Indonesia. Pilih paket, kirim username, pantau
              pertumbuhan — semua transparan dalam satu dashboard.
            </p>

            <div
              className={cn(
                "mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 transition-all duration-700 delay-300",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              <button
                onClick={() => openOrder()}
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-brand px-7 py-4 text-base font-semibold text-white shadow-pink transition-all hover:shadow-lift hover:-translate-y-0.5"
              >
                Start a Campaign
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#campaigns"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-[#D8E2F2] bg-white px-7 py-4 text-base font-semibold text-ink shadow-soft transition-all hover:border-[#2E6BFF]/40 hover:-translate-y-0.5"
              >
                <Compass className="h-5 w-5 text-[#2E6BFF]" />
                Explore Campaigns
              </a>
            </div>

            {/* Mini trust row */}
            <div
              className={cn(
                "mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-[13px] font-medium text-muted-foreground transition-all duration-700 delay-500",
                inView ? "opacity-100" : "opacity-0"
              )}
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Tanpa password
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-500" />
                Mulai &lt; 24 jam
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-[#2E6BFF]" />
                Garansi target
              </span>
            </div>
          </div>

          {/* Visual — floating campaign dashboard */}
          <div ref={ref} className="relative mx-auto w-full max-w-[540px] h-[470px] sm:h-[520px] lg:h-[560px]">
            {/* Poster giveaway — floating behind */}
            <figure
              className={cn(
                "absolute left-0 top-2 z-10 w-36 sm:w-44 rounded-2xl glass border border-white/80 p-2 shadow-lift animate-float-slow",
                inView ? "opacity-100" : "opacity-0"
              )}
              style={{ ["--float-rot" as string]: "-6deg", transform: inView ? undefined : "translateY(24px)", transition: "opacity 0.8s ease 0.35s" }}
            >
              <div className="overflow-hidden rounded-xl" style={{ rotate: "-6deg" }}>
                <Image
                  src="/hero-image.jpg"
                  alt="Poster giveaway campaign VIBELY SPACE"
                  width={511}
                  height={437}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
              <figcaption className="flex items-center gap-1.5 px-1 pt-2 pb-1 text-[11px] font-semibold text-ink">
                <Sparkles className="h-3 w-3 text-[#F0479C]" />
                Giveaway Poster
              </figcaption>
            </figure>

            {/* Participants chip */}
            <div
              className={cn(
                "absolute right-1 sm:right-3 top-6 z-20 flex items-center gap-2 rounded-2xl glass border border-white/80 px-3.5 py-2.5 shadow-lift animate-float-soft transition-all duration-700",
                inView ? "opacity-100" : "opacity-0"
              )}
              style={{ transitionDelay: "0.5s" }}
            >
              <div className="flex -space-x-2">
                <Avatar name="sari" className="h-7 w-7 text-[10px] ring-2 ring-white" />
                <Avatar name="rizky" className="h-7 w-7 text-[10px] ring-2 ring-white" />
                <Avatar name="dinda" className="h-7 w-7 text-[10px] ring-2 ring-white" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-ink">+382</p>
                <p className="text-[10px] font-medium text-muted-foreground">bergabung hari ini</p>
              </div>
            </div>

            {/* MAIN — Campaign performance card */}
            <div
              className={cn(
                "absolute left-1/2 top-1/2 z-30 w-[86%] sm:w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-3xl glass border border-white/80 shadow-lift p-5 sm:p-6 animate-float-soft transition-all duration-1000",
                inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
              )}
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Campaign Performance
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-ring" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Live</span>
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Avatar name="brandanda" className="h-11 w-11 text-base" />
                <div>
                  <p className="font-display font-bold text-ink">@brandanda</p>
                  <p className="text-xs text-muted-foreground">PKG-04 Pro · Campaign 4/5 hari</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-white/70 border border-white p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Followers</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-display text-2xl sm:text-[1.7rem] font-bold text-ink tabular-nums">
                    <CountUp to={4281} duration={1300} />
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <span className="font-display text-2xl sm:text-[1.7rem] font-bold text-gradient tabular-nums">
                    <CountUp to={6742} duration={1800} />
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-bold text-emerald-600">
                    <TrendingUp className="h-3.5 w-3.5" />
                    +57.5%
                  </span>
                </div>
                <ProgressBar value={68} className="mt-3.5" height="h-2.5" />
                <div className="mt-2 flex justify-between text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span>Target 2.000</span>
                  <span>87,1% progress</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse-ring" />
                  Campaign Active
                </span>
                <span className="font-display text-lg font-bold text-ink tabular-nums">
                  <CountUp to={1284} duration={2000} />
                  <span className="ml-1.5 text-xs font-medium text-muted-foreground">New Followers</span>
                </span>
              </div>
            </div>

            {/* IG likes card — bottom left */}
            <div
              className={cn(
                "absolute left-2 bottom-6 z-20 flex items-center gap-2.5 rounded-2xl glass border border-white/80 px-3.5 py-3 shadow-lift animate-float-soft transition-all duration-700",
                inView ? "opacity-100" : "opacity-0"
              )}
              style={{ animationDelay: "1.2s", transitionDelay: "0.65s" }}
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#FFE3F0]">
                <Heart className="h-5 w-5 text-[#F0479C]" fill="#F0479C" />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-ink">2.412 likes</p>
                <p className="text-[10px] font-medium text-muted-foreground">post giveaway viral</p>
              </div>
            </div>

            {/* Mini growth card — bottom right */}
            <div
              className={cn(
                "absolute right-1 bottom-10 z-20 w-40 sm:w-48 rounded-2xl glass border border-white/80 p-3.5 shadow-lift animate-float-slow transition-all duration-700",
                inView ? "opacity-100" : "opacity-0"
              )}
              style={{ ["--float-rot" as string]: "3deg", animationDelay: "0.8s", transitionDelay: "0.8s" }}
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Growth</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                  +1.742
                </span>
              </div>
              <svg viewBox="0 0 160 56" className="mt-2 w-full" aria-hidden>
                <defs>
                  <linearGradient id="hero-mini" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2E6BFF" />
                    <stop offset="100%" stopColor="#F0479C" />
                  </linearGradient>
                </defs>
                <path
                  d="M4 48 C 24 46, 34 40, 52 36 C 70 32, 82 30, 100 22 C 118 14, 136 12, 156 6"
                  fill="none"
                  stroke="url(#hero-mini)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={inView ? 0 : 1}
                  style={{ transition: "stroke-dashoffset 1.8s ease 0.6s" }}
                />
                <circle cx="156" cy="6" r="4" fill="#fff" stroke="#F0479C" strokeWidth="2.5" />
              </svg>
            </div>

            {/* Status card — top left under poster */}
            <div
              className={cn(
                "absolute left-3 sm:left-8 top-[46%] z-10 hidden sm:flex items-center gap-2 rounded-2xl glass border border-white/80 px-3.5 py-2.5 shadow-lift animate-float-soft transition-all duration-700",
                inView ? "opacity-100" : "opacity-0"
              )}
              style={{ animationDelay: "1.6s", transitionDelay: "0.95s" }}
            >
              <Users className="h-5 w-5 text-[#2E6BFF]" />
              <p className="text-xs font-semibold text-ink">
                12.483 <span className="font-medium text-muted-foreground">peserta giveaway</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
