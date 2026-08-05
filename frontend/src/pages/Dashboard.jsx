import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { Icon, Reveal, Counter } from "@/components/site/primitives";
import { IMAGES } from "@/lib/data";

const TABS = [
  { id: "rent", label: "Rent Bike", desc: "Ride your freedom", icon: "Bike", color: "#FF4B00" },
  { id: "ride", label: "Book Ride", desc: "Hassle-free travel", icon: "MapPinned", color: "#A855F7" },
  { id: "list", label: "List Bike", desc: "Earn on the go", icon: "KeyRound", color: "#3B82F6" },
  { id: "share", label: "Share Ride", desc: "Save more, together", icon: "Users", color: "#22C55E" },
];

const ACHIEVEMENTS = [
  { icon: "BadgeCheck", label: "Verified Member", color: "#FF4B00" },
  { icon: "ShieldCheck", label: "Trusted Rider", color: "#3B82F6" },
  { icon: "Leaf", label: "Eco Saver", color: "#22C55E" },
  { icon: "Sparkles", label: "Early Adopter", color: "#A855F7" },
];

const TRUST = [
  { icon: "BadgeCheck", title: "Verified Users" },
  { icon: "ShieldCheck", title: "Verified Bikes" },
  { icon: "Lock", title: "Secure Payments" },
  { icon: "HeartHandshake", title: "Community First" },
];

const timeGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
};

const Dashboard = () => {
  const { user } = useAuth();
  const store = useStore();
  const nav = useNavigate();
  const [tab, setTab] = useState("rent");
  const name = user?.name || "Rider";

  const weeklyIn = store.transactions.filter((t) => t.amount > 0).slice(0, 3).reduce((s, t) => s + t.amount, 0);
  const moneySaved = 4280;
  const fuelSaved = 62;
  const co2Saved = 148;
  const streak = 6;

  return (
    <div>
      {/* HERO — breaks out of the page's default padding for a full-bleed banner */}
      <div className="relative -mx-5 -mt-8 overflow-hidden lg:-mx-10">
        <div className="relative h-[380px] sm:h-[420px]">
        <img src={IMAGES.dashboardHero} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />

          <div className="relative flex h-full flex-col justify-between px-5 pb-16 pt-6 lg:px-10">
            <span className="font-display text-lg font-semibold">Bike<span className="text-primary">Mates</span></span>

            <Reveal>
              <p className="text-sm text-white/60">{timeGreeting()},</p>
              <h1 className="mt-1 font-display text-4xl font-bold leading-none sm:text-5xl">{name}</h1>
              <p className="mt-3 text-sm text-white/50">Your Mobility Hub</p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-xs font-semibold text-primary">
                <Icon name="BadgeCheck" className="h-3.5 w-3.5" /> Verified Community
              </span>
            </Reveal>
          </div>
        </div>
      </div>

      {/* FLOATING GLASS WALLET CARD — overlaps the hero */}
      <Reveal delay={0.1} className="relative z-10 -mt-6 px-0">
        <div className="rounded-2xl border border-white/10 bg-[#111]/80 p-4 shadow-2xl shadow-black/50 backdrop-blur-2xl">
          <div className="flex items-center gap-4">
            <div className="flex flex-1 items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary"><Icon name="Wallet" className="h-4 w-4" /></span>
              <div>
                <p className="font-display text-base font-bold text-emerald-400"><Counter value={store.wallet} prefix="₹" /></p>
                <p className="text-[10px] text-white/50">Wallet Balance</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-1 items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400"><Icon name="CalendarCheck" className="h-4 w-4" /></span>
              <div>
                <p className="font-display text-base font-bold"><Counter value={store.bookings.length} /></p>
                <p className="text-[10px] text-white/50">Active Bookings</p>
              </div>
            </div>
            <button onClick={() => nav("/app/wallet")} className="shrink-0 text-white/40">
              <Icon name="ChevronRight" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Reveal>
     {/* CORE ACTIONS */}
      <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <motion.button
              key={t.id}
              onClick={() => setTab(t.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors sm:p-5 ${active ? "border-primary bg-primary/10" : "border-white/10 bg-surface hover:border-white/20"}`}
              style={active ? { boxShadow: `0 0 30px ${t.color}25` } : undefined}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: active ? t.color : `${t.color}18`, color: active ? "#fff" : t.color }}>
                <Icon name={t.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{t.label}</p>
                <p className="truncate text-xs text-white/45">{t.desc}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* DYNAMIC CONTENT — swaps based on selected core action */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab === "rent" && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">Nearby bikes for you</h2>
                  <button onClick={() => nav("/app/rent-bike")} className="text-sm font-semibold text-primary">View all →</button>
                </div>
                <button onClick={() => nav("/app/rent-bike")} className="mt-4 flex w-full items-center gap-2.5 rounded-full border border-white/10 bg-surface px-4 py-3 text-left text-sm text-white/40">
                  <Icon name="Search" className="h-4 w-4" /> Search bikes, owners or colleges...
                </button>
                <div className="mt-5 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-5 px-5 lg:-mx-10 lg:px-10">
                  {store.bikes.filter((b) => !b.mine).slice(0, 4).map((b) => (
                    <div key={b.id} className="w-[80%] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-surface sm:w-[300px]">
                      <div className="relative h-32">
                        <img src={b.image} alt={b.name} className="h-full w-full object-cover" />
                        <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] backdrop-blur-sm"><Icon name="MapPin" className="h-3 w-3" />{b.distance} km</span>
                      </div>
                      <div className="p-4">
                        <p className="truncate text-sm font-semibold">{b.name}</p>
                        <div className="mt-1 flex items-center gap-1 text-xs text-white/50"><Icon name="Star" className="h-3 w-3 fill-amber-400 text-amber-400" />{b.rating} · {b.type}</div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm font-bold text-emerald-400">₹{b.daily}/day</span>
                          <button onClick={() => nav("/app/rent-bike")} className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold">Book</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "ride" && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">Popular rides near you</h2>
                  <button onClick={() => nav("/app/book-ride")} className="text-sm font-semibold text-primary">View all →</button>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {store.rides.filter((r) => !r.mine).slice(0, 4).map((r) => (
                    <div key={r.id} className="rounded-2xl border border-white/10 bg-surface p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-500/15 text-sm font-semibold text-purple-400">{r.driver[0]}</span>
                          <div>
                            <p className="text-sm font-semibold">{r.driver}</p>
                            <p className="text-xs text-white/45">{r.college}</p>
                          </div>
                        </div>
                        <span className="text-xs text-white/50">{r.date}, {r.time}</span>
                      </div>
                      <p className="mt-3 text-sm text-white/70">{r.from} <Icon name="ArrowRight" className="mx-1 inline h-3 w-3" /> {r.to}</p>
                     <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-bold text-emerald-400">₹{r.fuelSplit} split</span>
                        <button onClick={() => nav("/app/book-ride")} className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold">Book seat</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "list" && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">Your listings</h2>
                  <button onClick={() => nav("/app/list-bike")} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold"><Icon name="Plus" className="h-3.5 w-3.5" /> Quick add bike</button>
                </div>
                {store.myBikes.length === 0 ? (
                  <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-surface/40 p-10 text-center">
                    <p className="text-sm text-white/50">You haven't listed a bike yet. List one and start earning today.</p>
                  </div>
                ) : (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {store.myBikes.map((b) => (
                      <div key={b.id} className="rounded-2xl border border-white/10 bg-surface p-5">
                        <p className="text-sm font-semibold">{b.name}</p>
                        <p className="mt-1 text-xs text-white/45">{b.type} · ₹{b.daily}/day</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "share" && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">Your shared rides</h2>
                  <button onClick={() => nav("/app/share-ride")} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold"><Icon name="Plus" className="h-3.5 w-3.5" /> Create ride</button>
                </div>
                {store.myRides.length === 0 ? (
                  <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-surface/40 p-10 text-center">
                    <p className="text-sm text-white/50">You haven't posted a ride yet. Share your route and split fuel costs.</p>
                  </div>
                ) : (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {store.myRides.map((r) => (
                      <div key={r.id} className="rounded-2xl border border-white/10 bg-surface p-5">
                        <p className="text-sm font-semibold">{r.from} → {r.to}</p>
                        <p className="mt-1 text-xs text-white/45">{r.date}, {r.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* IMPACT STATS */}
      <div className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Money Saved", value: moneySaved, prefix: "₹", icon: "PiggyBank" },
          { label: "Fuel Saved", value: fuelSaved, suffix: "L", icon: "Fuel" },
          { label: "CO₂ Reduced", value: co2Saved, suffix: "kg", icon: "Leaf" },
          { label: "Ride Streak", value: streak, suffix: " days", icon: "Flame" },
        ].map((s) => (
          <Reveal key={s.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-surface p-3.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary"><Icon name={s.icon} className="h-4 w-4" /></span>
            <div className="min-w-0">
              <p className={`font-display text-base font-bold ${s.prefix === "₹" ? "text-emerald-400" : ""}`}><Counter value={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} /></p>
              <p className="truncate text-[10px] text-white/50">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
      {/* RECENT ACTIVITY + TRUST */}
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-surface p-6 sm:p-8 lg:col-span-2">
          <h3 className="text-lg font-semibold">Recent activity</h3>
          <div className="mt-6 space-y-5">
            {store.transactions.slice(0, 5).map((t, i) => (
              <div key={t.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full ${t.amount > 0 ? "bg-emerald-500/15 text-emerald-400" : "bg-white/10 text-white/60"}`}>
                    <Icon name={t.amount > 0 ? "ArrowDownLeft" : "ArrowUpRight"} className="h-4 w-4" />
                  </span>
                  {i < store.transactions.slice(0, 5).length - 1 && <span className="mt-1 h-full w-px flex-1 bg-white/10" />}
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">{t.label}</p>
                    <span className={`shrink-0 text-sm font-semibold ${t.amount > 0 ? "text-emerald-400" : "text-white/70"}`}>{t.amount > 0 ? "+" : ""}₹{Math.abs(t.amount)}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-white/40">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-primary/25 bg-gradient-to-b from-primary/10 to-transparent p-6 sm:p-8">
          <h3 className="text-lg font-semibold">Built on trust</h3>
          <div className="mt-6 space-y-4">
            {TRUST.map((t) => (
              <div key={t.title} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary"><Icon name={t.icon} className="h-4 w-4" /></span>
                <span className="text-sm font-medium">{t.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
{/* ACHIEVEMENTS */}
      <div className="mt-14">
        <h2 className="mb-4 text-lg font-semibold">Achievements</h2>
        <div className="flex flex-wrap gap-3">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.label} className="flex items-center gap-2.5 rounded-full border border-white/10 bg-surface py-2 pl-2.5 pr-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: `${a.color}20`, color: a.color }}><Icon name={a.icon} className="h-4 w-4" /></span>
              <span className="text-xs font-semibold">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
export default Dashboard;
