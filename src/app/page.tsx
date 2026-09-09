'use client'

import { useState, useEffect, useRef, createContext, useContext, type PointerEvent as ReactPointerEvent } from 'react'
import { ChevronLeft, ChevronRight, X, MessageCircle, Check, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

/* ============================================================
   DECORATIVE COMPONENTS
   ============================================================ */

// Ambient pink + blue blobs
function AmbientBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-300/25 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-sky-300/25 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-fuchsia-200/25 rounded-full blur-3xl animate-blob" style={{ animationDelay: '8s' }} />
    </div>
  )
}

// Floating cute stickers
function FloatingStickers() {
  const stickers = [
    { emoji: '💖', x: '6%', y: '18%', size: 'text-2xl', delay: '0s', dur: '4s' },
    { emoji: '✨', x: '14%', y: '62%', size: 'text-xl', delay: '1s', dur: '5s' },
    { emoji: '🎀', x: '88%', y: '22%', size: 'text-3xl', delay: '0.5s', dur: '4.5s' },
    { emoji: '💙', x: '80%', y: '68%', size: 'text-2xl', delay: '1.5s', dur: '5.5s' },
    { emoji: '💕', x: '70%', y: '12%', size: 'text-lg', delay: '2s', dur: '4s' },
    { emoji: '🦋', x: '24%', y: '80%', size: 'text-xl', delay: '0.8s', dur: '6s' },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stickers.map((s, i) => (
        <span
          key={i}
          className={`absolute ${s.size} opacity-40 animate-float-slow`}
          style={{ left: s.x, top: s.y, animationDelay: s.delay, animationDuration: s.dur }}
        >
          {s.emoji}
        </span>
      ))}
    </div>
  )
}

/* ============================================================
   WHATSAPP HELPERS — adaptasi flow order dari 2.0:
   klik paket -> modal -> isi data -> review -> WA (TANPA
   pemilihan bank/pembayaran; admin kirim rekening via WA)
   ============================================================ */

const WA_NUMBER = '6285694106233'

const waGeneralLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  'Halo VIBELY SPACE ✦ Saya mau tanya soal Sponsor Giveaway 😊'
)}`

const PACKAGES = [
  { id: 'PKG-02', poster: '2️⃣', price: 'Rp15.000', jaminan: '200', keepHari: 'Menyesuaikan', gain: '200-300+', popular: false },
  { id: 'PKG-03', poster: '3️⃣', price: 'Rp28.000', jaminan: '500', keepHari: 'Menyesuaikan', gain: '500-750+', popular: false },
  { id: 'PKG-04', poster: '4️⃣', price: 'Rp42.000', jaminan: '1.000', keepHari: '1-5', gain: '1k-1,5k+', popular: false },
  { id: 'PKG-05', poster: '5️⃣', price: 'Rp62.000', jaminan: '2.000', keepHari: '1-6', gain: '2k-2,5k+', popular: true },
  { id: 'PKG-06', poster: '6️⃣', price: 'Rp115.000', jaminan: '5.000', keepHari: '3-6', gain: '5k-8k+', popular: false },
  { id: 'PKG-07', poster: '7️⃣', price: 'Rp185.000', jaminan: '10.000', keepHari: '5-10', gain: '10k-11k+', popular: false },
] as const

type OrderPkg = (typeof PACKAGES)[number]

// Context agar komponen mana pun bisa membuka modal order
const OrderCtx = createContext<(pkgId?: string) => void>(() => {})

// Scrolling marquee strip — pink→blue gradient
function MarqueeStrip() {
  const items = ['SPONSOR GIVEAWAY', 'MURAH', 'CEPAT', 'TERPERCAYA', 'REAL INDO', 'AKTIF']
  const row = [...items, ...items, ...items, ...items]
  return (
    <div className="relative overflow-hidden gradient-animated py-3.5 -rotate-1 scale-[1.02] shadow-cute">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(2)].map((_, dup) => (
          <div key={dup} className="flex shrink-0">
            {row.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-6 px-6 text-white font-display font-semibold text-sm tracking-[0.2em]">
                {item}
                <span className="text-white/70">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// Section header — accent alternates pink / blue
function SectionHeader({ badge, title, subtitle, accent = 'pink' }: {
  badge: string
  title: React.ReactNode
  subtitle?: string
  accent?: 'pink' | 'blue'
}) {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <span className={`inline-flex items-center gap-2 glass text-xs sm:text-sm font-bold uppercase tracking-widest px-5 py-2 rounded-full border shadow-sm mb-5 ${
        accent === 'blue'
          ? 'text-sky-600 border-sky-200/80'
          : 'text-primary border-pink-200/80'
      }`}>
        {badge}
      </span>
      <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-semibold text-foreground leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-base sm:text-lg mt-4 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}

/* ============================================================
   HOOKS
   ============================================================ */

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isInView } = useInView(0.1)
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ============================================================
   GROWTH CHART — full-width dramatic follower growth proof
   ============================================================ */

const GROWTH_VALUES = [0, 300, 1000, 5000, 10000]

function smoothPath(pts: { x: number; y: number }[]) {
  let d = `M${pts[0].x},${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`
  }
  return d
}

function GrowthChart() {
  const { ref, isInView } = useInView(0.2)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let raf = 0
    const t0 = performance.now()
    const duration = 2400
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * 10000))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView])

  const X0 = 56, X1 = 1156, Y0 = 380, YMAX = 56
  const pts = GROWTH_VALUES.map((v, i) => ({
    x: X0 + (i * (X1 - X0)) / (GROWTH_VALUES.length - 1),
    y: Y0 - (v / 10500) * (Y0 - YMAX),
  }))
  const line = smoothPath(pts)
  const area = `${line} L${X1},${Y0} L${X0},${Y0} Z`
  const yTicks = [
    { v: 0, label: '0' },
    { v: 2500, label: '2,5K' },
    { v: 5000, label: '5K' },
    { v: 7500, label: '7,5K' },
    { v: 10000, label: '10K' },
  ]
  const xTicks: { i: number; label: string; anchor: 'start' | 'middle' | 'end' }[] = [
    { i: 0, label: '0 Jam', anchor: 'start' },
    { i: 1, label: '12 Jam', anchor: 'middle' },
    { i: 2, label: 'Hari 1', anchor: 'middle' },
    { i: 3, label: 'Hari 2', anchor: 'middle' },
    { i: 4, label: 'Hari 3', anchor: 'end' },
  ]

  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-pink-50/70 via-white to-sky-50/70">
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-[18%] w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative w-full px-4 sm:px-8">
        {/* header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 sm:mb-10">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 glass text-xs sm:text-sm font-bold uppercase tracking-widest px-5 py-2 rounded-full border border-pink-200/80 text-primary shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Growth — Setelah Order
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-foreground leading-tight mt-5">
              Followers <span className="gradient-text">Naik Drastis</span> dalam 1–3 Hari! 🚀
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mt-3 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Ini dia buktinya! Begitu jadi Sponsor Giveaway VIBELY SPACE, followers mulai mengalir
              dari 0–12 jam dan tembus 10K+++ di hari ke-3!
            </p>
          </div>
          <div className="glass rounded-3xl border border-pink-200/80 shadow-cute px-7 py-5 text-center shrink-0 mx-auto lg:mx-0">
            <p className="text-[10px] font-bold tracking-[0.25em] text-muted-foreground">TOTAL FOLLS MASUK</p>
            <p className="font-display text-4xl sm:text-5xl font-bold gradient-text leading-tight mt-1">
              {count.toLocaleString('id-ID')}<span className="text-[0.55em] align-top">+++</span>
            </p>
          </div>
        </div>

        {/* chart card */}
        <div className="relative bg-white/90 rounded-[2rem] border border-pink-100 shadow-cute-lg p-3 sm:p-6 lg:p-8">
          <div className="relative">
            <svg viewBox="0 0 1200 420" className="w-full h-auto block" role="img" aria-label="Grafik pertumbuhan followers naik drastis sampai 10K+++ dalam 1–3 hari setelah order paket">
              <defs>
                <linearGradient id="gcLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F472B6" />
                  <stop offset="55%" stopColor="#E91E8C" />
                  <stop offset="100%" stopColor="#0EA5E9" />
                </linearGradient>
                <linearGradient id="gcArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E91E8C" stopOpacity="0.30" />
                  <stop offset="55%" stopColor="#F472B6" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* grid + y labels */}
              {yTicks.map(t => {
                const y = Y0 - (t.v / 10500) * (Y0 - YMAX)
                return (
                  <g key={t.v}>
                    <line
                      x1={X0} y1={y} x2={X1} y2={y}
                      stroke="#F9A8D4"
                      strokeOpacity={t.v === 0 ? 0.55 : 0.3}
                      strokeWidth={t.v === 0 ? 2 : 1.5}
                      strokeDasharray={t.v === 0 ? undefined : '4 7'}
                    />
                    <text x={X0 - 12} y={y + 5} textAnchor="end" fontSize="15" fontWeight="600" fill="#94A3B8">{t.label}</text>
                  </g>
                )
              })}

              {/* x labels */}
              {xTicks.map(t => (
                <text key={t.label} x={pts[t.i].x} y={408} textAnchor={t.anchor} fontSize="15" fontWeight="600" fill="#94A3B8">{t.label}</text>
              ))}

              {/* area fill — reveals left to right */}
              <g style={{
                clipPath: isInView ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                opacity: isInView ? 1 : 0,
                transition: 'clip-path 2.4s ease-out, opacity 1.2s ease-out 0.3s',
              }}>
                <path d={area} fill="url(#gcArea)" />
              </g>

              {/* line — draws itself */}
              <path
                d={line}
                fill="none"
                stroke="url(#gcLine)"
                strokeWidth="5"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={isInView ? 0 : 1}
                style={{ transition: 'stroke-dashoffset 2.4s ease-out' }}
              />

              {/* milestone dots */}
              {[1, 2, 3].map(i => (
                <g key={i} style={{ opacity: isInView ? 1 : 0, transition: `opacity 0.5s ease-out ${0.5 + i * 0.3}s` }}>
                  <circle cx={pts[i].x} cy={pts[i].y} r="6.5" fill="#fff" stroke={i % 2 === 1 ? '#E91E8C' : '#0EA5E9'} strokeWidth="3.5" />
                  <text x={pts[i].x} y={pts[i].y - 16} textAnchor="middle" fontSize="16" fontWeight="700" fill={i % 2 === 1 ? '#E91E8C' : '#0284C7'}>
                    +{GROWTH_VALUES[i].toLocaleString('id-ID')}
                  </text>
                </g>
              ))}

              {/* start dot */}
              <circle cx={pts[0].x} cy={pts[0].y} r="5" fill="#CBD5E1" stroke="#fff" strokeWidth="2.5" />

              {/* peak dot with pulse */}
              <g style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.5s ease-out 2.2s' }}>
                <circle cx={X1} cy={pts[4].y} r="16" fill="#E91E8C" opacity="0.35" className="animate-ping" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
                <circle cx={X1} cy={pts[4].y} r="8" fill="#E91E8C" stroke="#fff" strokeWidth="3.5" />
              </g>
            </svg>

            {/* peak chip — 10K+++ */}
            <div className="absolute pointer-events-none" style={{ left: '96.3%', top: '17%', transform: 'translate(-90%, -130%)' }}>
              <div className="gradient-animated text-white text-xs sm:text-sm font-display font-bold px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg shadow-pink-300/50 whitespace-nowrap">
                10K+++ 🚀
              </div>
            </div>

            {/* before-order chip */}
            <div className="absolute pointer-events-none hidden sm:block" style={{ left: '9%', top: '48%' }}>
              <span className="glass border border-sky-200/80 text-sky-600 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                😴 Sebelum order
              </span>
            </div>
          </div>

          <p className="text-center text-[11px] sm:text-xs text-muted-foreground/70 mt-4">
            *Ilustrasi kecepatan rata-rata sponsor aktif — folls mulai masuk 0–12 jam, target 10K+++ tercapai 1–3 hari! 💫
          </p>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   FAST GROWTH STATS — eye-catching 1-3 day result numbers
   ============================================================ */

const FAST_STATS = [
  { chip: '⏱️ 0–12 JAM', target: 300, label: 'Folls pertama masuk', bar: 16, tone: 'pink' },
  { chip: '🌅 HARI 1', target: 1000, label: 'Folls makin rame', bar: 38, tone: 'blue' },
  { chip: '🌇 HARI 2', target: 5000, label: 'Aliran makin deras', bar: 66, tone: 'pink' },
  { chip: '🚀 HARI 3', target: 10000, label: 'Tembus 10K+++', bar: 100, tone: 'blue' },
] as const

function FastGrowthStats() {
  const { ref, isInView } = useInView(0.25)
  const [counts, setCounts] = useState([0, 0, 0, 0])

  useEffect(() => {
    if (!isInView) return
    let raf = 0
    const t0 = performance.now()
    const duration = 2100
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      setCounts(FAST_STATS.map((s, i) => {
        const local = Math.min(1, Math.max(0, p * 1.45 - i * 0.15))
        return Math.round(s.target * (1 - Math.pow(1 - local, 3)))
      }))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView])

  return (
    <section className="py-10 sm:py-14 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4">
        <Reveal>
          <SectionHeader
            badge="⚡ Hasil Kilat"
            title={<>Folls Masuk Cuma <span className="gradient-text">1–3 Hari</span>!</>}
            subtitle="Nggak perlu nunggu lama — begitu order, followers langsung mengalir masuk!"
          />
        </Reveal>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FAST_STATS.map((s, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-[1.75rem] border shadow-cute p-5 sm:p-6 text-center hover:-translate-y-1.5 hover:shadow-cute-lg transition-all duration-300 overflow-hidden ${
                s.tone === 'blue' ? 'border-sky-100' : 'border-pink-100'
              }`}
            >
              <span className="absolute -right-3 -top-3 text-5xl opacity-10">{['⚡', '🌤️', '🌊', '🚀'][i]}</span>
              <span className={`inline-block text-[10px] sm:text-[11px] font-bold tracking-widest px-3 py-1.5 rounded-full border mb-4 ${
                s.tone === 'blue' ? 'bg-sky-50 text-sky-600 border-sky-100' : 'bg-pink-50 text-primary border-pink-100'
              }`}>
                {s.chip}
              </span>
              <p className="font-display text-3xl sm:text-[2.5rem] font-bold gradient-text leading-none">
                +{counts[i].toLocaleString('id-ID')}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground font-semibold mt-2">{s.label}</p>

              {/* mini growth bar */}
              <div className="h-20 sm:h-24 mt-4 mx-auto w-12 sm:w-14 rounded-full bg-gradient-to-b from-pink-50 to-sky-50 border border-pink-100/70 flex items-end justify-center overflow-hidden">
                <div
                  className={`w-6 sm:w-8 rounded-full ${s.tone === 'blue' ? 'bg-gradient-to-t from-sky-500 to-sky-300' : 'bg-gradient-to-t from-primary to-pink-300'}`}
                  style={{
                    height: isInView ? `${s.bar}%` : '0%',
                    transition: `height 1.3s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + i * 0.2}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <Reveal delay={350}>
          <div className="text-center mt-9 sm:mt-12">
            <a
              href="#pricelist"
              className="inline-flex gradient-animated text-white font-display font-bold text-base sm:text-lg px-9 py-4 rounded-full shadow-cute hover:shadow-cute-lg hover:scale-105 active:scale-95 transition-all"
            >
              🔥 Gas Order Sekarang!
            </a>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3.5">
              Slot sponsor terbatas — jangan sampai kehabisan ✦
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================
   HERO DASHBOARD MOCKUP — marketing analytics card
   ============================================================ */

function DashboardMock() {
  return (
    <div className="relative animate-float">
      <div className="absolute -inset-6 bg-gradient-to-br from-pink-200/60 via-transparent to-sky-200/60 rounded-[2.5rem] blur-2xl opacity-60" />

      <div className="relative bg-white rounded-[2rem] border border-pink-100 shadow-cute-lg overflow-hidden max-w-md mx-auto">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-pink-100 bg-gradient-to-r from-pink-50/80 to-sky-50/80">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <div className="ml-3 flex-1 flex items-center gap-2 bg-white rounded-full px-3.5 py-1.5 border border-pink-100 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-[11px] font-semibold text-muted-foreground truncate">app.vibely.space/analytics</span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-5">
            <div className="rounded-xl border border-pink-100 bg-gradient-to-b from-white to-pink-50/50 p-2.5 sm:p-3">
              <p className="text-[9px] font-bold tracking-wider text-muted-foreground">FOLLOWERS</p>
              <p className="font-display text-base sm:text-xl font-bold text-foreground leading-tight">12.4K</p>
              <span className="text-[9px] font-bold text-emerald-600">▲ +24%</span>
            </div>
            <div className="rounded-xl border border-sky-100 bg-gradient-to-b from-white to-sky-50/50 p-2.5 sm:p-3">
              <p className="text-[9px] font-bold tracking-wider text-muted-foreground">ENGAGEMENT</p>
              <p className="font-display text-base sm:text-xl font-bold text-foreground leading-tight">98%</p>
              <span className="text-[9px] font-bold text-sky-600">REAL ✦</span>
            </div>
            <div className="rounded-xl border border-pink-100 bg-gradient-to-b from-white to-pink-50/50 p-2.5 sm:p-3">
              <p className="text-[9px] font-bold tracking-wider text-muted-foreground">STATUS</p>
              <p className="font-display text-base sm:text-xl font-bold text-foreground leading-tight flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE
              </p>
              <span className="text-[9px] font-bold text-emerald-600">AKTIF ✓</span>
            </div>
          </div>

          {/* Poster giveaway preview — aspect 2:3 biar poster kelihatan utuh (tidak terpotong) */}
          <div className="rounded-2xl border border-pink-100 p-2.5 mb-4 bg-gradient-to-b from-sky-50/40 to-pink-50/40">
            <div className="relative rounded-xl overflow-hidden bg-pink-50">
              <img
                src="/hero-image.jpg"
                alt="Poster Giveaway VIBELY SPACE"
                className="w-full aspect-[2/3] object-contain object-top"
              />
              <span className="absolute top-2.5 left-2.5 glass text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary border border-pink-200/80 px-2.5 py-1 rounded-full">
                📷 Poster Giveaway
              </span>
            </div>
          </div>

          {/* Post preview row */}
          <div className="flex items-center gap-3 rounded-2xl border border-pink-100 p-3 bg-white">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm ring-2 ring-pink-200/60">
              <img
                src="/avatar.png"
                alt="Foto owner VIBELY SPACE"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground truncate">Post Giveaway Aktif 🎉</p>
              <p className="text-[10px] text-muted-foreground">Akunmu ditag di setiap postingan</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full flex-shrink-0">✓ ON</span>
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <div className="hidden sm:block absolute -left-8 top-20 glass rounded-2xl border border-pink-100 shadow-cute px-3.5 py-2 animate-float" style={{ animationDelay: '0.8s' }}>
        <p className="text-[10px] font-bold text-muted-foreground">FOLLS MASUK</p>
        <p className="font-display text-sm font-bold text-primary">+300 💫</p>
      </div>
      <div className="hidden sm:block absolute -right-6 bottom-24 glass rounded-2xl border border-sky-100 shadow-cute px-3.5 py-2 animate-float" style={{ animationDelay: '1.4s' }}>
        <p className="text-[10px] font-bold text-muted-foreground">GARANSI</p>
        <p className="font-display text-sm font-bold text-sky-600">Aman 💙</p>
      </div>
    </div>
  )
}

/* ============================================================
   PRICE CARD — dashboard pricing style
   ============================================================ */

function PriceCard({
  pkg,
  delay,
}: {
  pkg: OrderPkg
  delay: number
}) {
  const { poster, price, jaminan, keepHari, gain, popular, id } = pkg
  const openOrder = useContext(OrderCtx)
  return (
    <Reveal delay={delay} className="h-full">
      <div className="relative h-full pt-8">
        {/* Anime avatar — on top of card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-sky-300 rounded-full blur-md opacity-50 scale-110" />
            <div className="relative w-[4.5rem] h-[4.5rem] rounded-full p-[3px] bg-gradient-to-br from-primary via-pink-400 to-sky-400 shadow-cute">
              <div className="w-full h-full rounded-full p-[2.5px] bg-white">
                <div className="w-full h-full rounded-full overflow-hidden bg-pink-50">
                  <img
                    src="/anime-circle.png"
                    alt="VIBELY SPACE"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
            <span className="absolute -top-1.5 -right-1 text-sm animate-sparkle">✦</span>
            <span className="absolute -bottom-0.5 -left-1.5 text-[10px] animate-sparkle" style={{ animationDelay: '0.6s' }}>✧</span>
          </div>
        </div>

        {/* Best badge */}
        {popular && (
          <div className="absolute -top-3 right-4 z-30 gradient-animated text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-pink-200/60 rotate-2 animate-wiggle">
            ⭐ PALING LARIS
          </div>
        )}

        <Card
          className={`group relative h-full flex flex-col rounded-[1.75rem] border-2 overflow-visible transition-all duration-500 hover:-translate-y-2.5 cursor-pointer ${
            popular
              ? 'border-primary/50 bg-white shadow-cute-lg ring-4 ring-sky-100'
              : 'border-pink-100 bg-white/90 shadow-cute hover:border-sky-200 hover:shadow-cute-lg'
          }`}
        >
          {/* top accent line */}
          <div className={`absolute top-0 left-8 right-8 h-1 rounded-full ${popular ? 'gradient-animated' : 'bg-gradient-to-r from-pink-200 via-sky-200 to-pink-200 opacity-0 group-hover:opacity-100 transition-opacity'}`} />

          <CardContent className="p-6 sm:p-7 pt-12 flex flex-col flex-1">
            {/* Header: package chip + id */}
            <div className="text-center mb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-1.5">Paket Poster</p>
              <div className="flex items-center justify-center gap-2">
                <div className={`inline-flex items-center justify-center w-13 h-13 min-w-[3.25rem] min-h-[3.25rem] rounded-2xl text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                  popular ? 'gradient-animated text-white shadow-lg shadow-pink-300/40' : 'bg-gradient-to-br from-pink-50 to-sky-50 border border-pink-100'
                }`}>
                  {poster}
                </div>
                <span className="text-[9px] font-bold text-muted-foreground/60 bg-muted px-2 py-1 rounded-md font-mono">{id}</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-center mb-6">
              <p className={`font-display font-bold text-[2rem] leading-none ${popular ? 'gradient-text' : 'text-primary'}`}>
                {price}
              </p>
            </div>

            {/* Data rows */}
            <div className="space-y-2.5 text-sm flex-1">
              {[
                { icon: '📍', bg: 'bg-sky-50 border-sky-100', label: 'Jaminan', value: `${jaminan} followers` },
                { icon: '🌷', bg: 'bg-amber-50 border-amber-100', label: 'Keep hari', value: keepHari },
                { icon: '🤩', bg: 'bg-pink-50 border-pink-100', label: 'Gain', value: `${gain} folls` },
              ].map((row, i) => (
                <div key={i} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl border ${row.bg} transition-transform duration-300 group-hover:translate-x-1`} style={{ transitionDelay: `${i * 40}ms` }}>
                  <span className="text-base">{row.icon}</span>
                  <span className="text-foreground/90">
                    <span className="font-bold">{row.label}</span>{' '}
                    <span className="font-medium">{row.value}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* CTA — buka modal order (flow 2.0: isi data -> review -> WA, tanpa pilih bank) */}
            <button
              onClick={() => openOrder(id)}
              className={`mt-6 block w-full text-center font-bold text-sm py-3 rounded-full transition-all duration-300 ${
                popular
                  ? 'gradient-animated text-white shadow-lg shadow-pink-300/50 hover:shadow-xl hover:scale-[1.03]'
                  : 'bg-gradient-to-r from-pink-50 to-sky-50 text-primary border border-pink-200 hover:gradient-animated hover:text-white hover:border-transparent hover:scale-[1.03]'
              }`}
            >
              Order Paket Ini →
            </button>
            <p className="text-center text-[10px] text-muted-foreground/70 mt-2">
              isi form singkat, langsung lanjut ke WhatsApp ✦
            </p>
          </CardContent>
        </Card>
      </div>
    </Reveal>
  )
}

/* ============================================================
   ORDER MODAL — adaptasi flow order dari 2.0 (tanpa pemilihan
   bank/pembayaran): Paket -> Isi Data -> Review -> WhatsApp.
   Admin menerima pesanan via WA lalu balas nomor rekening.
   ============================================================ */

const ORDER_STEPS = ['Paket', 'Isi Data', 'Kirim'] as const

function OrderModal({
  open,
  pkgId,
  onOpenChange,
}: {
  open: boolean
  pkgId: string | null
  onOpenChange: (v: boolean) => void
}) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [selected, setSelected] = useState<string | null>(null)
  const [username, setUsername] = useState('')
  const [startDate, setStartDate] = useState('')
  const [touched, setTouched] = useState(false)

  const close = () => onOpenChange(false)

  // Reset setiap kali modal dibuka
  useEffect(() => {
    if (open) {
      setSelected(pkgId ?? null)
      setStep(1)
      setUsername('')
      setTouched(false)
      const today = new Date().toISOString().slice(0, 10)
      setStartDate(today)
    }
  }, [open, pkgId])

  // Body scroll lock + ESC untuk menutup
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!open) return null

  const pkg = PACKAGES.find(p => p.id === selected) ?? null
  const cleanHandle = username.trim().replace(/^@/, '')
  const usernameValid = cleanHandle.length > 0
  const startDisplay = startDate
    ? new Date(startDate + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Segera'

  const buildWaMessage = () => {
    if (!pkg) return ''
    const lines = [
      'Halo VIBELY SPACE ✦',
      '',
      'Saya ingin order Sponsor Giveaway dengan detail berikut:',
      '',
      `📦 Paket: ${pkg.id} — ${pkg.price}`,
      `📍 Jaminan: ${pkg.jaminan} followers`,
      `🌷 Keep hari: ${pkg.keepHari}`,
      `🤩 Estimasi gain: ${pkg.gain} folls`,
      `📱 Instagram: @${cleanHandle}`,
      `📅 Mulai: ${startDisplay}`,
      '',
      'Mohon verifikasi pesanan & kirim nomor rekening untuk pembayaran. Terima kasih 🙏',
    ]
    return lines.join('\n')
  }

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildWaMessage())}`

  const sendToWhatsApp = () => {
    window.open(waLink, '_blank', 'noopener,noreferrer')
    setStep(4)
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-[#3D1A2B]/40 animate-fade-in sm:p-4"
      onClick={close}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative bg-white w-full sm:max-w-md rounded-t-[2rem] sm:rounded-[2rem] border border-pink-100 shadow-cute-lg animate-pop-in max-h-[92vh] flex flex-col overflow-hidden"
      >
        {/* soft glow */}
        <div
          className="absolute -top-24 -right-24 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.25) 0%, rgba(244,114,182,0) 70%)' }}
        />

        {/* Header */}
        <div className="relative flex items-center gap-2.5 px-5 pt-5 pb-3 border-b border-pink-100/80">
          {step > 1 && step < 4 ? (
            <button
              onClick={() => setStep((step - 1) as 1 | 2)}
              aria-label="Kembali"
              className="w-8 h-8 rounded-full bg-pink-50 text-primary flex items-center justify-center hover:bg-pink-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : (
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-100 to-sky-100 flex items-center justify-center text-sm">🎀</span>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-foreground text-base leading-tight truncate">
              Order Sponsor Giveaway
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              {ORDER_STEPS.map((label, i) => {
                const n = i + 1
                const done = step > n
                const active = step === n
                return (
                  <div key={label} className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                      active ? 'bg-primary text-white' : done ? 'bg-emerald-50 text-emerald-600' : 'bg-muted text-muted-foreground/70'
                    }`}>
                      {done ? '✓' : n} {label}
                    </span>
                    {n < ORDER_STEPS.length && <span className="text-pink-200 text-[9px]">›</span>}
                  </div>
                )
              })}
            </div>
          </div>
          <button
            onClick={close}
            aria-label="Tutup"
            className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:bg-pink-100 hover:text-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="relative flex-1 overflow-y-auto px-5 py-5">
          {/* ===== STEP 1: Pilih Paket ===== */}
          {step === 1 && (
            <div className="animate-pop-in">
              <p className="text-sm text-muted-foreground mb-4">Pilih paket yang kamu mau 👇</p>
              <div className="grid grid-cols-2 gap-3">
                {PACKAGES.map(p => {
                  const isSel = selected === p.id
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelected(p.id)}
                      className={`relative text-left rounded-2xl border-2 p-3.5 transition-all duration-200 hover:-translate-y-0.5 ${
                        isSel
                          ? 'border-primary bg-gradient-to-br from-pink-50 to-white ring-4 ring-pink-100 shadow-cute'
                          : 'border-pink-100 bg-white hover:border-sky-200'
                      }`}
                    >
                      {p.popular && (
                        <span className="absolute -top-2 right-2 text-[8px] font-bold gradient-animated text-white px-1.5 py-0.5 rounded-full">⭐ LARIS</span>
                      )}
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-lg">{p.poster}</span>
                        <span className="text-[9px] font-bold text-muted-foreground/60 bg-muted px-1.5 py-0.5 rounded font-mono">{p.id}</span>
                      </div>
                      <p className={`font-display font-bold text-lg leading-none mb-1.5 ${isSel ? 'gradient-text' : 'text-primary'}`}>{p.price}</p>
                      <p className="text-[10px] text-muted-foreground leading-snug">📍 Jaminan {p.jaminan} folls</p>
                      <p className="text-[10px] text-muted-foreground leading-snug">🤩 Gain {p.gain}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ===== STEP 2: Isi Data ===== */}
          {step === 2 && pkg && (
            <div className="animate-pop-in space-y-4">
              <div className="rounded-2xl bg-gradient-to-r from-pink-50 to-sky-50 border border-pink-100 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{pkg.poster}</span>
                  <div>
                    <p className="text-xs font-bold text-foreground">{pkg.id} · Jaminan {pkg.jaminan} folls</p>
                    <p className="text-[10px] text-muted-foreground">Keep {pkg.keepHari} hari · Gain {pkg.gain}</p>
                  </div>
                </div>
                <p className="font-display font-bold gradient-text">{pkg.price}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Username Instagram <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                  <input
                    autoFocus
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="usernamekamu"
                    className={`w-full pl-8 pr-4 py-3 rounded-2xl border-2 bg-white text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary ${
                      touched && !usernameValid ? 'border-red-300' : 'border-pink-100'
                    }`}
                  />
                </div>
                {touched && !usernameValid && (
                  <p className="text-[11px] text-red-500 mt-1.5">Isi username Instagram kamu dulu ya 🥺</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">Rencana Mulai</label>
                <div className="relative">
                  <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-pink-100 bg-white text-sm text-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ===== STEP 3: Review ===== */}
          {step === 3 && pkg && (
            <div className="animate-pop-in space-y-4">
              <div className="rounded-2xl border border-pink-100 overflow-hidden">
                {[
                  ['📦 Paket', `${pkg.id} — ${pkg.price}`],
                  ['📍 Jaminan', `${pkg.jaminan} followers`],
                  ['🌷 Keep hari', pkg.keepHari],
                  ['🤩 Estimasi gain', `${pkg.gain} folls`],
                  ['📱 Instagram', `@${cleanHandle}`],
                  ['📅 Mulai', startDisplay],
                ].map(([k, v], i) => (
                  <div key={i} className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm ${i % 2 ? 'bg-white' : 'bg-pink-50/50'}`}>
                    <span className="text-muted-foreground text-xs font-medium">{k}</span>
                    <span className="font-semibold text-foreground text-right">{v}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-pink-100/80 to-sky-100/80">
                  <span className="text-xs font-bold text-foreground">💰 Total</span>
                  <span className="font-display font-bold text-primary">{pkg.price}</span>
                </div>
              </div>

              <div className="rounded-2xl bg-emerald-50 border border-emerald-100 px-4 py-3.5 flex gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-700 leading-relaxed">
                  <span className="font-bold">Lanjut via WhatsApp</span> — WhatsApp akan terbuka dengan semua detail pesanan kamu sudah terisi otomatis. Kamu tinggal klik kirim, admin akan verifikasi & kirim nomor rekening ✦
                </p>
              </div>
            </div>
          )}

          {/* ===== STEP 4: Sukses ===== */}
          {step === 4 && pkg && (
            <div className="animate-pop-in text-center py-2">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <Check className="w-8 h-8 text-emerald-500" />
              </div>
              <h4 className="font-display text-xl font-semibold text-foreground mb-1.5">Pesanan Anda Siap Dikirim</h4>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> WhatsApp Terbuka
              </span>
              <div className="rounded-2xl bg-pink-50/60 border border-pink-100 px-4 py-3 text-left space-y-1 mb-5">
                <p className="text-xs text-foreground/80"><span className="font-bold">{pkg.id}</span> · {pkg.price} · Jaminan {pkg.jaminan} folls</p>
                <p className="text-xs text-foreground/80">@{cleanHandle} · mulai {startDisplay}</p>
              </div>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => window.open(waLink, '_blank', 'noopener,noreferrer')}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold text-sm py-3.5 rounded-full shadow-lg shadow-emerald-200 hover:bg-emerald-600 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4" /> Buka WhatsApp Lagi
                </button>
                <button
                  onClick={close}
                  className="w-full text-sm font-bold text-primary bg-gradient-to-r from-pink-50 to-sky-50 border border-pink-200 py-3 rounded-full hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Selesai
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step < 4 && (
          <div className="relative px-5 py-4 border-t border-pink-100/80 bg-white">
            {step === 1 && (
              <button
                onClick={() => pkg && setStep(2)}
                disabled={!pkg}
                className="w-full gradient-animated text-white font-bold text-sm py-3.5 rounded-full shadow-cute hover:shadow-cute-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none"
              >
                Lanjut Isi Data →
              </button>
            )}
            {step === 2 && (
              <div className="flex gap-2.5">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 text-sm font-bold text-muted-foreground bg-muted rounded-full hover:bg-pink-100 hover:text-primary transition-colors"
                >
                  ← Kembali
                </button>
                <button
                  onClick={() => {
                    setTouched(true)
                    if (usernameValid) setStep(3)
                  }}
                  className="flex-1 gradient-animated text-white font-bold text-sm py-3.5 rounded-full shadow-cute hover:shadow-cute-lg hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Lihat Review →
                </button>
              </div>
            )}
            {step === 3 && (
              <div className="flex gap-2.5">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 text-sm font-bold text-muted-foreground bg-muted rounded-full hover:bg-pink-100 hover:text-primary transition-colors"
                >
                  ← Kembali
                </button>
                <button
                  onClick={sendToWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold text-sm py-3.5 rounded-full shadow-lg shadow-emerald-200/70 hover:bg-emerald-600 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4" /> Kirim via WhatsApp
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ============================================================
   ORDER CHOICE MODAL — pop-up 2 pilihan ketika user klik
   "Chat WhatsApp 💬" di banner CTA bawah:
     1. Pilih Order Paket  → buka OrderModal (PKG-02..07)
     2. Direct Message      → langsung WA dengan format kosong
   ============================================================ */

const DM_WA_TEXT = [
  'Halo VIBELY SPACE ✦',
  '',
  'Format order🌷',
  'Poster : ',
  'Username IG : ',
].join('\n')

const dmWaLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(DM_WA_TEXT)}`

function OrderChoiceModal({
  open,
  onOpenChange,
  onPickPackage,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  onPickPackage: () => void
}) {
  const close = () => onOpenChange(false)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!open) return null

  const handleDirect = () => {
    close()
    window.open(dmWaLink, '_blank', 'noopener,noreferrer')
  }

  const handlePickPkg = () => {
    close()
    onPickPackage()
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-[#3D1A2B]/40 animate-fade-in p-4"
      onClick={close}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative bg-white w-full max-w-sm rounded-[2rem] border border-pink-100 shadow-cute-lg animate-pop-in overflow-hidden"
      >
        {/* soft glow */}
        <div
          className="absolute -top-24 -right-24 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.25) 0%, rgba(244,114,182,0) 70%)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.25) 0%, rgba(56,189,248,0) 70%)' }}
        />

        {/* Header */}
        <div className="relative flex items-center gap-2.5 px-5 pt-5 pb-3 border-b border-pink-100/80">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-100 to-sky-100 flex items-center justify-center text-sm">🎀</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-foreground text-base leading-tight">Mau lanjut bagaimana? ✦</h3>
            <p className="text-[11px] text-muted-foreground">Pilih salah satu opsi di bawah ya 😊</p>
          </div>
          <button
            onClick={close}
            aria-label="Tutup"
            className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:bg-pink-100 hover:text-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body — dua tombol pilihan */}
        <div className="relative px-5 py-5 space-y-3">
          {/* Pilih Order Paket */}
          <button
            onClick={handlePickPkg}
            className="w-full text-left rounded-2xl border-2 border-pink-100 hover:border-primary bg-white hover:bg-gradient-to-br from-pink-50 to-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cute group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl gradient-animated text-white flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">📦</div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-foreground text-sm">Pilih Order Paket</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">Lihat semua paket Poster 2–7, isi data singkat, lanjut WhatsApp otomatis ✦</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
          </button>

          {/* Direct Message */}
          <button
            onClick={handleDirect}
            className="w-full text-left rounded-2xl border-2 border-sky-100 hover:border-sky-400 bg-white hover:bg-gradient-to-br from-sky-50 to-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cute group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">💬</div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-foreground text-sm">Direct Message</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">Chat WA langsung dengan format kosong — isi sendiri, admin bantu proses 🙏</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-sky-500 transition-colors flex-shrink-0" />
            </div>
          </button>

          <p className="text-center text-[10px] text-muted-foreground/70 pt-1">pilih salah satu untuk lanjut 🎀</p>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   MUSIC PLAYER (welcome popup + floating toggle)
   Local audio — no YouTube iframe, no heavy blur layers
   (dua hal itu penyebab umum tombol gagal ter-paint di HP)
   ============================================================ */

function MusicPlayer() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleWelcomeClick = () => {
    const el = audioRef.current
    if (el) {
      el.volume = 0.8
      el.play().catch(() => {})
    }
    setIsPlaying(true)
    setShowWelcome(false)
  }

  const handleToggle = () => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      el.play().catch(() => {})
      setIsPlaying(true)
    } else {
      el.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      {/* Welcome popup */}
      {showWelcome && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in px-4"
          style={{
            background: 'rgba(60, 26, 43, 0.18)',
            backdropFilter: 'blur(22px) saturate(160%)',
            WebkitBackdropFilter: 'blur(22px) saturate(160%)',
          }}
        >
          <div
            className="relative rounded-[2rem] p-8 sm:p-12 max-w-sm w-full text-center animate-pop-in overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow:
                '0 12px 40px rgba(233, 30, 140, 0.20), 0 4px 16px rgba(56, 189, 248, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.7), inset 0 -1px 1px rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Soft glow — radial gradient murah, tanpa filter blur (aman di semua HP) */}
            <div
              className="absolute -top-24 -right-24 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.35) 0%, rgba(244,114,182,0) 70%)' }}
            />
            <div
              className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.35) 0%, rgba(56,189,248,0) 70%)' }}
            />

            <span className="absolute top-5 left-6 text-lg animate-sparkle">✦</span>
            <span className="absolute top-8 right-8 text-sm animate-sparkle" style={{ animationDelay: '0.5s' }}>✧</span>
            <span className="absolute bottom-8 left-8 text-sm animate-sparkle" style={{ animationDelay: '1s' }}>✨</span>
            <span className="absolute bottom-6 right-6 text-base animate-sparkle" style={{ animationDelay: '0.3s' }}>✦</span>

            <div className="relative">
              <div className="mx-auto mb-5 w-24 h-24 animate-float">
                <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-br from-primary via-pink-400 to-sky-400 shadow-cute">
                  <div className="w-full h-full rounded-full p-[2.5px] bg-white">
                    <img
                      src="/logo-circle.png"
                      alt="VIBELY SPACE"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>

              <h2 className="font-display text-2xl font-semibold text-foreground mb-1">VIBELY SPACE ✨</h2>
              <p className="italic text-sm text-muted-foreground mb-7">where cute meets clever ✦</p>

              <button
                onClick={handleWelcomeClick}
                style={{ backgroundColor: '#E91E8C' }}
                className="gradient-animated text-white font-bold text-base px-10 py-4 rounded-full shadow-cute hover:shadow-cute-lg hover:scale-105 active:scale-95 transition-all duration-300 tracking-wide"
              >
                START VIBING 💙
              </button>

              <p className="mt-4 text-xs text-muted-foreground/70">klik untuk masuk 🎀</p>
            </div>
          </div>
        </div>
      )}

      {/* Local background music — loop 00:38–01:33 */}
      <audio
        ref={audioRef}
        src="/music/vibely-theme.mp3"
        loop
        preload="auto"
        className="hidden"
        aria-hidden="true"
      />

      {/* Floating music toggle */}
      {!showWelcome && (
        <button
          onClick={handleToggle}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-animated text-white shadow-cute flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/60"
          style={{ backgroundColor: '#E91E8C' }}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <span className="text-xl">🎵</span>
          ) : (
            <span className="text-xl">▶️</span>
          )}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
          )}
        </button>
      )}
    </>
  )
}

/* ============================================================
   TESTIMONIALS — swipeable carousel (drag / swipe / arrows)
   ============================================================ */

const TESTIMONIALS = [
  {
    name: 'Nayla', handle: '@nylaa.iv', emoji: '🌸', tone: 'pink',
    text: 'Gila sih, baru 1 hari folls aku udah tembus 1k?? Dan aktif semua, sumpah ini real! Makasih vibely, next order lagi ah 💖',
  },
  {
    name: 'Rizky', handle: '@rzky.rd', emoji: '⚡', tone: 'blue',
    text: 'Awalnya ragu, ternyata folls masuknya real Indo beneran. Engagement aku ikut naik, worth it banget siiip 💯',
  },
  {
    name: 'Bu Sari', handle: '@sari.kitchen', emoji: '🍰', tone: 'pink',
    text: 'Prosesnya cepet banget, bayar jam 2 siang sorenya udah ditag. Custo tokoku ikut nambah 🥰 Recomended parah!',
  },
  {
    name: 'Dinda', handle: '@dindaapsari_', emoji: '💫', tone: 'blue',
    text: 'Pertama kali coba sponsor GA dan gak nyesel sama sekali! Adminnya ramah, fast response, folls gak drop-drop 💖',
  },
  {
    name: 'Fajar', handle: '@fjr.gaming', emoji: '🎮', tone: 'pink',
    text: 'Udah 3x order di sini dan selalu mulus. 10k folls beres dalam 3 hari, murah lagi. Gaskeun gausah mikir 🚀',
  },
] as const

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <div
      className={`w-72 sm:w-80 shrink-0 whitespace-normal text-left rounded-[1.75rem] rounded-bl-md border shadow-cute p-5 sm:p-6 hover:shadow-cute-lg hover:-translate-y-1 transition-all duration-300 ${
        t.tone === 'blue'
          ? 'bg-gradient-to-br from-sky-50 to-white border-sky-100'
          : 'bg-gradient-to-br from-pink-50 to-white border-pink-100'
      }`}
    >
      <div className="flex items-center justify-between mb-3 gap-2">
        <span className="text-xs tracking-wide">⭐⭐⭐⭐⭐</span>
        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full whitespace-nowrap">✓ REAL ORDER</span>
      </div>
      <p className="text-sm text-foreground/85 leading-relaxed">“{t.text}”</p>
      <div className="flex items-center gap-2.5 mt-4">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0 shadow-sm ${
          t.tone === 'blue' ? 'bg-gradient-to-br from-sky-300 to-sky-500' : 'bg-gradient-to-br from-pink-300 to-primary'
        }`}>
          {t.emoji}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-foreground truncate">{t.name}</p>
          <p className="text-[10px] text-muted-foreground truncate">{t.handle}</p>
        </div>
      </div>
    </div>
  )
}

function TestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const [active, setActive] = useState(0)
  const drag = useRef({ down: false, startX: 0, startScroll: 0 })
  // Auto-play state: timer ticks every 4s, paused during user interaction
  const autoTimerRef = useRef<number | null>(null)
  const resumeTimerRef = useRef<number | null>(null)
  const AUTOPLAY_INTERVAL = 4500 // ms — sedikit lebih lambat supaya user bisa baca
  const RESUME_DELAY = 3000 // ms setelah interaksi terakhir sebelum auto-play jalan lagi

  const updateState = () => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
    const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-card]'))
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0
    let best = 0
    let bestDist = Infinity
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - pad - el.scrollLeft)
      if (d < bestDist) { bestDist = d; best = i }
    })
    if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) best = cards.length - 1
    setActive(best)
  }

  // ===== AUTO-PLAY helpers =====
  const clearAutoTimer = () => {
    if (autoTimerRef.current !== null) {
      clearTimeout(autoTimerRef.current)
      autoTimerRef.current = null
    }
  }
  const clearResumeTimer = () => {
    if (resumeTimerRef.current !== null) {
      clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = null
    }
  }
  const scheduleAutoPlay = () => {
    clearAutoTimer()
    autoTimerRef.current = window.setTimeout(() => {
      const el = trackRef.current
      if (!el) return scheduleAutoPlay()
      const max = el.scrollWidth - el.clientWidth
      // Kalau sudah di ujung kanan, balik ke awal; kalau belum, maju 1 kartu
      if (el.scrollLeft >= max - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-card]'))
        const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0
        const cur = el.scrollLeft
        const pos = cards
          .map(c => Math.min(c.offsetLeft - pad, max))
          .filter(p => p > cur + 10)
        if (pos.length) {
          el.scrollTo({ left: Math.min(...pos), behavior: 'smooth' })
        } else {
          el.scrollTo({ left: 0, behavior: 'smooth' })
        }
      }
      scheduleAutoPlay()
    }, AUTOPLAY_INTERVAL)
  }
  const pauseAutoPlay = () => {
    clearAutoTimer()
    clearResumeTimer()
  }
  const resumeAutoPlay = (delay = RESUME_DELAY) => {
    clearResumeTimer()
    clearAutoTimer()
    resumeTimerRef.current = window.setTimeout(() => scheduleAutoPlay(), delay)
  }

  useEffect(() => {
    updateState()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateState, { passive: true })
    window.addEventListener('resize', updateState)
    scheduleAutoPlay() // mulai auto-play saat mount
    return () => {
      el.removeEventListener('scroll', updateState)
      window.removeEventListener('resize', updateState)
      clearAutoTimer()
      clearResumeTimer()
    }
  }, [])

  const scrollToCard = (i: number) => {
    const el = trackRef.current
    if (!el) return
    const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-card]'))
    const card = cards[Math.max(0, Math.min(i, cards.length - 1))]
    if (!card) return
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0
    el.scrollTo({ left: card.offsetLeft - pad, behavior: 'smooth' })
  }

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-card]'))
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0
    const max = el.scrollWidth - el.clientWidth
    const cur = el.scrollLeft
    const pos = cards
      .map(c => Math.min(c.offsetLeft - pad, max))
      .filter(p => (dir === 1 ? p > cur + 10 : p < cur - 10))
    if (!pos.length) return
    const target = dir === 1 ? Math.min(...pos) : Math.max(...pos)
    el.scrollTo({ left: target, behavior: 'smooth' })
  }

  /* drag-to-scroll pakai mouse — di HP sudah native swipe.
     Auto-play selalu di-pause saat pointer down (semua tipe),
     dan resume ~3 detik setelah pointer up / cancel. */
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    pauseAutoPlay()
    if (e.pointerType !== 'mouse') return
    const el = trackRef.current
    if (!el) return
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft }
    el.style.scrollSnapType = 'none'
    el.style.cursor = 'grabbing'
    try { el.setPointerCapture(e.pointerId) } catch {}
  }
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.down) return
    const el = trackRef.current
    if (!el) return
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX)
  }
  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (drag.current.down) {
      drag.current.down = false
      const el = trackRef.current
      if (el) {
        el.style.scrollSnapType = ''
        el.style.cursor = ''
        try { el.releasePointerCapture(e.pointerId) } catch {}
      }
    }
    // Selalu resume setelah pointer up / cancel (semua tipe pointer)
    resumeAutoPlay()
  }

  return (
    <div className="mt-14 sm:mt-16 relative">
      <div className="max-w-4xl mx-auto px-4 mb-8 sm:mb-10 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 glass text-xs sm:text-sm font-bold uppercase tracking-widest px-5 py-2 rounded-full border border-pink-200/80 text-primary shadow-sm">
            💬 Kata Mereka
          </span>
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground leading-tight mt-4">
            Kata <span className="gradient-text">Sponsor Puas</span> Kami ⭐
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base mt-2.5">Ribuan sponsor sudah buktikan — sekarang giliran kamu! 💕</p>
        </Reveal>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          className="no-scrollbar flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory cursor-grab select-none px-4 sm:px-6 [scroll-padding-left:1rem] sm:[scroll-padding-left:1.5rem]"
        >
          {TESTIMONIALS.map((t, i) => (
            <div key={i} data-card className="snap-start shrink-0">
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>

        {/* Arrow buttons — desktop */}
        <button
          onClick={() => { pauseAutoPlay(); scrollByCard(-1); resumeAutoPlay() }}
          disabled={!canPrev}
          aria-label="Review sebelumnya"
          className="hidden sm:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white border border-pink-200 text-primary shadow-cute hover:shadow-cute-lg hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => { pauseAutoPlay(); scrollByCard(1); resumeAutoPlay() }}
          disabled={!canNext}
          aria-label="Review berikutnya"
          className="hidden sm:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white border border-pink-200 text-primary shadow-cute hover:shadow-cute-lg hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => { pauseAutoPlay(); scrollToCard(i); resumeAutoPlay() }}
            aria-label={`Ke review ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? 'w-6 bg-primary shadow-sm' : 'w-2 bg-pink-200 hover:bg-pink-300'
            }`}
          />
        ))}
      </div>

      <p className="text-center text-[11px] text-muted-foreground/60 mt-3">auto-slide on, bisa juga di-geser manual ✦</p>
    </div>
  )
}

/* ============================================================
   DATA
   ============================================================ */

const STATS = [
  { value: '12K+', label: 'Total Followers', emoji: '💫', pct: 90, tone: 'pink' },
  { value: '100%', label: 'Real Indonesian', emoji: '🇮🇩', pct: 100, tone: 'blue' },
  { value: '200+', label: 'Sponsor Puas', emoji: '🥰', pct: 78, tone: 'pink' },
  { value: '24/7', label: 'Fast Response', emoji: '⚡', pct: 95, tone: 'blue' },
] as const

const STEPS = [
  {
    num: '1',
    emoji: '💌',
    title: 'Pilih Paket',
    desc: 'Tentukan paket Poster yang cocok dengan budget dan target followers kamu.',
  },
  {
    num: '2',
    emoji: '💬',
    title: 'Chat & Bayar',
    desc: 'Hubungi kami via WA atau IG, lalu lakukan pembayaran dengan mudah.',
  },
  {
    num: '3',
    emoji: '🎈',
    title: 'Akun Ditag',
    desc: 'Akun IG kamu langsung ditag di postingan giveaway dan followers mengalir!',
  },
]

/* ============================================================
   VIBELY LAYERS — Exposure · Discovery · Growth (adaptasi 2.0)
   ============================================================ */

const VIBELY_LAYERS = [
  {
    chip: 'CAMPAIGN',
    title: 'Exposure',
    emoji: '📣',
    desc: 'Akun Anda tampil sebagai sponsor utama giveaway.',
    tone: 'pink',
  },
  {
    chip: 'NEW USERS',
    title: 'Discovery',
    emoji: '🔎',
    desc: 'Peserta baru menemukan brand Anda setiap hari.',
    tone: 'blue',
  },
  {
    chip: 'FOLLOWERS',
    title: 'Growth',
    emoji: '🚀',
    desc: 'Pengunjung berubah jadi followers yang nyata.',
    tone: 'pink',
  },
] as const

function VibelyLayers() {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-5xl mx-auto px-4">
        <Reveal>
          <SectionHeader
            badge="✦ VIBELY"
            title={<>Satu Campaign, <span className="gradient-text">Tiga Lapis Hasil</span></>}
          />
        </Reveal>

        <div className="relative grid sm:grid-cols-3 gap-6">
          {/* connector line */}
          <div className="hidden sm:block absolute top-14 left-[20%] right-[20%] border-t-2 border-dashed border-sky-200" />
          {VIBELY_LAYERS.map((layer, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="relative bg-white rounded-[2rem] border border-pink-100 shadow-cute p-7 text-center h-full hover:-translate-y-2 hover:shadow-cute-lg transition-all duration-300">
                <div className="relative mx-auto mb-4 w-16 h-16">
                  <div className={`absolute inset-0 rounded-2xl rotate-6 opacity-20 ${layer.tone === 'blue' ? 'bg-sky-400' : 'bg-primary'}`} />
                  <div className={`relative w-full h-full rounded-2xl flex items-center justify-center text-2xl shadow-lg ${
                    layer.tone === 'blue'
                      ? 'bg-gradient-to-br from-sky-400 to-sky-600 shadow-sky-300/40'
                      : 'gradient-animated shadow-pink-300/40'
                  }`}>
                    {layer.emoji}
                  </div>
                  <span className={`absolute -top-2 -right-2 w-6 h-6 bg-white border-2 text-xs font-bold rounded-full flex items-center justify-center ${
                    i % 2 === 0 ? 'border-primary text-primary' : 'border-sky-500 text-sky-500'
                  }`}>
                    {i + 1}
                  </span>
                </div>
                <span className={`inline-block text-[9px] font-bold tracking-[0.2em] px-2.5 py-1 rounded-full border mb-2.5 ${
                  layer.tone === 'blue'
                    ? 'bg-sky-50 text-sky-600 border-sky-100'
                    : 'bg-pink-50 text-primary border-pink-100'
                }`}>
                  {layer.chip}
                </span>
                <p className="font-display font-semibold text-lg text-foreground mb-1.5">{layer.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{layer.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={350}>
          <p className="text-center mt-9 text-sm sm:text-base text-muted-foreground">
            Satu campaign — tiga lapis hasil:{' '}
            <span className="font-bold text-primary">dilihat</span>,{' '}
            <span className="font-bold text-sky-600">ditemukan</span>,{' '}
            <span className="font-bold gradient-text">diikuti</span> ✦
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================
   ACCOUNT SAFETY — trust & transparency (adaptasi 2.0)
   ============================================================ */

const SAFETY_ITEMS = [
  {
    emoji: '🔒',
    title: 'No Password Required',
    desc: 'Kami tidak pernah meminta password Instagram Anda. Hanya @username.',
    tone: 'pink',
  },
  {
    emoji: '📊',
    title: 'Transparent Tracking',
    desc: 'Pantau progress campaign real-time lewat Campaign Tracking.',
    tone: 'blue',
  },
  {
    emoji: '🛡️',
    title: 'Privacy Protected',
    desc: 'Data Anda hanya dipakai untuk campaign — tidak pernah dibagikan.',
    tone: 'pink',
  },
  {
    emoji: '👥',
    title: 'Human Support',
    desc: 'Tim support manusia (bukan bot) yang siap membantu 24/7.',
    tone: 'blue',
  },
  {
    emoji: '📜',
    title: 'Clear Campaign Terms',
    desc: 'Syarat, durasi, dan garansi tertulis jelas sebelum Anda order.',
    tone: 'pink',
  },
] as const

function AccountSafety() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-50/60 to-transparent pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4">
        <Reveal>
          <SectionHeader
            badge="🛡️ Account Safety"
            accent="blue"
            title={<>Aman & <span className="gradient-text">Transparan</span></>}
            subtitle="Campaign berjalan di sisi VIBELY — akun Anda tetap sepenuhnya milik Anda."
          />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAFETY_ITEMS.map((item, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className={`bg-white rounded-[1.75rem] p-6 shadow-cute border h-full hover:-translate-y-1.5 hover:shadow-cute-lg transition-all duration-300 ${
                item.tone === 'blue' ? 'border-sky-100 hover:border-sky-300' : 'border-pink-100 hover:border-primary/40'
              }`}>
                <span className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 ${
                  item.tone === 'blue' ? 'bg-sky-50' : 'bg-pink-50'
                }`}>
                  {item.emoji}
                </span>
                <p className="font-display font-semibold text-foreground mb-1.5">{item.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}

          {/* Tile ke-6 — mini CTA agar grid 3x2 rapi */}
          <Reveal delay={450}>
            <a href={waGeneralLink} target="_blank" rel="noopener noreferrer" className="block h-full group">
              <div className="gradient-animated rounded-[1.75rem] p-6 shadow-cute h-full relative overflow-hidden hover:-translate-y-1.5 hover:shadow-cute-lg transition-all duration-300">
                <div className="absolute -right-4 -top-4 text-6xl opacity-20">💬</div>
                <span className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 bg-white/20">💬</span>
                <p className="font-display font-semibold text-white mb-1.5">Masih ada pertanyaan?</p>
                <p className="text-sm text-white/85 leading-relaxed">Chat tim VIBELY — fast response setiap hari ✦</p>
                <span className="inline-block mt-4 text-sm font-bold text-white group-hover:translate-x-1 transition-transform">Chat WhatsApp →</span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [orderPkg, setOrderPkg] = useState<string | null>(null)
  const [choiceOpen, setChoiceOpen] = useState(false)

  const openOrder = (pkgId?: string) => {
    setOrderPkg(pkgId ?? null)
    setOrderOpen(true)
  }

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <OrderCtx.Provider value={openOrder}>
    <div className="min-h-screen flex flex-col">
      <MusicPlayer />

      {/* ===== FLOATING NAVBAR (iOS 27 Liquid Glass) ===== */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4">
        <header
          className="max-w-4xl mx-auto liquid-glass rounded-full shadow-cute"
          style={{
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          }}
        >
          <div className="px-5 py-2.5 flex items-center justify-between gap-3">
            <a href="#" className="flex items-center gap-2.5 min-w-0">
              <img
                src="/logo-circle.png"
                alt="VIBELY SPACE Logo"
                className="w-9 h-9 rounded-full border-2 border-pink-200 shadow-sm flex-shrink-0"
              />
              <span className="font-display font-semibold text-primary text-base truncate">
                VIBELY SPACE ✨
              </span>
            </a>
            <nav className="flex items-center gap-1 sm:gap-2">
              <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full mr-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ONLINE
              </span>
              <a href="#about" className="hidden sm:inline-flex text-sm font-semibold text-foreground/70 hover:text-primary px-3 py-1.5 rounded-full hover:bg-secondary transition-colors">
                Tentang
              </a>
              <a href="#pricelist" className="hidden sm:inline-flex text-sm font-semibold text-foreground/70 hover:text-primary px-3 py-1.5 rounded-full hover:bg-secondary transition-colors">
                Harga
              </a>
              <button
                onClick={() => openOrder()}
                className="inline-flex items-center gap-1.5 gradient-animated text-white text-sm font-bold px-4 py-2 rounded-full shadow-md shadow-pink-300/40 hover:scale-105 transition-transform"
              >
                💬 Order
              </button>
            </nav>
          </div>
        </header>
      </div>

      <main className="flex-1">
        {/* ===== HERO + DASHBOARD MOCK ===== */}
        <section className="relative overflow-hidden pt-32 sm:pt-36 pb-20 sm:pb-28 grid-bg">
          <AmbientBlobs />
          <FloatingStickers />

          <div className="relative max-w-6xl mx-auto px-4">
            <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Left: copy */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 glass border border-sky-200/80 text-sky-600 text-xs sm:text-sm font-bold px-4 py-2 rounded-full mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>VIBELY SYSTEM START - LIVE</span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.6rem] font-semibold text-foreground leading-[1.12] mb-6">
                  Jadi Sponsor{' '}
                  <span className="relative inline-block">
                    <span className="gradient-text">Giveaway</span>
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 220 14" fill="none" preserveAspectRatio="none">
                      <path d="M3 10C60 3 160 3 217 10" stroke="#E91E8C" strokeWidth="4" strokeLinecap="round" opacity="0.35"/>
                    </svg>
                  </span>
                  <br />
                  <span className="text-[0.62em] sm:text-[0.65em]">Dapatkan </span>
                  <span className="text-[0.62em] sm:text-[0.65em] gradient-text font-bold">10K+++ Folls</span>
                  <span className="text-[0.62em] sm:text-[0.65em]"> Real Indo + Aktif 💞</span>
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground mb-9 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Murah, cepat & lebih terpercaya! Akun IG kamu akan ditag di postingan giveaway
                  agar orang nge-follow akun kamu secara organik.
                </p>

                <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
                  <a href="#pricelist">
                    <Button className="gradient-animated text-white font-bold px-8 py-6 rounded-full text-base shadow-cute hover:shadow-cute-lg hover:scale-105 transition-all border-0">
                      Lihat Price List ✨
                    </Button>
                  </a>
                  <a href="#about">
                    <Button variant="outline" className="glass border-2 border-sky-200 text-sky-600 font-bold px-8 py-6 rounded-full text-base hover:bg-sky-50 hover:scale-105 transition-all shadow-sm">
                      Cara Kerjanya? 🌷
                    </Button>
                  </a>
                </div>

                {/* trust row */}
                <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Real Indo</span>
                  <span className="w-1 h-1 rounded-full bg-pink-300" />
                  <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Aktif</span>
                  <span className="w-1 h-1 rounded-full bg-sky-300" />
                  <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Bergaransi</span>
                </div>
              </div>

              {/* Right: dashboard mockup */}
              <div className="flex-shrink-0 w-full lg:w-auto">
                <DashboardMock />
              </div>
            </div>
          </div>
        </section>

        {/* ===== MARQUEE STRIP ===== */}
        <MarqueeStrip />

        {/* ===== FULL-WIDTH GROWTH CHART ===== */}
        <GrowthChart />

        {/* ===== KPI STATS ===== */}
        <section className="py-14 sm:py-16 relative">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {STATS.map((stat, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="group bg-white/90 rounded-3xl border border-pink-100 shadow-cute px-4 py-6 text-center hover:-translate-y-1.5 hover:shadow-cute-lg transition-all duration-300">
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                      <span className="text-xl group-hover:scale-125 transition-transform duration-300">{stat.emoji}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        i % 2 === 0 ? 'bg-pink-50 text-pink-500' : 'bg-sky-50 text-sky-500'
                      }`}>▲ TREND</span>
                    </div>
                    <p className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-none">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground font-semibold mt-1.5 mb-3">{stat.label}</p>
                    {/* mini progress bar */}
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${stat.tone === 'pink' ? 'bg-gradient-to-r from-pink-400 to-primary' : 'bg-gradient-to-r from-sky-400 to-sky-600'}`}
                        style={{ width: `${stat.pct}%` }}
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <section id="about" className="py-16 sm:py-24 relative">
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <SectionHeader
                badge="🌷 Tentang Kami"
                title={<>Apa Sih <span className="gradient-text">Sponsor Giveaway</span> Itu?</>}
              />
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Logo visual */}
              <Reveal>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-8 bg-gradient-to-br from-pink-200/60 to-sky-200/60 rounded-full blur-3xl opacity-60" />
                    <div className="relative animate-float">
                      <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-[2.5rem] p-1.5 bg-gradient-to-br from-primary via-pink-300 to-sky-300 shadow-cute-lg">
                        <img
                          src="/logo.png"
                          alt="VIBELY SPACE Logo"
                          className="w-full h-full rounded-[2.25rem] object-cover border-4 border-white"
                        />
                      </div>
                      <span className="absolute -top-4 -right-4 text-3xl animate-wiggle">🎀</span>
                      <span className="absolute -bottom-3 -left-4 text-2xl animate-float">💙</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Explanation */}
              <div className="space-y-4">
                <Reveal delay={100}>
                  <div className="bg-white rounded-3xl p-6 shadow-cute border border-pink-100">
                    <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                      <span className="font-bold text-primary">Sponsor Giveaway</span> artinya akun IG kamu
                      akan ditag di postingan giveaway agar orang nge-follow akun kamu. Ini cara paling
                      efektif untuk meningkatkan followers secara organik!
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={200}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { emoji: '🌷', title: 'Insight Ramai', desc: 'Followers aktif bikin engagement & insight akun kamu naik signifikan', tone: 'pink' },
                      { emoji: '💼', title: 'Bisnis Dipercaya', desc: 'Akun bisnis jadi lebih kredibel & ada peminat karena followers real', tone: 'blue' },
                    ].map((item, i) => (
                      <div key={i} className={`bg-white rounded-3xl p-5 shadow-cute border hover:-translate-y-1 transition-all duration-300 ${
                        item.tone === 'blue' ? 'border-sky-100 hover:border-sky-300' : 'border-pink-100 hover:border-primary/40'
                      }`}>
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${
                          item.tone === 'blue' ? 'bg-sky-50' : 'bg-pink-50'
                        }`}>{item.emoji}</span>
                        <p className="font-display font-semibold text-foreground mt-1 mb-1">{item.title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={300}>
                  <div className="gradient-animated rounded-3xl p-6 shadow-cute relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 text-6xl opacity-20">💗</div>
                    <p className="text-sm sm:text-base text-white leading-relaxed relative">
                      <span className="font-display font-bold">Berbeda dengan beli followers!</span> Followers
                      beli-an belum tentu aktif & asli Indo — kebanyakan bot. Sponsor GA lebih{' '}
                      <span className="font-bold">murah, cepat & terpercaya!</span>
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ===== VIBELY LAYERS — Exposure · Discovery · Growth ===== */}
        <VibelyLayers />

        {/* ===== FAST GROWTH STATS — eye-catching 1-3 day numbers ===== */}
        <FastGrowthStats />

        {/* ===== PRICE LIST ===== */}
        <section id="pricelist" className="py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-50/60 to-transparent pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4">
            <Reveal>
              <SectionHeader
                badge="💸 Price List"
                accent="blue"
                title={<>Sponsor Giveaway by <span className="gradient-text">VIBELY SPACE</span> ✨</>}
                subtitle="Pilih paket yang sesuai dengan kebutuhanmu — semua paket bergaransi!"
              />
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {PACKAGES.map(p => (
                <PriceCard key={p.id} pkg={p} delay={(Number(p.id.replace(/\D/g, '')) - 2) * 100} />
              ))}
            </div>
          </div>
        </section>

        {/* ===== HOW TO ORDER ===== */}
        <section className="py-16 sm:py-24 relative">
          <div className="max-w-5xl mx-auto px-4">
            <Reveal>
              <SectionHeader
                badge="🎈 Cara Order"
                title={<>Order Cuma <span className="gradient-text">3 Langkah</span>!</>}
              />
            </Reveal>

            <div className="grid sm:grid-cols-3 gap-6 relative">
              <div className="hidden sm:block absolute top-14 left-[20%] right-[20%] border-t-2 border-dashed border-sky-200" />
              {STEPS.map((step, i) => (
                <Reveal key={i} delay={i * 120}>
                  <div className="relative bg-white rounded-[2rem] border border-pink-100 shadow-cute p-7 text-center hover:-translate-y-2 hover:shadow-cute-lg transition-all duration-300">
                    <div className="relative mx-auto mb-4 w-16 h-16">
                      <div className="absolute inset-0 gradient-animated rounded-2xl rotate-6 opacity-20" />
                      <div className="relative w-full h-full gradient-animated rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-pink-300/40">
                        {step.emoji}
                      </div>
                      <span className={`absolute -top-2 -right-2 w-6 h-6 bg-white border-2 text-xs font-bold rounded-full flex items-center justify-center ${
                        i % 2 === 0 ? 'border-primary text-primary' : 'border-sky-500 text-sky-500'
                      }`}>
                        {step.num}
                      </span>
                    </div>
                    <p className="font-display font-semibold text-lg text-foreground mb-2">{step.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ACCOUNT SAFETY ===== */}
        <AccountSafety />

        {/* ===== CONTACT ===== */}
        <section id="contact" className="py-16 sm:py-24 relative">
          <div className="max-w-4xl mx-auto px-4">
            <Reveal>
              <SectionHeader
                badge="☎️ Hubungi Kami"
                accent="blue"
                title={<>Minat? <span className="gradient-text">Yuk Hubungi!</span> 💕</>}
                subtitle="Kami siap membantu kamu — fast response setiap hari!"
              />
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-5">
              <Reveal delay={100}>
                <a href="https://instagram.com/vibely.space" target="_blank" rel="noopener noreferrer" className="group block">
                  <Card className="rounded-[2rem] border-2 border-pink-100 hover:border-pink-300 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cute-lg shadow-cute bg-white overflow-hidden">
                    <CardContent className="p-7 sm:p-8 flex items-center gap-5">
                      <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.439-1.439-1.44z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground">Instagram</h3>
                        <p className="text-primary font-bold text-lg">@vibely.space</p>
                        <p className="text-xs text-muted-foreground mt-1">DM atau mention 📸</p>
                      </div>
                      <span className="ml-auto text-pink-300 group-hover:text-primary group-hover:translate-x-1 transition-all text-xl">→</span>
                    </CardContent>
                  </Card>
                </a>
              </Reveal>

              <Reveal delay={200}>
                <a href="https://wa.me/6285694106233" target="_blank" rel="noopener noreferrer" className="group block">
                  <Card className="rounded-[2rem] border-2 border-sky-100 hover:border-sky-300 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cute-lg shadow-cute bg-white overflow-hidden">
                    <CardContent className="p-7 sm:p-8 flex items-center gap-5">
                      <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground">WhatsApp</h3>
                        <p className="text-sky-600 font-bold text-lg">085694106233</p>
                        <p className="text-xs text-muted-foreground mt-1">Chat langsung 💬</p>
                      </div>
                      <span className="ml-auto text-sky-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all text-xl">→</span>
                    </CardContent>
                  </Card>
                </a>
              </Reveal>
            </div>
          </div>

          {/* ===== TESTIMONI CUTE BERJALAN ===== */}
          <TestimonialsCarousel />

          <div className="max-w-4xl mx-auto px-4">
            {/* Big CTA banner */}
            <Reveal delay={300}>
              <div className="mt-12 relative overflow-hidden rounded-[2.5rem] gradient-animated p-9 sm:p-14 text-center shadow-cute-lg">
                <FloatingStickers />
                <div className="absolute inset-0 dot-pattern opacity-20" />
                <div className="relative">
                  <h3 className="font-display text-2xl sm:text-4xl font-semibold text-white mb-4">
                    Yuk, Order Sekarang! 🎀
                  </h3>
                  <p className="text-white/85 text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed">
                    Jangan lewatkan kesempatan tingkatkan followers IG kamu dengan cara murah, cepat & terpercaya!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                    <Button
                      onClick={() => setChoiceOpen(true)}
                      className="bg-white text-primary font-bold px-8 py-6 rounded-full text-base hover:bg-white/90 hover:scale-105 transition-all shadow-lg border-0 cursor-pointer"
                    >
                      Chat WhatsApp 💬
                    </Button>
                    <a href="https://instagram.com/vibely.space" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-white/15 text-white border-2 border-white/50 font-bold px-8 py-6 rounded-full text-base hover:bg-white/25 hover:scale-105 transition-all backdrop-blur-sm">
                        DM Instagram 📸
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="relative mt-auto">
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="bg-white/90 rounded-[2rem] border border-pink-100 shadow-cute px-6 py-6 sm:px-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <img
                  src="/logo-circle.png"
                  alt="VIBELY SPACE Logo"
                  className="w-10 h-10 rounded-full border-2 border-pink-200"
                />
                <div>
                  <p className="font-display font-semibold text-primary">VIBELY SPACE ✨</p>
                  <p className="text-[11px] italic text-muted-foreground">where cute meets clever ✦</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground text-center">
                Sponsor Giveaway — Murah, Cepat & Terpercaya 💕
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/vibely.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-pink-50 text-primary flex items-center justify-center hover:gradient-animated hover:text-white transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.439-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/6285694106233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center hover:gradient-animated hover:text-white transition-all hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <p className="text-center text-[11px] text-muted-foreground/60 mt-4">
            © {new Date().getFullYear()} VIBELY SPACE. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ===== ORDER MODAL (flow 2.0) ===== */}
      <OrderModal open={orderOpen} pkgId={orderPkg} onOpenChange={setOrderOpen} />

      {/* ===== ORDER CHOICE MODAL (pop-up 2 pilihan: Pilih Paket / Direct Message) ===== */}
      <OrderChoiceModal
        open={choiceOpen}
        onOpenChange={setChoiceOpen}
        onPickPackage={() => openOrder()}
      />
    </div>
    </OrderCtx.Provider>
  )
}
