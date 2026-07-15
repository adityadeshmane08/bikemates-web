import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { AppHeader, StatCard } from "@/components/app/ui";
import { Icon } from "@/components/site/primitives";

const EARNINGS = [
  { m: "Jul", v: 3200 }, { m: "Aug", v: 4100 }, { m: "Sep", v: 5400 }, { m: "Oct", v: 4800 }, { m: "Nov", v: 6600 }, { m: "Dec", v: 7340 },
];

const QUICK = [
  { to: "/app/rent-bike", label: "Rent a Bike", icon: "Bike", color: "#3B82F6" },
  { to: "/app/book-ride", label: "Book a Ride", icon: "MapPinned", color: "#A855F7" },
  { to: "/app/list-bike", label: "List Bike for Rent", icon: "KeyRound", color: "#FF4B00" },
  { to: "/app/share-ride", label: "Share a Ride", icon: "Users", color: "#22C55E" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const store = useStore();
  const nav = useNavigate();
  const name = user?.name || "Student";
  const max = Math.max(...EARNINGS.map((e) => e.v));

  return (
    <div>
      <AppHeader title={<span className="capitalize">Welcome back, {name} 👋</span>} subtitle="Here's what's happening across your campus mobility." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Wallet Balance" value={`₹${store.wallet.toLocaleString("en-IN")}`} icon="Wallet" />
        <StatCard label="Active Bookings" value={store.bookings.length} icon="CalendarCheck" />
        <StatCard label="Bikes Listed" value={store.myBikes.length} icon="Bike" hint={store.myBikes.length ? "Earning" : undefined} />
        <StatCard label="Rides Posted" value={store.myRides.length} icon="Route" />
      </div>

      {/* Quick actions — the 4 core flows */}
      <h2 className="mt-10 mb-4 text-lg font-semibold">Quick actions</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK.map((q) => (
          <button key={q.to} onClick={() => nav(q.to)} data-testid={`quick-${q.label.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")}`}
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-surface p-5 text-left transition-transform duration-300 hover:-translate-y-1 hover:border-white/20">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${q.color}1f`, color: q.color }}><Icon name={q.icon} className="h-6 w-6" /></span>
            <div>
              <p className="text-sm font-semibold">{q.label}</p>
              <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-white/45 transition-transform group-hover:translate-x-0.5">Open <Icon name="ArrowRight" className="h-3 w-3" /></span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-surface p-8 lg:col-span-2">
          <h3 className="text-lg font-semibold">Earnings & savings overview</h3>
          <div className="mt-8 flex h-48 items-end gap-4">
            {EARNINGS.map((e) => (
              <div key={e.m} className="flex h-full flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div className="w-full rounded-t-lg bg-primary/80 transition-all hover:bg-primary" style={{ height: `${(e.v / max) * 100}%` }} />
                </div>
                <span className="text-xs text-white/45">{e.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-surface p-8">
          <h3 className="text-lg font-semibold">Recent activity</h3>
          <div className="mt-6 space-y-3">
            {store.transactions.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{t.label}</p>
                  <p className="text-xs text-white/40">{t.date}</p>
                </div>
                <span className={`shrink-0 text-sm font-semibold ${t.amount > 0 ? "text-emerald-400" : "text-white/70"}`}>{t.amount > 0 ? "+" : ""}₹{Math.abs(t.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
