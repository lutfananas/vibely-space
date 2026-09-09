/* ============ VIBELY SPACE 2.0 — Mock Data Layer ============ */

export type CampaignStatus = "active" | "upcoming" | "completed";

export interface Pkg {
  id: string;
  code: string;
  name: string;
  price: number;
  priceLabel: string;
  target: number;
  reach: string;
  duration: string;
  popular?: boolean;
  features: string[];
}

export interface Campaign {
  id: string;
  handle: string;
  niche: string;
  status: CampaignStatus;
  target: number;
  current: number;
  startFol: number;
  remaining: string;
  progress: number;
  daily: number[];
}

export interface CaseStudy {
  code: string;
  title: string;
  handle: string;
  niche: string;
  before: number;
  after: number;
  gained: number;
  rate: string;
  days: number;
  daily: number[];
  exposure: string;
}

export const fmtID = (n: number) => n.toLocaleString("id-ID");

/* ---------- PACKAGES (PRD §11) ---------- */

export const PACKAGES: Pkg[] = [
  {
    id: "starter",
    code: "PKG-01",
    name: "Starter",
    price: 15000,
    priceLabel: "Rp15K",
    target: 200,
    reach: "15K",
    duration: "2 hari",
    features: ["Campaign giveaway", "Tracking dashboard", "Garansi target", "Laporan selesai"],
  },
  {
    id: "boost",
    code: "PKG-02",
    name: "Boost",
    price: 28000,
    priceLabel: "Rp28K",
    target: 500,
    reach: "38K",
    duration: "3 hari",
    features: ["Campaign giveaway", "Tracking dashboard", "Garansi target", "Laporan selesai"],
  },
  {
    id: "grow",
    code: "PKG-03",
    name: "Grow",
    price: 42000,
    priceLabel: "Rp42K",
    target: 1000,
    reach: "75K",
    duration: "3–4 hari",
    features: ["Campaign giveaway", "Tracking dashboard", "Garansi target", "Analytics dasar"],
  },
  {
    id: "pro",
    code: "PKG-04",
    name: "Pro",
    price: 62000,
    priceLabel: "Rp62K",
    target: 2000,
    reach: "150K",
    duration: "4–5 hari",
    popular: true,
    features: [
      "Campaign giveaway",
      "Tracking dashboard",
      "Garansi target",
      "Analytics lengkap",
      "Priority support",
    ],
  },
  {
    id: "scale",
    code: "PKG-05",
    name: "Scale",
    price: 115000,
    priceLabel: "Rp115K",
    target: 5000,
    reach: "380K",
    duration: "5 hari",
    features: [
      "Campaign giveaway",
      "Tracking dashboard",
      "Garansi target",
      "Analytics lengkap",
      "Priority support",
    ],
  },
  {
    id: "viral",
    code: "PKG-06",
    name: "Viral",
    price: 185000,
    priceLabel: "Rp185K",
    target: 10000,
    reach: "750K",
    duration: "5–7 hari",
    features: [
      "Campaign giveaway",
      "Tracking dashboard",
      "Garansi target",
      "Analytics lengkap",
      "Priority support",
      "Dedicated manager",
    ],
  },
];

/* ---------- LIVE CAMPAIGNS (PRD §7 / §8) ---------- */

export const CAMPAIGNS: Campaign[] = [
  {
    id: "VIB-2026-00182",
    handle: "brandanda",
    niche: "Fashion & Lifestyle",
    status: "active",
    target: 2000,
    current: 1742,
    startFol: 4821,
    remaining: "2 hari lagi",
    progress: 87.1,
    daily: [298, 412, 388, 344, 300],
  },
  {
    id: "VIB-2026-00179",
    handle: "fashionstore",
    niche: "Online Shop",
    status: "active",
    target: 2000,
    current: 1642,
    startFol: 5210,
    remaining: "3 hari 14 jam",
    progress: 82.1,
    daily: [352, 401, 377, 290, 222],
  },
  {
    id: "VIB-2026-00177",
    handle: "kuliner_tulungagung",
    niche: "Kuliner",
    status: "active",
    target: 2000,
    current: 1220,
    startFol: 1875,
    remaining: "5 hari 8 jam",
    progress: 61,
    daily: [265, 318, 290, 201, 146],
  },
  {
    id: "VIB-2026-00185",
    handle: "skincareku",
    niche: "Beauty",
    status: "upcoming",
    target: 1000,
    current: 0,
    startFol: 2340,
    remaining: "mulai dalam 2 hari",
    progress: 0,
    daily: [],
  },
  {
    id: "VIB-2026-00121",
    handle: "fashionstore",
    niche: "Online Shop",
    status: "completed",
    target: 5000,
    current: 5000,
    startFol: 6890,
    remaining: "selesai",
    progress: 100,
    daily: [1020, 1088, 975, 1102, 815],
  },
  {
    id: "VIB-2026-00098",
    handle: "kuliner.id",
    niche: "Kuliner",
    status: "completed",
    target: 1000,
    current: 1000,
    startFol: 1208,
    remaining: "selesai",
    progress: 100,
    daily: [355, 340, 305],
  },
];

/* ---------- CASE STUDIES (PRD §9 / §10) ---------- */

export const CASE_STUDIES: CaseStudy[] = [
  {
    code: "CS-024",
    title: "Fashion Brand Campaign",
    handle: "brandfashion",
    niche: "Fashion",
    before: 4821,
    after: 7124,
    gained: 2303,
    rate: "+47.8%",
    days: 5,
    daily: [412, 538, 421, 503, 429],
    exposure: "86.4K",
  },
  {
    code: "CS-021",
    title: "Skincare Launch Campaign",
    handle: "skincare.official",
    niche: "Beauty",
    before: 2340,
    after: 3905,
    gained: 1565,
    rate: "+66.9%",
    days: 4,
    daily: [388, 421, 395, 361],
    exposure: "52.1K",
  },
  {
    code: "CS-019",
    title: "Kuliner Viral Campaign",
    handle: "kuliner.nusantara",
    niche: "Kuliner",
    before: 1208,
    after: 2944,
    gained: 1736,
    rate: "+143.7%",
    days: 5,
    daily: [355, 402, 368, 318, 293],
    exposure: "64.7K",
  },
  {
    code: "CS-017",
    title: "Hijab Store Campaign",
    handle: "hijabstore.id",
    niche: "Fashion",
    before: 3512,
    after: 5204,
    gained: 1692,
    rate: "+48.2%",
    days: 4,
    daily: [445, 478, 401, 368],
    exposure: "58.9K",
  },
  {
    code: "CS-015",
    title: "Gadget Mart Campaign",
    handle: "gadgetmart",
    niche: "Elektronik",
    before: 6890,
    after: 9415,
    gained: 2525,
    rate: "+36.6%",
    days: 5,
    daily: [512, 548, 497, 516, 452],
    exposure: "91.2K",
  },
  {
    code: "CS-011",
    title: "Thrifting Community Campaign",
    handle: "thrifting.aja",
    niche: "Lifestyle",
    before: 980,
    after: 2317,
    gained: 1337,
    rate: "+136.4%",
    days: 3,
    daily: [455, 478, 404],
    exposure: "41.8K",
  },
];

/* ---------- FAQ (PRD §13) ---------- */

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Apakah saya harus memberikan password Instagram?",
    a: "Tidak. VIBELY hanya membutuhkan @username Instagram Anda untuk memasukkan akun ke dalam campaign giveaway. Kami tidak akan pernah meminta password, kode login, atau akses apapun ke akun Anda.",
  },
  {
    q: "Bagaimana campaign bekerja?",
    a: "Akun Anda menjadi sponsor utama dalam campaign giveaway yang kami jalankan. Ribuan peserta giveaway akan melihat, mengunjungi, dan mengikuti akun Anda secara organik selama campaign berjalan. Semua pertumbuhan tercatat di dashboard tracking Anda.",
  },
  {
    q: "Berapa lama campaign berjalan?",
    a: "Tergantung paket: paket Starter selesai dalam 2 hari, paket menengah 3–4 hari, dan paket besar (Scale & Viral) berjalan 5–7 hari. Estimasi durasi selalu ditampilkan sebelum Anda melakukan order.",
  },
  {
    q: "Bagaimana sistem garansi?",
    a: "Setiap paket memiliki garansi target followers. Progress campaign dapat dipantau real-time melalui Campaign Tracking. Jika target belum tercapai di hari terakhir, campaign akan diperpanjang sampai target terpenuhi.",
  },
  {
    q: "Bagaimana jika target tidak tercapai?",
    a: "Campaign Anda tidak berhenti begitu saja. Kami memperpanjang durasi campaign tanpa biaya tambahan hingga target tercapai. Garansi ini berlaku untuk semua paket tanpa kecuali.",
  },
  {
    q: "Apakah bisa melihat progress?",
    a: "Ya. Setiap order mendapatkan Campaign ID yang bisa dilacak melalui halaman Track Campaign. Di dalam dashboard Anda bisa melihat progress bar, followers harian, sisa waktu campaign, dan growth chart.",
  },
  {
    q: "Apakah campaign aman untuk akun?",
    a: "Aman. Kami tidak meminta password dan tidak menggunakan bot yang terhubung ke akun Anda. Pertumbuhan datang dari exposure organik giveaway — peserta yang menemukan akun Anda sendiri.",
  },
  {
    q: "Apakah saya mendapatkan laporan?",
    a: "Ya. Setelah campaign selesai, Anda menerima laporan hasil: total followers gained, growth rate, estimasi reach, dan durasi campaign. Laporan tersimpan di dashboard Anda dan bisa diakses kapan saja.",
  },
];

/* ---------- ADMIN STATS (PRD §19) ---------- */

export const ADMIN_STATS = {
  totalCampaigns: 284,
  activeCampaigns: 17,
  revenue: "Rp18,4M",
  customers: 231,
};

export const ADMIN_TABLE = [
  { id: "VIB-2026-00182", customer: "@brandanda", pkg: "PKG-04 Pro", progress: "87.1%", status: "ACTIVE" },
  { id: "VIB-2026-00179", customer: "@fashionstore", pkg: "PKG-04 Pro", progress: "82.1%", status: "ACTIVE" },
  { id: "VIB-2026-00185", customer: "@skincareku", pkg: "PKG-03 Grow", progress: "—", status: "WAITING" },
  { id: "VIB-2026-00121", customer: "@fashionstore", pkg: "PKG-05 Scale", progress: "100%", status: "DONE" },
  { id: "VIB-2026-00098", customer: "@kuliner.id", pkg: "PKG-03 Grow", progress: "100%", status: "DONE" },
];

/* ---------- TRUST NUMBERS (PRD §4) ---------- */

export const TRUST_STATS = [
  { value: 200, suffix: "+", label: "Campaigns", sub: "campaign telah berjalan" },
  { value: 12, suffix: "K+", label: "Audience Reach", sub: "peserta terjangkau" },
  { value: 98, suffix: "%", label: "Campaign Completion", sub: "target tercapai" },
  { value: 24, suffix: "/7", label: "Fast Response", sub: "tim support siaga" },
];

/* ---------- WHATSAPP ---------- */

export const WA_LINK =
  "https://wa.me/6281234567890?text=Halo%20VIBELY%20SPACE%2C%20saya%20mau%20tanya%20soal%20campaign%20giveaway";
export const IG_LINK = "https://instagram.com/vibely.space";
