"use client";

/* ============ VIBELY 2.0 — Order Flow V2 (PRD §15) ============ */
/* Step: Select Package → Instagram Username → Campaign Info → Review → Payment → Campaign ID */

import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PACKAGES, fmtID, type Pkg } from "@/lib/data";
import { Avatar } from "./bits";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  CircleAlert,
  CreditCard,
  AtSign,
  MessageCircle,
  Package,
  QrCode,
  Wallet,
  Landmark,
  Sparkles,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4 | 5;

const STEPS: { n: Step; label: string; icon: typeof Package }[] = [
  { n: 1, label: "Package", icon: Package },
  { n: 2, label: "Username", icon: AtSign },
  { n: 3, label: "Review", icon: Check },
  { n: 4, label: "Payment", icon: CreditCard },
  { n: 5, label: "Campaign ID", icon: BadgeCheck },
];

const PAYMENTS = [
  { id: "qris", label: "QRIS", desc: "Scan & bayar instan", icon: QrCode },
  { id: "bca", label: "Transfer BCA", desc: "Verifikasi otomatis", icon: Landmark },
  { id: "ewallet", label: "E-Wallet", desc: "DANA · OVO · GoPay", icon: Wallet },
];

const START_OPTIONS = ["Hari ini", "Besok", "2 hari lagi"];

export function OrderModal({
  open,
  pkgId,
  onOpenChange,
  onTrack,
}: {
  open: boolean;
  pkgId?: string;
  onOpenChange: (v: boolean) => void;
  onTrack: (campaignId?: string) => void;
}) {
  /* State awal diturunkan dari props — komponen di-remount via `key`
     di provider setiap kali dibuka, jadi tidak perlu effect untuk reset. */
  const initialPkg = PACKAGES.find((p) => p.id === pkgId) ?? null;
  const [step, setStep] = useState<Step>(initialPkg ? 2 : 1);
  const [pkg, setPkg] = useState<Pkg | null>(initialPkg);
  const [username, setUsername] = useState("");
  const [campName, setCampName] = useState("");
  const [startAt, setStartAt] = useState(START_OPTIONS[0]);
  const [payment, setPayment] = useState("qris");
  const [campaignId, setCampaignId] = useState("");
  const [err, setErr] = useState("");

  const newId = useMemo(() => {
    const n = 190 + Math.floor(Math.random() * 40);
    return `VIB-2026-${String(n).padStart(5, "0")}`;
  }, []);

  const go = (s: Step) => {
    setErr("");
    setStep(s);
  };

  const validateUsername = () => {
    const u = username.trim().replace(/^@/, "");
    if (u.length < 3) {
      setErr("Masukkan username Instagram yang valid (min. 3 karakter).");
      return;
    }
    go(3);
  };

  const pay = () => {
    setCampaignId(newId);
    go(5);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden rounded-3xl border-[#E3EAF6] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="relative bg-ink text-white px-6 pt-6 pb-5 grid-bg-dark shrink-0">
          <DialogTitle className="flex items-center gap-2 text-lg font-display font-bold">
            <Sparkles className="h-5 w-5 text-[#FF7EB9]" />
            {step === 5 ? "Campaign Dibuat" : "Start a Campaign"}
          </DialogTitle>
          <p className="mt-1 text-sm text-[#9DB8E8]">
            {step === 5 ? "Simpan Campaign ID Anda untuk tracking." : "Order campaign giveaway dalam 4 langkah cepat."}
          </p>

          {/* Step indicator */}
          <div className="mt-4 flex items-center gap-1.5">
            {STEPS.slice(0, 4).map((s) => (
              <div key={s.n} className="flex-1">
                <div
                  className={cn(
                    "h-1.5 rounded-full transition-colors duration-300",
                    step > s.n ? "bg-gradient-brand" : step === s.n ? "bg-[#5B8CFF]" : "bg-white/15"
                  )}
                />
                <span
                  className={cn(
                    "mt-1.5 block text-[10px] font-semibold uppercase tracking-wider",
                    step >= s.n ? "text-white" : "text-[#5F76A3]"
                  )}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* STEP 1 — Select Package */}
          {step === 1 && (
            <div className="space-y-2.5 animate-pop-in">
              {PACKAGES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setPkg(p);
                    go(2);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all hover:border-[#2E6BFF]/50 hover:shadow-soft",
                    pkg?.id === p.id ? "border-[#2E6BFF] bg-[#F0F5FF]" : "border-[#E3EAF6] bg-white"
                  )}
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand-soft text-[#2E6BFF] font-display text-xs font-bold">
                    {p.code}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="font-display font-bold text-ink">{p.name}</span>
                      {p.popular && (
                        <span className="rounded-full bg-[#FFE3F0] px-2 py-0.5 text-[10px] font-bold text-[#D6337F]">
                          POPULAR
                        </span>
                      )}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {fmtID(p.target)} Guaranteed Followers · {p.duration}
                    </span>
                  </span>
                  <span className="font-display font-bold text-ink">{p.priceLabel}</span>
                </button>
              ))}
            </div>
          )}

          {/* STEP 2 — Username + Campaign info */}
          {step === 2 && pkg && (
            <div className="space-y-5 animate-pop-in">
              <div className="space-y-1.5">
                <label htmlFor="ig-username" className="text-sm font-semibold text-ink">
                  Instagram Username
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="ig-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="usernameanda"
                    className="pl-10 h-12 rounded-xl border-[#D8E2F2] bg-white text-base"
                    autoComplete="off"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Kami hanya butuh username — tanpa password.
                </p>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="camp-name" className="text-sm font-semibold text-ink">
                  Campaign Name <span className="font-normal text-muted-foreground">(opsional)</span>
                </label>
                <Input
                  id="camp-name"
                  value={campName}
                  onChange={(e) => setCampName(e.target.value)}
                  placeholder="Contoh: Ramadan Giveaway 2026"
                  className="h-12 rounded-xl border-[#D8E2F2] bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-sm font-semibold text-ink">Jadwal Mulai</span>
                <div className="grid grid-cols-3 gap-2">
                  {START_OPTIONS.map((o) => (
                    <button
                      key={o}
                      onClick={() => setStartAt(o)}
                      className={cn(
                        "rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all",
                        startAt === o
                          ? "border-[#2E6BFF] bg-[#F0F5FF] text-[#2E6BFF]"
                          : "border-[#E3EAF6] bg-white text-muted-foreground hover:border-[#2E6BFF]/40"
                      )}
                    >
                      <CalendarDays className="mx-auto mb-1 h-4 w-4" />
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              {err && (
                <p className="flex items-center gap-1.5 text-sm font-medium text-red-500">
                  <CircleAlert className="h-4 w-4" />
                  {err}
                </p>
              )}
            </div>
          )}

          {/* STEP 3 — Review */}
          {step === 3 && pkg && (
            <div className="space-y-4 animate-pop-in">
              <div className="rounded-2xl border border-[#E3EAF6] bg-[#F9FBFF] p-4">
                <div className="flex items-center gap-3 pb-3 border-b border-dashed border-[#D8E2F2]">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand-soft text-[#2E6BFF] font-display text-xs font-bold">
                    {pkg.code}
                  </span>
                  <div>
                    <p className="font-display font-bold text-ink">
                      {pkg.name} — {fmtID(pkg.target)} Followers
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Campaign {pkg.duration} · Est. reach {pkg.reach}
                    </p>
                  </div>
                </div>
                <dl className="pt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Instagram</dt>
                    <dd className="font-semibold text-ink">@{username.trim().replace(/^@/, "")}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Campaign</dt>
                    <dd className="font-semibold text-ink">{campName || `Giveaway Campaign ${pkg.name}`}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Mulai</dt>
                    <dd className="font-semibold text-ink">{startAt}</dd>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-dashed border-[#D8E2F2]">
                    <dt className="font-semibold text-ink">Total</dt>
                    <dd className="font-display font-bold text-lg text-gradient">Rp{fmtID(pkg.price)}</dd>
                  </div>
                </dl>
              </div>
              <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                Garansi target aktif otomatis. Jika target belum tercapai di hari terakhir, campaign diperpanjang gratis.
              </p>
            </div>
          )}

          {/* STEP 4 — Payment */}
          {step === 4 && pkg && (
            <div className="space-y-2.5 animate-pop-in">
              {PAYMENTS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPayment(m.id)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all",
                    payment === m.id
                      ? "border-[#2E6BFF] bg-[#F0F5FF] shadow-soft"
                      : "border-[#E3EAF6] bg-white hover:border-[#2E6BFF]/40"
                  )}
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#F0F4FC] text-[#2E6BFF]">
                    <m.icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold text-ink">{m.label}</span>
                    <span className="block text-xs text-muted-foreground">{m.desc}</span>
                  </span>
                  <span
                    className={cn(
                      "grid h-5 w-5 place-items-center rounded-full border-2 transition-colors",
                      payment === m.id ? "border-[#2E6BFF] bg-[#2E6BFF]" : "border-[#C9D6EC]"
                    )}
                  >
                    {payment === m.id && <Check className="h-3 w-3 text-white" />}
                  </span>
                </button>
              ))}
              <div className="flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-white">
                <span className="text-sm text-[#9DB8E8]">Total pembayaran</span>
                <span className="font-display text-lg font-bold">Rp{fmtID(pkg.price)}</span>
              </div>
            </div>
          )}

          {/* STEP 5 — Success / Campaign ID */}
          {step === 5 && (
            <div className="text-center space-y-5 py-2 animate-pop-in">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60">
                <BadgeCheck className="h-8 w-8 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Campaign ID Anda</p>
                <p className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">{campaignId}</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse-ring-yellow" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Waiting</span>
                </div>
              </div>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">
                Pembayaran sedang diverifikasi. Setelah aktif, pantau progress campaign Anda lewat{" "}
                <span className="font-semibold text-ink">Track Campaign</span> dengan ID di atas.
              </p>
              <div className="grid gap-2">
                <button
                  onClick={() => onTrack(campaignId)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-navy transition-colors"
                >
                  Track Campaign Sekarang
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20VIBELY%2C%20saya%20baru%20order%20campaign"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D8E2F2] bg-white px-5 py-3 text-sm font-semibold text-ink hover:border-[#2E6BFF]/40 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-500" />
                  Butuh bantuan? WhatsApp Support
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer nav */}
        {step < 5 && (
          <div className="flex items-center justify-between gap-3 border-t border-[#E3EAF6] bg-[#F9FBFF] px-6 py-4 shrink-0">
            {step > 1 ? (
              <button
                onClick={() => go((step - 1) as Step)}
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:text-ink transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </button>
            ) : (
              <span />
            )}

            {step === 1 && (
              <span className="text-xs text-muted-foreground">Pilih paket untuk melanjutkan</span>
            )}
            {step === 2 && (
              <button
                onClick={validateUsername}
                className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy transition-colors"
              >
                Review Order
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
            {step === 3 && pkg && (
              <button
                onClick={() => go(4)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-blue hover:opacity-95 transition-opacity"
              >
                Lanjut ke Pembayaran
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
            {step === 4 && pkg && (
              <button
                onClick={pay}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-pink hover:opacity-95 transition-opacity"
              >
                Bayar Rp{fmtID(pkg.price)}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
