'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

/* ============================================================
   DECORATIVE COMPONENTS
   ============================================================ */

// Soft blurred gradient blobs — premium ambient background
function AmbientBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-rose-300/25 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-fuchsia-300/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '8s' }} />
    </div>
  )
}

// Floating cute stickers
function FloatingStickers() {
  const stickers = [
    { emoji: '💖', x: '6%', y: '18%', size: 'text-2xl', delay: '0s', dur: '4s' },
    { emoji: '✨', x: '14%', y: '62%', size: 'text-xl', delay: '1s', dur: '5s' },
    { emoji: '🎀', x: '88%', y: '22%', size: 'text-3xl', delay: '0.5s', dur: '4.5s' },
    { emoji: '🌸', x: '80%', y: '68%', size: 'text-2xl', delay: '1.5s', dur: '5.5s' },
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

// Scrolling marquee strip — trendy divider
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

// Section header — consistent premium look
function SectionHeader({ badge, title, subtitle }: { badge: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <span className="inline-flex items-center gap-2 glass text-primary text-xs sm:text-sm font-bold uppercase tracking-widest px-5 py-2 rounded-full border border-pink-200/70 shadow-sm mb-5">
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
   PRICE CARD
   ============================================================ */

function PriceCard({
  poster,
  price,
  jaminan,
  keepHari,
  gain,
  delay,
  popular = false,
}: {
  poster: string
  price: string
  jaminan: string
  keepHari: string
  gain: string
  delay: number
  popular?: boolean
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="relative h-full pt-8">
        {/* Anime avatar — sitting on top of card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full blur-md opacity-50 scale-110" />
            <div className="relative w-[4.5rem] h-[4.5rem] rounded-full p-[3px] bg-gradient-to-br from-primary via-pink-400 to-rose-400 shadow-cute">
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

        {/* POPULER ribbon */}
        {popular && (
          <div className="absolute -top-3 right-4 z-30 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-orange-200/60 rotate-2 animate-wiggle">
            ⭐ PALING LARIS
          </div>
        )}

        <Card
          className={`group relative h-full flex flex-col rounded-[1.75rem] border-2 overflow-visible transition-all duration-500 hover:-translate-y-2.5 cursor-pointer ${
            popular
              ? 'border-primary/60 bg-white shadow-cute-lg ring-4 ring-primary/10'
              : 'border-pink-100 bg-white/90 shadow-cute hover:border-primary/30 hover:shadow-cute-lg'
          }`}
        >
          {/* top gradient accent line */}
          <div className={`absolute top-0 left-8 right-8 h-1 rounded-full ${popular ? 'gradient-animated' : 'bg-gradient-to-r from-pink-200 via-primary/60 to-rose-200 opacity-0 group-hover:opacity-100 transition-opacity'}`} />

          <CardContent className="p-6 sm:p-7 pt-12 flex flex-col flex-1">
            {/* Poster label */}
            <div className="text-center mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground mb-1.5">Poster</p>
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                popular ? 'gradient-animated text-white shadow-lg shadow-pink-300/40' : 'bg-secondary'
              }`}>
                {poster}
              </div>
            </div>

            {/* Price */}
            <div className="text-center mb-6">
              <p className={`font-display font-bold text-[2rem] leading-none ${popular ? 'gradient-text' : 'text-primary'}`}>
                {price}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-2.5 text-sm flex-1">
              {[
                { icon: '📍', bg: 'bg-emerald-50 border-emerald-100', label: 'Jaminan', value: `${jaminan} followers` },
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

            {/* CTA */}
            <a
              href="https://wa.me/6285694106233"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 block text-center font-bold text-sm py-3 rounded-full transition-all duration-300 ${
                popular
                  ? 'gradient-animated text-white shadow-lg shadow-pink-300/50 hover:shadow-xl hover:scale-[1.03]'
                  : 'bg-secondary text-primary hover:bg-primary hover:text-white hover:scale-[1.03]'
              }`}
            >
              Order Sekarang →
            </a>
          </CardContent>
        </Card>
      </div>
    </Reveal>
  )
}

/* ============================================================
   MUSIC PLAYER (welcome popup + floating toggle)
   ============================================================ */

function MusicPlayer() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = useRef<YT.Player | null>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)

  const createPlayer = () => {
    if (playerRef.current || !playerContainerRef.current) return

    const container = document.createElement('div')
    container.id = 'yt-player-div'
    playerContainerRef.current.appendChild(container)

    playerRef.current = new window.YT.Player('yt-player-div', {
      videoId: 'DmuSAPGV7DE',
      playerVars: {
        autoplay: 1,
        start: 145,
        loop: 1,
        playlist: 'DmuSAPGV7DE',
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
        mute: 1,
      },
      events: {
        onReady: (event: { target: YT.Player }) => {
          event.target.mute()
          event.target.playVideo()
        },
        onStateChange: (event: YT.OnStateChangeEvent) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true)
          } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false)
          }
        },
      },
    })
  }

  useEffect(() => {
    if (!document.getElementById('yt-iframe-api')) {
      const tag = document.createElement('script')
      tag.id = 'yt-iframe-api'
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }

    const origReady = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      origReady?.()
      createPlayer()
    }

    if (window.YT?.Player) createPlayer()

    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy() } catch {}
        playerRef.current = null
      }
    }
  }, [])

  const handleWelcomeClick = () => {
    if (playerRef.current) {
      playerRef.current.unMute()
      playerRef.current.playVideo()
    }
    setIsMuted(false)
    setShowWelcome(false)
  }

  const handleToggle = () => {
    if (!playerRef.current) return
    if (isMuted) {
      playerRef.current.unMute()
      playerRef.current.playVideo()
      setIsMuted(false)
    } else if (isPlaying) {
      playerRef.current.pauseVideo()
      setIsMuted(true)
    } else {
      playerRef.current.playVideo()
    }
  }

  return (
    <>
      {/* Welcome popup */}
      {showWelcome && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/20 backdrop-blur-md animate-fade-in px-4">
          <div className="relative bg-white/95 rounded-[2rem] p-8 sm:p-12 shadow-cute-lg border border-pink-100 max-w-sm w-full text-center animate-pop-in overflow-hidden">
            {/* ambient blob inside popup */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-pink-200/40 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-rose-200/40 rounded-full blur-3xl" />

            {/* sparkles */}
            <span className="absolute top-5 left-6 text-lg animate-sparkle">✦</span>
            <span className="absolute top-8 right-8 text-sm animate-sparkle" style={{ animationDelay: '0.5s' }}>✧</span>
            <span className="absolute bottom-8 left-8 text-sm animate-sparkle" style={{ animationDelay: '1s' }}>✨</span>
            <span className="absolute bottom-6 right-6 text-base animate-sparkle" style={{ animationDelay: '0.3s' }}>✦</span>

            <div className="relative">
              {/* Logo */}
              <div className="mx-auto mb-5 w-24 h-24 animate-float">
                <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-br from-primary via-pink-400 to-rose-400 shadow-cute">
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
                className="gradient-animated text-white font-bold text-base px-10 py-4 rounded-full shadow-cute hover:shadow-cute-lg hover:scale-105 active:scale-95 transition-all duration-300 tracking-wide"
              >
                START VIBING 💙
              </button>

              <p className="mt-4 text-xs text-muted-foreground/70">klik untuk masuk 🎀</p>
            </div>
          </div>
        </div>
      )}

      {/* Hidden YouTube container */}
      <div
        ref={playerContainerRef}
        className="fixed w-0 h-0 overflow-hidden opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating music toggle */}
      {!showWelcome && (
        <button
          onClick={handleToggle}
          className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-animated text-white shadow-cute flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/60 group ${
            isMuted ? '' : ''
          }`}
          aria-label={isMuted ? 'Unmute music' : isPlaying ? 'Pause music' : 'Play music'}
        >
          {isMuted ? (
            <span className="text-xl">🔇</span>
          ) : isPlaying ? (
            <span className="text-xl">🎵</span>
          ) : (
            <span className="text-xl">▶️</span>
          )}
          {!isMuted && isPlaying && (
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
          )}
        </button>
      )}
    </>
  )
}

/* ============================================================
   MAIN PAGE
   ============================================================ */

const STATS = [
  { value: '12K+', label: 'Total Followers', emoji: '💫' },
  { value: '100%', label: 'Real Indonesian', emoji: '🇮🇩' },
  { value: '200+', label: 'Sponsor Puas', emoji: '🥰' },
  { value: '24/7', label: 'Fast Response', emoji: '⚡' },
]

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

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <MusicPlayer />

      {/* ===== FLOATING NAVBAR ===== */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4">
        <header className="max-w-4xl mx-auto glass rounded-full border border-pink-200/60 shadow-cute">
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
              <a href="#about" className="hidden sm:inline-flex text-sm font-semibold text-foreground/70 hover:text-primary px-3 py-1.5 rounded-full hover:bg-secondary transition-colors">
                Tentang
              </a>
              <a href="#pricelist" className="hidden sm:inline-flex text-sm font-semibold text-foreground/70 hover:text-primary px-3 py-1.5 rounded-full hover:bg-secondary transition-colors">
                Harga
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 gradient-animated text-white text-sm font-bold px-4 py-2 rounded-full shadow-md shadow-pink-300/40 hover:scale-105 transition-transform"
              >
                💬 Order
              </a>
            </nav>
          </div>
        </header>
      </div>

      <main className="flex-1">
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden pt-32 sm:pt-36 pb-20 sm:pb-28 dot-pattern">
          <AmbientBlobs />
          <FloatingStickers />

          <div className="relative max-w-6xl mx-auto px-4">
            <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Left: copy */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 glass border border-pink-200/70 text-primary text-xs sm:text-sm font-bold px-4 py-2 rounded-full mb-6 shadow-sm">
                  <span className="animate-heartbeat">💖</span>
                  <span>TRUSTED BY 200+ SPONSOR</span>
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
                  <span className="text-[0.62em] sm:text-[0.65em] gradient-text font-bold">100+ Folls</span>
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
                    <Button variant="outline" className="glass border-2 border-pink-200 text-primary font-bold px-8 py-6 rounded-full text-base hover:bg-secondary hover:scale-105 transition-all shadow-sm">
                      Cara Kerjanya? 🌷
                    </Button>
                  </a>
                </div>

                {/* mini trust row */}
                <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Real Indo</span>
                  <span className="w-1 h-1 rounded-full bg-pink-300" />
                  <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Aktif</span>
                  <span className="w-1 h-1 rounded-full bg-pink-300" />
                  <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Bergaransi</span>
                </div>
              </div>

              {/* Right: image */}
              <div className="flex-shrink-0 relative">
                <div className="relative animate-float">
                  <div className="absolute -inset-6 bg-gradient-to-r from-pink-200 to-rose-200 rounded-[2.5rem] blur-2xl opacity-50" />
                  <img
                    src="/hero-image.png"
                    alt="Sponsor Giveaway by VIBELY SPACE"
                    className="relative w-64 sm:w-72 lg:w-80 rounded-[2rem] shadow-cute-lg border-[6px] border-white"
                  />
                  {/* floating badges */}
                  <div className="absolute -bottom-5 -right-4 glass rounded-2xl shadow-cute px-4 py-2.5 border border-pink-100 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💜</span>
                      <div>
                        <div className="font-display font-bold text-primary text-base leading-none">12K+</div>
                        <div className="text-[10px] text-muted-foreground font-semibold mt-0.5">FOLLOWERS</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-5 -left-4 glass rounded-2xl shadow-cute px-4 py-2.5 border border-pink-100 animate-float" style={{ animationDelay: '0.5s' }}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">✨</span>
                      <div>
                        <div className="font-display font-bold text-primary text-base leading-none">100%</div>
                        <div className="text-[10px] text-muted-foreground font-semibold mt-0.5">TERPERCAYA</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MARQUEE STRIP ===== */}
        <MarqueeStrip />

        {/* ===== STATS ===== */}
        <section className="py-14 sm:py-16 relative">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {STATS.map((stat, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="group bg-white/90 rounded-3xl border border-pink-100 shadow-cute px-4 py-6 text-center hover:-translate-y-1.5 hover:shadow-cute-lg transition-all duration-300">
                    <span className="text-2xl block mb-2 group-hover:scale-125 transition-transform duration-300">{stat.emoji}</span>
                    <p className="font-display text-2xl sm:text-3xl font-bold gradient-text leading-none">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground font-semibold mt-2">{stat.label}</p>
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
                    <div className="absolute -inset-8 bg-gradient-to-br from-pink-200/60 to-rose-200/60 rounded-full blur-3xl opacity-60" />
                    <div className="relative animate-float">
                      <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-[2.5rem] p-1.5 bg-gradient-to-br from-primary via-pink-300 to-rose-300 shadow-cute-lg">
                        <img
                          src="/logo.png"
                          alt="VIBELY SPACE Logo"
                          className="w-full h-full rounded-[2.25rem] object-cover border-4 border-white"
                        />
                      </div>
                      {/* floating sticker */}
                      <span className="absolute -top-4 -right-4 text-3xl animate-wiggle">🎀</span>
                      <span className="absolute -bottom-3 -left-4 text-2xl animate-float">💖</span>
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
                      { emoji: '🌷', title: 'Insight Ramai', desc: 'Followers aktif bikin engagement & insight akun kamu naik signifikan' },
                      { emoji: '💼', title: 'Bisnis Dipercaya', desc: 'Akun bisnis jadi lebih kredibel & ada peminat karena followers real' },
                    ].map((item, i) => (
                      <div key={i} className="bg-white rounded-3xl p-5 shadow-cute border border-pink-100 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                        <span className="text-2xl">{item.emoji}</span>
                        <p className="font-display font-semibold text-foreground mt-2 mb-1">{item.title}</p>
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

        {/* ===== PRICE LIST ===== */}
        <section id="pricelist" className="py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-50/70 to-transparent pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4">
            <Reveal>
              <SectionHeader
                badge="💸 Price List"
                title={<>Sponsor Giveaway by <span className="gradient-text">VIBELY SPACE</span> ✨</>}
                subtitle="Pilih paket yang sesuai dengan kebutuhanmu — semua paket bergaransi!"
              />
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              <PriceCard poster="2️⃣" price="Rp15.000" jaminan="200" keepHari="Menyesuaikan" gain="200-300+" delay={0} />
              <PriceCard poster="3️⃣" price="Rp28.000" jaminan="500" keepHari="Menyesuaikan" gain="500-750+" delay={100} />
              <PriceCard poster="4️⃣" price="Rp42.000" jaminan="1.000" keepHari="1-5" gain="1k-1,5k+" delay={200} />
              <PriceCard poster="5️⃣" price="Rp62.000" jaminan="2.000" keepHari="1-6" gain="2k-2,5k+" delay={300} popular />
              <PriceCard poster="6️⃣" price="Rp115.000" jaminan="5.000" keepHari="3-6" gain="5k-8k+" delay={400} />
              <PriceCard poster="7️⃣" price="Rp185.000" jaminan="10.000" keepHari="5-10" gain="10k-11k+" delay={500} />
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
              {/* connector line (desktop) */}
              <div className="hidden sm:block absolute top-14 left-[20%] right-[20%] border-t-2 border-dashed border-pink-200" />
              {STEPS.map((step, i) => (
                <Reveal key={i} delay={i * 120}>
                  <div className="relative bg-white rounded-[2rem] border border-pink-100 shadow-cute p-7 text-center hover:-translate-y-2 hover:shadow-cute-lg transition-all duration-300">
                    {/* number bubble */}
                    <div className="relative mx-auto mb-4 w-16 h-16">
                      <div className="absolute inset-0 gradient-animated rounded-2xl rotate-6 opacity-20" />
                      <div className="relative w-full h-full gradient-animated rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-pink-300/40">
                        {step.emoji}
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-primary text-primary text-xs font-bold rounded-full flex items-center justify-center">
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

        {/* ===== CONTACT ===== */}
        <section id="contact" className="py-16 sm:py-24 relative">
          <div className="max-w-4xl mx-auto px-4">
            <Reveal>
              <SectionHeader
                badge="☎️ Hubungi Kami"
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
                  <Card className="rounded-[2rem] border-2 border-pink-100 hover:border-pink-300 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cute-lg shadow-cute bg-white overflow-hidden">
                    <CardContent className="p-7 sm:p-8 flex items-center gap-5">
                      <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground">WhatsApp</h3>
                        <p className="text-primary font-bold text-lg">085694106233</p>
                        <p className="text-xs text-muted-foreground mt-1">Chat langsung 💬</p>
                      </div>
                      <span className="ml-auto text-pink-300 group-hover:text-primary group-hover:translate-x-1 transition-all text-xl">→</span>
                    </CardContent>
                  </Card>
                </a>
              </Reveal>
            </div>

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
                    <a href="https://wa.me/6285694106233" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-white text-primary font-bold px-8 py-6 rounded-full text-base hover:bg-white/90 hover:scale-105 transition-all shadow-lg border-0">
                        Chat WhatsApp 💬
                      </Button>
                    </a>
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
                  className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110"
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
                  className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110"
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
    </div>
  )
}
