"use client";

/* ============ VIBELY 2.0 — Platform Preview: App / Analytics / Admin (PRD §16-19) ============ */

import { useState } from "react";
import {
  BarChart3,
  Bell,
  CircleUser,
  FolderKanban,
  LayoutDashboard,
  ListOrdered,
  Megaphone,
  Settings,
  Tag,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ADMIN_STATS, ADMIN_TABLE, fmtID } from "@/lib/data";
import { Avatar, CountUp, ProgressBar, Reveal, SectionHead } from "./bits";

type Tab = "app" | "analytics" | "admin";

const TABS: { id: Tab; label: string; url: string }[] = [
  { id: "app", label: "Customer App", url: "app.vibely.space" },
  { id: "analytics", label: "Analytics", url: "app.vibely.space/analytics" },
  { id: "admin", label: "Admin", url: "admin.vibely.space" },
];

export function PlatformPreview() {
  const [tab, setTab] = useState<Tab>("app");
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <section aria-label="Preview platform" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          tag="Platform"
          title={
            <>
              Bukan Sekadar Landing Page. <span className="text-gradient">Sebuah Platform.</span>
            </>
          }
          sub="Setiap campaign mendapatkan Campaign ID, dashboard tracking, dan laporan — seperti SaaS growth pada umumnya."
        />

        {/* Tabs */}
        <Reveal delay={100} className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-[#D8E2F2] bg-white p-1 shadow-soft" role="tablist" aria-label="Preview platform">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "rounded-full px-4 sm:px-6 py-2 text-sm font-semibold transition-all",
                  tab === t.id ? "bg-ink text-white shadow-soft" : "text-muted-foreground hover:text-ink"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Window frame */}
        <Reveal delay={160} className="mt-10">
          <div className="overflow-hidden rounded-3xl border border-[#E3EAF6] bg-white shadow-lift">
            {/* Chrome bar */}
            <div className="flex items-center gap-3 border-b border-[#EDF2FB] bg-[#F9FBFF] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#FF8FA3]" />
                <span className="h-3 w-3 rounded-full bg-[#FFD166]" />
                <span className="h-3 w-3 rounded-full bg-[#8FE3C0]" />
              </div>
              <div className="mx-auto flex items-center gap-2 rounded-full bg-white border border-[#E3EAF6] px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {active.url}
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                Preview
              </span>
            </div>

            <div className="min-h-[430px] sm:min-h-[460px]">
              {tab === "app" && <AppPanel />}
              {tab === "analytics" && <AnalyticsPanel />}
              {tab === "admin" && <AdminPanel />}
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Ini preview mockup platform — fase berikutnya akan terhubung ke sistem order & pembayaran nyata.
        </p>
      </div>
    </section>
  );
}

/* ---------- Customer App (§16 / §17) ---------- */

function AppPanel() {
  return (
    <div className="grid sm:grid-cols-[190px_1fr]">
      {/* Sidebar */}
      <aside className="hidden sm:flex flex-col gap-1 border-r border-[#EDF2FB] bg-[#F9FBFF] p-4">
        {[
          { icon: LayoutDashboard, label: "Dashboard", active: true },
          { icon: Megaphone, label: "My Campaigns" },
          { icon: BarChart3, label: "Analytics" },
          { icon: ListOrdered, label: "Orders" },
          { icon: Bell, label: "Notifications" },
          { icon: CircleUser, label: "Profile" },
        ].map((m) => (
          <span
            key={m.label}
            className={cn(
              "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold",
              m.active ? "bg-ink text-white" : "text-[#5B6B8A]"
            )}
          >
            <m.icon className="h-4 w-4" />
            {m.label}
          </span>
        ))}
      </aside>

      {/* Main */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Hello,</p>
            <p className="font-display text-xl font-bold text-ink">@brandanda</p>
          </div>
          <Avatar name="brandanda" className="h-10 w-10" />
        </div>

        {/* Active campaign card */}
        <div className="mt-5 rounded-2xl border border-[#E3EAF6] bg-[#F9FBFF] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="rounded-lg bg-gradient-brand-soft px-2.5 py-1 font-display text-[11px] font-bold text-[#2E6BFF]">
                PKG-04
              </span>
              <p className="font-display font-bold text-ink">2.000 Followers</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-ring" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Active</span>
            </span>
          </div>

          <div className="mt-4">
            <ProgressBar value={87.1} height="h-2.5" />
            <div className="mt-2 flex justify-between text-xs">
              <span className="font-semibold text-ink">1.742 / 2.000</span>
              <span className="font-display font-bold text-gradient">87.1%</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {[
              { label: "Growth", value: "+1,742", up: true },
              { label: "Current Followers", value: "6,563" },
              { label: "Remaining", value: "2 Days" },
            ].map((m) => (
              <div key={m.label} className="rounded-xl border border-[#EDF2FB] bg-white p-3 text-center">
                <p className={cn("font-display text-sm sm:text-base font-bold tabular-nums", m.up ? "text-emerald-600" : "text-ink")}>
                  {m.value}
                </p>
                <p className="mt-0.5 text-[10px] font-medium text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* My campaigns */}
        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">My Campaigns</p>
        <div className="mt-2.5 space-y-2">
          {[
            { id: "VIB-00182", handle: "@brandanda", target: "2.000 target", pct: "87%", active: true },
            { id: "VIB-00121", handle: "@fashionstore", target: "5.000 target", pct: "✓ Selesai", active: false },
            { id: "VIB-00098", handle: "@kuliner.id", target: "1.000 target", pct: "✓ Selesai", active: false },
          ].map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-3 rounded-xl border border-[#EDF2FB] bg-white px-3.5 py-2.5"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#F0F4FC]">
                <FolderKanban className="h-4 w-4 text-[#5B6B8A]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">
                  {c.id} <span className="font-normal text-muted-foreground">· {c.handle}</span>
                </p>
                <p className="text-[11px] text-muted-foreground">{c.target}</p>
              </div>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[10px] font-bold",
                  c.active ? "bg-emerald-50 text-emerald-600" : "bg-[#EAF1FF] text-[#1D4ED8]"
                )}
              >
                {c.pct}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Analytics (§18) ---------- */

function AnalyticsPanel() {
  return (
    <div className="p-5 sm:p-6">
      <div className="grid sm:grid-cols-3 gap-2.5">
        <div className="rounded-2xl border border-[#E3EAF6] bg-[#F9FBFF] p-4 sm:col-span-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Followers</p>
          <p className="mt-1 font-display text-3xl font-bold text-ink tabular-nums">
            <CountUp to={6563} />
          </p>
          <div className="mt-1.5 flex gap-2 text-[11px] font-semibold">
            <span className="text-emerald-600">+1,742</span>
            <span className="text-[#F0479C]">+36.1%</span>
          </div>
        </div>
        <div className="rounded-2xl border border-[#E3EAF6] bg-white p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Campaign Exposure</p>
          <p className="mt-1 font-display text-3xl font-bold text-ink">86,3K</p>
          <p className="mt-1.5 text-[11px] text-muted-foreground">estimasi orang melihat campaign</p>
        </div>
        <div className="rounded-2xl border border-[#E3EAF6] bg-white p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Daily Avg Growth</p>
          <p className="mt-1 font-display text-3xl font-bold text-ink">+348</p>
          <p className="mt-1.5 text-[11px] text-muted-foreground">followers per hari</p>
        </div>
      </div>

      <div className="mt-3 grid sm:grid-cols-[1.5fr_1fr] gap-3">
        {/* Growth chart */}
        <div className="rounded-2xl border border-[#E3EAF6] bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Growth</p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" />
              +36.1%
            </span>
          </div>
          <svg viewBox="0 0 420 170" className="mt-3 w-full" aria-hidden>
            <defs>
              <linearGradient id="an-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2E6BFF" />
                <stop offset="100%" stopColor="#F0479C" />
              </linearGradient>
              <linearGradient id="an-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2E6BFF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#F0479C" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((f) => (
              <line key={f} x1="8" x2="412" y1={20 + 110 * f} y2={20 + 110 * f} stroke="#E3EAF6" strokeDasharray="4 6" />
            ))}
            <path
              d="M10 128 C 50 122, 80 108, 115 96 C 150 84, 185 74, 220 58 C 255 42, 300 34, 340 26 C 370 20, 395 18, 410 16 L 410 148 L 10 148 Z"
              fill="url(#an-area)"
            />
            <path
              d="M10 128 C 50 122, 80 108, 115 96 C 150 84, 185 74, 220 58 C 255 42, 300 34, 340 26 C 370 20, 395 18, 410 16"
              fill="none"
              stroke="url(#an-line)"
              strokeWidth="3.5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              style={{ strokeDashoffset: 0, animation: "none" }}
            />
            {[
              [10, 128], [115, 96], [220, 58], [310, 30], [410, 16],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4.5" fill="#fff" stroke="#2E6BFF" strokeWidth="2.5" />
            ))}
            {["D1", "D2", "D3", "D4", "D5"].map((d, i) => (
              <text key={d} x={10 + i * 100} y={165} textAnchor="middle" fontSize="11" fill="#5B6B8A" fontWeight="500">
                {d}
              </text>
            ))}
          </svg>
        </div>

        {/* Metrics */}
        <div className="rounded-2xl border border-[#E3EAF6] bg-white p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Campaign Metrics</p>
          <ul className="mt-3 space-y-2.5 text-[13px]">
            {[
              ["Profile visits", "12,4K"],
              ["Followers gained", "1.742"],
              ["Campaign exposure", "86,3K"],
              ["Campaign duration", "5 days"],
              ["Growth rate", "+36.1%"],
              ["Daily growth", "+348/hari"],
            ].map(([k, v]) => (
              <li key={k} className="flex items-center justify-between border-b border-dashed border-[#EDF2FB] pb-2 last:border-0 last:pb-0">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-semibold text-ink tabular-nums">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- Admin (§19) ---------- */

function AdminPanel() {
  return (
    <div className="grid sm:grid-cols-[190px_1fr]">
      <aside className="hidden sm:flex flex-col gap-1 border-r border-[#EDF2FB] bg-ink p-4">
        {[
          { icon: LayoutDashboard, label: "Overview", active: true },
          { icon: Megaphone, label: "Campaigns" },
          { icon: Users, label: "Customers" },
          { icon: ListOrdered, label: "Orders" },
          { icon: Tag, label: "Packages" },
          { icon: BarChart3, label: "Analytics" },
          { icon: Settings, label: "Settings" },
        ].map((m) => (
          <span
            key={m.label}
            className={cn(
              "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold",
              m.active ? "bg-white/10 text-white" : "text-[#7E93BC]"
            )}
          >
            <m.icon className="h-4 w-4" />
            {m.label}
          </span>
        ))}
      </aside>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {[
            { label: "Total Campaigns", value: ADMIN_STATS.totalCampaigns, plain: true },
            { label: "Active Campaigns", value: ADMIN_STATS.activeCampaigns, plain: true },
            { label: "Revenue", value: ADMIN_STATS.revenue, plain: true },
            { label: "Customers", value: ADMIN_STATS.customers, plain: true },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-[#E3EAF6] bg-[#F9FBFF] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-display text-xl sm:text-2xl font-bold text-ink">
                {typeof s.value === "number" ? <CountUp to={s.value} /> : s.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-2xl border border-[#E3EAF6] bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Campaign Management
            </p>
            <span className="rounded-full bg-[#F0F4FC] px-2.5 py-1 text-[10px] font-bold text-[#5B6B8A]">
              Auto — tanpa edit manual
            </span>
          </div>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[520px] text-[13px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="pb-2 font-semibold">Campaign</th>
                  <th className="pb-2 font-semibold">Customer</th>
                  <th className="pb-2 font-semibold">Package</th>
                  <th className="pb-2 font-semibold">Progress</th>
                  <th className="pb-2 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {ADMIN_TABLE.map((r) => (
                  <tr key={r.id} className="border-t border-[#EDF2FB]">
                    <td className="py-2.5 font-semibold text-ink">{r.id}</td>
                    <td className="py-2.5 text-muted-foreground">{r.customer}</td>
                    <td className="py-2.5 text-muted-foreground">{r.pkg}</td>
                    <td className="py-2.5 text-muted-foreground tabular-nums">{r.progress}</td>
                    <td className="py-2.5 text-right">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[10px] font-bold",
                          r.status === "ACTIVE" && "bg-emerald-50 text-emerald-600",
                          r.status === "WAITING" && "bg-amber-50 text-amber-600",
                          r.status === "DONE" && "bg-[#EAF1FF] text-[#1D4ED8]"
                        )}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
