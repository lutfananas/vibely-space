"use client";

/* ============ VIBELY 2.0 — Shared UI Bits & Hooks ============ */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { fmtID } from "@/lib/data";

/* ---------- useInView ---------- */

export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ---------- Reveal on scroll ---------- */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("transition-all duration-700 ease-out will-change-transform", className)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- CountUp ---------- */

export function CountUp({
  to,
  duration = 1500,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {fmtID(val)}
      {suffix}
    </span>
  );
}

/* ---------- Animated progress bar ---------- */

export function ProgressBar({
  value,
  className,
  barClassName,
  delay = 150,
  height = "h-2",
}: {
  value: number;
  className?: string;
  barClassName?: string;
  delay?: number;
  height?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  return (
    <div
      ref={ref}
      className={cn("w-full rounded-full overflow-hidden bg-[#E9EFFB]", height, className)}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-[#2E6BFF] via-[#7A5CFF] to-[#F0479C] transition-[width] ease-out",
          barClassName
        )}
        style={{
          width: inView ? `${Math.min(100, Math.max(0, value))}%` : "0%",
          transitionDuration: "1300ms",
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  );
}

/* ---------- Status dots ---------- */

export function StatusDot({ color, pulseClass }: { color: string; pulseClass: string }) {
  return <span className={cn("inline-block h-2.5 w-2.5 rounded-full shrink-0", color, pulseClass)} />;
}

/* ---------- Section heading ---------- */

export function SectionHead({
  tag,
  title,
  sub,
  align = "center",
  dark = false,
}: {
  tag: string;
  title: ReactNode;
  sub?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left"
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]",
          dark
            ? "border-white/15 bg-white/5 text-[#9DB8E8]"
            : "border-[#D8E2F2] bg-white text-[#2E6BFF] shadow-soft"
        )}
      >
        <span className="text-gradient font-bold">✦</span>
        {tag}
      </span>
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] max-w-2xl",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {sub && (
        <p className={cn("text-base sm:text-lg leading-relaxed max-w-xl", dark ? "text-[#9DB8E8]" : "text-muted-foreground")}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}

/* ---------- Logo ---------- */

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 select-none", className)}>
      <span
        className={cn(
          "grid h-8 w-8 place-items-center rounded-xl bg-gradient-brand text-white text-sm font-bold shadow-blue",
          "font-display"
        )}
        aria-hidden
      >
        ✦
      </span>
      <span className={cn("font-display font-bold tracking-tight text-lg", dark ? "text-white" : "text-ink")}>
        VIBELY <span className="text-gradient">SPACE</span>
      </span>
    </span>
  );
}

/* ---------- Avatar (initial gradient) ---------- */

const AV_GRADS = [
  "from-[#2E6BFF] to-[#7A5CFF]",
  "from-[#F0479C] to-[#FF7EB9]",
  "from-[#7A5CFF] to-[#F0479C]",
  "from-[#1D4ED8] to-[#2E6BFF]",
  "from-[#FF7EB9] to-[#FFB3D4]",
];

export function Avatar({ name, className }: { name: string; className?: string }) {
  const idx = name.charCodeAt(0) % AV_GRADS.length;
  return (
    <span
      className={cn(
        "grid place-items-center rounded-full bg-gradient-to-br text-white font-display font-semibold shrink-0",
        AV_GRADS[idx],
        className || "h-9 w-9 text-sm"
      )}
      aria-hidden
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

/* ---------- Growth line chart (SVG, smooth, animated) ---------- */

function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export function GrowthLine({
  data,
  labels,
  className,
  height = 220,
  id = "gl",
}: {
  data: number[];
  labels?: string[];
  className?: string;
  height?: number;
  id?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const W = 560;
  const H = height;
  const PAD = { t: 16, r: 14, b: labels ? 30 : 14, l: 14 };
  const max = Math.max(...data, 1);
  const min = 0;
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;
  const pts = data.map((v, i) => ({
    x: PAD.l + (data.length === 1 ? iw / 2 : (i / (data.length - 1)) * iw),
    y: PAD.t + ih - ((v - min) / (max - min || 1)) * ih,
  }));
  const line = smoothPath(pts);
  const area = `${line} L ${pts[pts.length - 1]?.x ?? 0} ${PAD.t + ih} L ${pts[0]?.x ?? 0} ${PAD.t + ih} Z`;

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Growth chart">
        <defs>
          <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2E6BFF" />
            <stop offset="55%" stopColor="#7A5CFF" />
            <stop offset="100%" stopColor="#F0479C" />
          </linearGradient>
          <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E6BFF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#F0479C" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={PAD.l}
            x2={W - PAD.r}
            y1={PAD.t + ih * f}
            y2={PAD.t + ih * f}
            stroke="#E3EAF6"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        ))}

        <path
          d={area}
          fill={`url(#${id}-area)`}
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 1s ease 0.5s",
          }}
        />
        <path
          d={line}
          fill="none"
          stroke={`url(#${id}-stroke)`}
          strokeWidth="3.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={inView ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)" }}
        />

        {pts.map((p, i) => (
          <g
            key={i}
            style={{
              opacity: inView ? 1 : 0,
              transition: `opacity 0.4s ease ${0.9 + i * 0.12}s`,
            }}
          >
            <circle cx={p.x} cy={p.y} r="5.5" fill="#fff" stroke="#2E6BFF" strokeWidth="2.5" />
          </g>
        ))}

        {labels &&
          labels.map((l, i) => (
            <text
              key={i}
              x={pts[i]?.x ?? 0}
              y={H - 8}
              textAnchor="middle"
              className="fill-[#5B6B8A]"
              fontSize="12"
              fontWeight="500"
            >
              {l}
            </text>
          ))}
      </svg>
    </div>
  );
}
