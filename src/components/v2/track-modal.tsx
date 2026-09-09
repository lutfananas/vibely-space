"use client";

/* ============ VIBELY 2.0 — Campaign Tracking (PRD §8) ============ */

import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CAMPAIGNS, fmtID, type Campaign } from "@/lib/data";
import { Avatar, GrowthLine, ProgressBar } from "./bits";
import { Clock, Search, TrendingUp, Users, CalendarClock, Target } from "lucide-react";

const DEMO_IDS = ["VIB-2026-00182", "VIB-2026-00179", "VIB-2026-00177"];

export function TrackModal({
  open,
  initialId,
  onOpenChange,
}: {
  open: boolean;
  initialId?: string;
  onOpenChange: (v: boolean) => void;
}) {
  /* State awal diturunkan dari props — komponen di-remount via `key`
     di provider setiap kali initialId berubah, jadi tidak perlu effect. */
  const q0 = (initialId ?? "").trim();
  const found0 = q0
    ? CAMPAIGNS.find((c) => c.id.toLowerCase() === q0.toLowerCase()) ?? null
    : null;
  const [query, setQuery] = useState(q0);
  const [result, setResult] = useState<Campaign | null>(found0);
  const [notFound, setNotFound] = useState<string | null>(
    q0 && !found0 ? q0.toUpperCase() : null
  );

  const search = (raw?: string) => {
    const q = (raw ?? query).trim();
    if (!q) return;
    const found = CAMPAIGNS.find((c) => c.id.toLowerCase() === q.toLowerCase());
    if (found) {
      setResult(found);
      setNotFound(null);
    } else {
      setResult(null);
      setNotFound(q.toUpperCase());
    }
  };

  /* Kumulatif untuk growth chart */
  const cumulative = useMemo(() => {
    if (!result) return [];
    const out: number[] = [];
    let acc = result.startFol;
    for (const d of result.daily) {
      acc += d;
      out.push(acc);
    }
    return out.length ? out : [result.startFol];
  }, [result]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden rounded-3xl border-[#E3EAF6] max-h-[90vh] flex flex-col">
        <div className="relative bg-ink text-white px-6 pt-6 pb-5 grid-bg-dark shrink-0">
          <DialogTitle className="text-lg font-display font-bold">Track Campaign</DialogTitle>
          <p className="mt-1 text-sm text-[#9DB8E8]">
            Masukkan Campaign ID untuk melihat status & progress real-time.
          </p>

          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              search();
            }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F76A3]" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="VIB-2026-00182"
                aria-label="Campaign ID"
                className="pl-10 h-11 rounded-xl border-white/15 bg-white/10 border text-white placeholder:text-[#5F76A3] uppercase tracking-wide"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-blue hover:opacity-95 transition-opacity"
            >
              Cari
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-medium text-[#5F76A3]">Demo:</span>
            {DEMO_IDS.map((id) => (
              <button
                key={id}
                onClick={() => {
                  setQuery(id);
                  search(id);
                }}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-[#9DB8E8] hover:border-[#5B8CFF]/50 hover:text-white transition-colors"
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Not found / waiting state */}
          {notFound && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center animate-pop-in">
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-amber-100">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
              <p className="font-display font-bold text-ink">{notFound}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Campaign belum ditemukan di sistem demo. Kemungkinan masih menunggu verifikasi pembayaran
                (status <span className="font-semibold text-amber-600">WAITING</span>) — coba lagi setelah 1×24 jam,
                atau hubungi support dengan menyertakan Campaign ID.
              </p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="space-y-5 animate-pop-in">
              {/* Header */}
              <div className="flex items-center gap-3">
                <Avatar name={result.handle} className="h-11 w-11 text-base" />
                <div className="min-w-0 flex-1">
                  <p className="font-display font-bold text-ink truncate">@{result.handle}</p>
                  <p className="text-xs text-muted-foreground">
                    {result.id} · {result.niche}
                  </p>
                </div>
                {result.status === "active" && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse-ring" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Active</span>
                  </span>
                )}
                {result.status === "completed" && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF1FF] border border-[#C9DCF5] px-3 py-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8]">Completed</span>
                  </span>
                )}
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <p className="text-sm font-semibold text-ink">Campaign Progress</p>
                  <p className="font-display text-xl font-bold text-gradient">{result.progress.toFixed(1)}%</p>
                </div>
                <ProgressBar value={result.progress} height="h-2.5" />
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-display font-bold text-ink">{fmtID(result.current)}</span> /{" "}
                  {fmtID(result.target)} followers
                </p>
              </div>

              {/* Performance rows */}
              <div className="rounded-2xl border border-[#E3EAF6] bg-[#F9FBFF] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground mb-3">
                  Performance
                </p>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#2E6BFF]" />
                    <div>
                      <dt className="text-[11px] text-muted-foreground">Starting Followers</dt>
                      <dd className="font-semibold text-ink">{fmtID(result.startFol)}</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#F0479C]" />
                    <div>
                      <dt className="text-[11px] text-muted-foreground">Growth</dt>
                      <dd className="font-semibold text-emerald-600">+{fmtID(result.current)}</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-[#7A5CFF]" />
                    <div>
                      <dt className="text-[11px] text-muted-foreground">Current</dt>
                      <dd className="font-semibold text-ink">{fmtID(result.startFol + result.current)}</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-amber-500" />
                    <div>
                      <dt className="text-[11px] text-muted-foreground">Remaining</dt>
                      <dd className="font-semibold text-ink capitalize">{result.remaining}</dd>
                    </div>
                  </div>
                </dl>
              </div>

              {/* Growth chart */}
              {cumulative.length > 1 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground mb-2">
                    Growth Chart
                  </p>
                  <GrowthLine
                    data={cumulative}
                    labels={result.daily.map((_, i) => `D${i + 1}`)}
                    height={190}
                    id={`track-${result.id}`}
                  />
                </div>
              )}

              <p className={cn("text-center text-[11px] text-muted-foreground")}>
                Data campaign diperbarui setiap 6 jam · Demo preview
              </p>
            </div>
          )}

          {/* Empty */}
          {!result && !notFound && (
            <div className="py-6 text-center">
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-[#F0F4FC]">
                <Search className="h-6 w-6 text-[#5B6B8A]" />
              </div>
              <p className="text-sm text-muted-foreground">
                Masukkan Campaign ID di atas — atau klik salah satu ID demo.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
