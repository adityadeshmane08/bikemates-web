import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bike, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/site/primitives";
import { USER_DASHBOARD_CARDS, OWNER_DASHBOARD_CARDS } from "@/lib/data";

const EARNINGS = [
  { m: "Jul", v: 3200 }, { m: "Aug", v: 4100 }, { m: "Sep", v: 5400 }, { m: "Oct", v: 4800 }, { m: "Nov", v: 6600 }, { m: "Dec", v: 7340 },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState("rider");
  const name = user?.name || "Student";
  const max = Math.max(...EARNINGS.map((e) => e.v));

  const doLogout = () => { logout(); toast.success("Logged out"); nav("/"); };

  return (
    <div className="min-h-screen bg-[#050505] px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary"><Bike className="h-5 w-5 text-white" /></span>
            <span className="text-lg font-semibold font-display">Bikemates</span>
          </Link>
          <button data-testid="dashboard-logout" onClick={doLogout} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/5">
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-white/50">Welcome back,</p>
            <h1 className="text-3xl font-semibold capitalize">{name} 👋</h1>
          </div>
          <div className="inline-flex rounded-full border border-white/10 bg-surface p-1">
            <button data-testid="tab-rider" onClick={() => setTab("rider")} className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${tab === "rider" ? "bg-primary text-white" : "text-white/60"}`}>Rider</button>
            <button data-testid="tab-owner" onClick={() => setTab("owner")} className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${tab === "owner" ? "bg-primary text-white" : "text-white/60"}`}>Owner</button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Wallet Balance", value: "₹1,240", icon: "Wallet" },
            { label: tab === "rider" ? "Total Trips" : "Active Bikes", value: tab === "rider" ? "34" : "3", icon: "Bike" },
            { label: tab === "rider" ? "Money Saved" : "This Month", value: tab === "rider" ? "₹8,900" : "₹7,340", icon: "TrendingUp" },
            { label: "Rating", value: "4.9 ★", icon: "Star" },
          ].map((s) => (
            <div key={s.label} className="rounded-3xl border border-white/10 bg-surface p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary"><Icon name={s.icon} className="h-5 w-5" /></span>
              <p className="mt-4 text-2xl font-semibold font-display">{s.value}</p>
              <p className="mt-1 text-xs text-white/50">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-surface p-8 lg:col-span-2">
            <h3 className="text-lg font-semibold">{tab === "rider" ? "Your spending saved" : "Earnings overview"}</h3>
            <div className="mt-8 flex h-48 items-end gap-4">
              {EARNINGS.map((e) => (
                <div key={e.m} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full items-end justify-center" style={{ height: "100%" }}>
                    <div className="w-full rounded-t-lg bg-primary/80 transition-all hover:bg-primary" style={{ height: `${(e.v / max) * 100}%` }} />
                  </div>
                  <span className="text-xs text-white/45">{e.m}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-surface p-8">
            <h3 className="text-lg font-semibold">Quick actions</h3>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {(tab === "rider" ? USER_DASHBOARD_CARDS : OWNER_DASHBOARD_CARDS).map((c) => (
                <button key={c.label} data-testid={`quick-${c.label.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => toast(`${c.label} — coming soon`)} className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center transition-colors hover:border-primary/40">
                  <Icon name={c.icon} className="h-5 w-5 text-primary" />
                  <span className="text-[10px] text-white/60">{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-surface p-8">
          <h3 className="text-lg font-semibold">Recent activity</h3>
          <div className="mt-6 space-y-3">
            {[
              ["Rented Honda Activa from Rohan M.", "2 days ago", "-₹120"],
              ["Shared ride to Central Station", "4 days ago", "+₹85"],
              ["Wallet top-up", "1 week ago", "+₹500"],
            ].map(([t, d, a], i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4">
                <div>
                  <p className="text-sm font-medium">{t}</p>
                  <p className="text-xs text-white/40">{d}</p>
                </div>
                <span className={`text-sm font-semibold ${a.startsWith("+") ? "text-emerald-400" : "text-white/70"}`}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
