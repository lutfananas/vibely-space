'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Decorative floating hearts component
function FloatingHearts() {
  const hearts = ['💖', '💕', '💗', '🌷', '✨', '💞', '🌸', '💝']
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart, i) => (
        <span
          key={i}
          className="absolute text-xl sm:text-2xl opacity-20 animate-float"
          style={{
            left: `${10 + (i * 12) % 85}%`,
            top: `${5 + (i * 17) % 80}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + (i % 3)}s`,
          }}
        >
          {heart}
        </span>
      ))}
    </div>
  )
}

// Sparkle decorations
function SparkleDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <span
          key={i}
          className="absolute animate-sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  )
}

// Intersection Observer hook for scroll animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

// Price Card Component
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
  const { ref, isInView } = useInView(0.1)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Anime Avatar - positioned on top of card, centered */}
      <div className="flex justify-center relative z-10 -mb-10">
        <div className="relative">
          {/* Glow effect behind */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full blur-md opacity-40 scale-110" />
          {/* Pink border ring */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[3px] bg-gradient-to-br from-primary via-pink-400 to-rose-400 shadow-lg shadow-pink-200/60">
            {/* White inner ring */}
            <div className="w-full h-full rounded-full p-[2px] bg-white">
              {/* Soft pink inner */}
              <div className="w-full h-full rounded-full p-[1px] bg-gradient-to-br from-pink-100 to-rose-100 overflow-hidden">
                <img
                  src="/anime-circle.png"
                  alt="VIBELY SPACE"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
          {/* Sparkle decorations */}
          <span className="absolute -top-1 -right-1 text-xs animate-sparkle">✦</span>
          <span className="absolute -bottom-0.5 -left-1 text-[10px] animate-sparkle" style={{ animationDelay: '0.5s' }}>✧</span>
        </div>
      </div>

      <Card
        className={`relative overflow-visible border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer ${
          popular
            ? 'border-primary bg-gradient-to-br from-white via-pink-50 to-rose-50 shadow-lg shadow-pink-200/50'
            : 'border-pink-200 bg-white hover:border-primary/50 shadow-md shadow-pink-100/30'
        }`}
      >
        {popular && (
          <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl z-20">
            POPULER ✨
          </div>
        )}
        <CardContent className="p-5 sm:p-6 pt-8">
          {/* Poster Badge */}
          <div className="flex items-center justify-center mb-4">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-base sm:text-lg font-bold ${
              popular
                ? 'bg-primary text-white shadow-md shadow-pink-300/50'
                : 'bg-secondary text-primary'
            }`}>
              <span>Poster</span>
              <span className="text-xl">{poster}</span>
            </div>
          </div>

          {/* Price */}
          <div className="text-center mb-4">
            <span className="text-3xl sm:text-4xl font-extrabold text-primary">
              {price}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-3 text-sm sm:text-base">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-green-50 border border-green-100">
              <span className="text-lg">📍</span>
              <span className="text-foreground">
                <span className="font-semibold">Jaminan</span> {jaminan} followers
              </span>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50 border border-amber-100">
              <span className="text-lg">🌷</span>
              <span className="text-foreground">
                <span className="font-semibold">Keep hari</span> {keepHari}
              </span>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-pink-50 border border-pink-100">
              <span className="text-lg">🤩</span>
              <span className="text-foreground">
                <span className="font-semibold">Gain</span> {gain} folls
              </span>
            </div>
          </div>

          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer-bg pointer-events-none" />
        </CardContent>
      </Card>
    </div>
  )
}

// Main page
export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { ref: sectionRef1, isInView: isInView1 } = useInView()
  const { ref: sectionRef2, isInView: isInView2 } = useInView()
  const { ref: sectionRef3, isInView: isInView3 } = useInView()

  // Use a timeout to trigger animation after mount
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== HEADER / NAV ===== */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-200/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo-circle.png"
              alt="VIBELY SPACE Logo"
              className="w-10 h-10 rounded-full border-2 border-pink-300 shadow-sm"
            />
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-lg sm:text-xl font-bold text-primary">
                VIBELY SPACE ✨
              </span>
              <span className="hidden sm:inline italic text-sm font-medium text-muted-foreground tracking-wide">
                where cute meets clever ✦
              </span>
            </div>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4">
            <a href="#about" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Tentang
            </a>
            <a href="#pricelist" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Harga
            </a>
            <a href="#contact" className="hidden sm:inline-flex items-center gap-1.5 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-primary/90 transition-colors shadow-md shadow-pink-300/30">
              💬 Hubungi
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ===== HERO SECTION ===== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50 py-12 sm:py-16 lg:py-20">
          <FloatingHearts />
          <SparkleDecoration />

          <div className="relative max-w-6xl mx-auto px-4">
            <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Left: Text Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-secondary text-primary text-sm font-semibold px-4 py-2 rounded-full mb-5">
                  <span className="animate-heartbeat">♡</span>
                  <span>12.000-an Followers</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-4">
                  Jadi Sponsor{' '}
                  <span className="text-primary relative">
                    Giveaway
                    <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12" fill="none">
                      <path d="M2 8C50 2 150 2 198 8" stroke="#E91E8C" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
                    </svg>
                  </span>
                  <br />
                  <span className="text-2xl sm:text-3xl lg:text-4xl">Dapatkan 100 folls? </span>
                  <span className="text-primary text-2xl sm:text-3xl lg:text-4xl">Real Indo + Aktif 💞</span>
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                  Murah, cepat & lebih terpercaya! Akun IG kamu akan ditag di postingan giveaway agar orang nge-follow akun kamu.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <a href="#pricelist">
                    <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-full text-base shadow-lg shadow-pink-300/40 transition-all hover:scale-105 hover:shadow-xl">
                      Lihat Harga ✨
                    </Button>
                  </a>
                  <a href="#about">
                    <Button variant="outline" className="border-2 border-primary/30 text-primary font-semibold px-8 py-3 rounded-full text-base hover:bg-secondary transition-all hover:scale-105">
                      Pelajari Lagi 🌷
                    </Button>
                  </a>
                </div>
              </div>

              {/* Right: Hero Image */}
              <div className="flex-shrink-0 relative">
                <div className="relative animate-float">
                  <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 to-rose-200 rounded-3xl blur-2xl opacity-40" />
                  <img
                    src="/hero-image.png"
                    alt="Sponsor Giveaway by VIBELY SPACE"
                    className="relative w-64 sm:w-72 lg:w-80 rounded-3xl shadow-2xl shadow-pink-200/50 border-4 border-white"
                  />
                  {/* Decorative badge */}
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-3 border border-pink-200">
                    <div className="text-center">
                      <div className="text-2xl font-extrabold text-primary">12K+</div>
                      <div className="text-xs text-muted-foreground font-medium">Followers</div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-lg p-3 border border-pink-200">
                    <div className="text-center">
                      <div className="text-2xl">✨</div>
                      <div className="text-xs text-muted-foreground font-medium">Terpercaya</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom wave decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" className="w-full">
              <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="var(--background)"/>
            </svg>
          </div>
        </section>

        {/* ===== ABOUT / WHAT IS SPONSOR GA ===== */}
        <section id="about" className="py-16 sm:py-20 bg-background relative">
          <div className="max-w-6xl mx-auto px-4">
            <div
              ref={sectionRef1}
              className={`transition-all duration-700 ${isInView1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              {/* Section Title */}
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 bg-secondary text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                  🌷 Tentang Kami
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">
                  Apa Sih Sponsor Giveaway Itu?
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Logo Image */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-6 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full blur-3xl opacity-50" />
                    <img
                      src="/logo.png"
                      alt="VIBELY SPACE Logo"
                      className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full shadow-xl border-4 border-white object-cover"
                    />
                  </div>
                </div>

                {/* Explanation */}
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl p-5 shadow-md border border-pink-100 hover:shadow-lg transition-shadow">
                    <p className="text-base sm:text-lg text-foreground leading-relaxed">
                      <span className="font-bold text-primary">Sponsor Giveaway</span> artinya akun IG kamu akan ditag di postingan giveaway agar orang nge-follow akun kamu. Ini cara paling efektif untuk meningkatkan followers secara organic!
                    </p>
                  </div>

                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    Keuntungan Jadi Sponsor GA:
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-pink-100 hover:border-primary/30 transition-colors">
                      <span className="text-2xl flex-shrink-0">🌷</span>
                      <div>
                        <p className="font-bold text-foreground">Insight Akan Ramai</p>
                        <p className="text-sm text-muted-foreground">Followers aktif akan meningkatkan engagement dan insight akun IG kamu secara signifikan</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-pink-100 hover:border-primary/30 transition-colors">
                      <span className="text-2xl flex-shrink-0">🌷</span>
                      <div>
                        <p className="font-bold text-foreground">Potensi Bisnis Meningkat</p>
                        <p className="text-sm text-muted-foreground">Akun IG bisnis kamu akan lebih dipercaya dan ada peminat karena followers yang aktif dan real</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 border border-pink-200">
                    <p className="text-sm sm:text-base text-foreground leading-relaxed">
                      <span className="font-bold text-primary">Berbeda dengan membeli followers!</span> Karena followers yang dibeli belum tentu aktif dan asli Indo — kebanyakan orang luar/bot. Jadi jadi Sponsor GA disini lebih <span className="font-bold text-primary">murah, cepat & terpercaya!</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PRICE LIST SECTION ===== */}
        <section id="pricelist" className="py-16 sm:py-20 bg-gradient-to-b from-background via-pink-50/50 to-background relative">
          <SparkleDecoration />

          <div className="max-w-6xl mx-auto px-4">
            <div
              ref={sectionRef2}
              className={`transition-all duration-700 ${isInView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              {/* Section Title */}
              <div className="text-center mb-4">
                <span className="inline-flex items-center gap-2 bg-secondary text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                  💸 Price List
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">
                  Sponsor Giveaway by VIBELY SPACE ✨
                </h2>
              </div>

              <div className="text-center mb-10">
                <p className="text-muted-foreground text-base sm:text-lg">
                  Pilih paket yang sesuai dengan kebutuhanmu!
                </p>
              </div>

              {/* Price Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <PriceCard
                  poster="2️⃣"
                  price="Rp12.000"
                  jaminan="200"
                  keepHari="Menyesuaikan"
                  gain="200-300+"
                  delay={0}
                />
                <PriceCard
                  poster="3️⃣"
                  price="Rp25.000"
                  jaminan="500"
                  keepHari="Menyesuaikan"
                  gain="500-750+"
                  delay={100}
                />
                <PriceCard
                  poster="4️⃣"
                  price="Rp40.000"
                  jaminan="1.000"
                  keepHari="1-5"
                  gain="1k-1,5k+"
                  delay={200}
                />
                <PriceCard
                  poster="5️⃣"
                  price="Rp60.000"
                  jaminan="2.000"
                  keepHari="1-6"
                  gain="2k-2,5k+"
                  delay={300}
                  popular
                />
                <PriceCard
                  poster="6️⃣"
                  price="Rp110.000"
                  jaminan="5.000"
                  keepHari="3-6"
                  gain="5k-8k+"
                  delay={400}
                />
                <PriceCard
                  poster="7️⃣"
                  price="Rp180.000"
                  jaminan="10.000"
                  keepHari="5-10"
                  gain="10k-11k+"
                  delay={500}
                />
              </div>

              {/* Extra info */}
              <div className="mt-10 text-center">
                <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-md border border-pink-100">
                  <span className="text-2xl">📞</span>
                  <p className="text-foreground font-medium">
                  Yuk, order sekarang! ✨
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTACT SECTION ===== */}
        <section id="contact" className="py-16 sm:py-20 bg-background relative">
          <div className="max-w-4xl mx-auto px-4">
            <div
              ref={sectionRef3}
              className={`transition-all duration-700 ${isInView3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              {/* Section Title */}
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 bg-secondary text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                  ☎️ Hubungi Kami
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">
                  Minat? Yuk Hubungi! 💕
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Instagram Contact */}
                <a
                  href="https://instagram.com/vibely.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="overflow-hidden border-2 border-pink-200 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer bg-white">
                    <CardContent className="p-6 sm:p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Instagram</h3>
                      <p className="text-primary font-semibold text-lg">@vibely.space</p>
                      <p className="text-sm text-muted-foreground mt-2">DM atau mention di Instagram</p>
                    </CardContent>
                  </Card>
                </a>

                {/* WhatsApp Contact */}
                <a
                  href="https://wa.me/6285694106233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="overflow-hidden border-2 border-pink-200 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer bg-white">
                    <CardContent className="p-6 sm:p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">WhatsApp</h3>
                      <p className="text-primary font-semibold text-lg">085694106233</p>
                      <p className="text-sm text-muted-foreground mt-2">Chat langsung via WhatsApp</p>
                    </CardContent>
                  </Card>
                </a>
              </div>

              {/* CTA Banner */}
              <div className="mt-10 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-rose-400 p-8 sm:p-10 text-center shadow-xl">
                <FloatingHearts />
                <h3 className="relative text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  Yuk, Order Sekarang! ✨
                </h3>
                <p className="relative text-white/90 text-base sm:text-lg mb-6 max-w-md mx-auto">
                  Jangan lewatkan kesempatan untuk meningkatkan followers IG kamu dengan cara yang murah, cepat & terpercaya!
                </p>
                <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://wa.me/6285694106233"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-white text-primary font-bold px-8 py-3 rounded-full text-base hover:bg-white/90 transition-all hover:scale-105 shadow-lg">
                      Chat WhatsApp 💬
                    </Button>
                  </a>
                  <a
                    href="https://instagram.com/vibely.space"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-white/20 text-white border-2 border-white/50 font-bold px-8 py-3 rounded-full text-base hover:bg-white/30 transition-all hover:scale-105">
                      DM Instagram 📸
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 border-t border-pink-200/50 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo-circle.png"
                alt="VIBELY SPACE Logo"
                className="w-8 h-8 rounded-full border border-pink-300"
              />
              <span className="font-bold text-primary">VIBELY SPACE ✨</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Sponsor Giveaway by VIBELY SPACE — Murah, Cepat & Terpercaya 💕
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/vibely.space"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/6285694106233"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
