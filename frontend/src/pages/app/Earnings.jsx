import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/lib/store";
import { AppHeader, StatCard } from "@/components/app/ui";

const DATA = [
  { m: "Jul", v: 3200 }, { m: "Aug", v: 4100 }, { m: "Sep", v: 5400 }, { m: "Oct", v: 4800 }, { m: "Nov", v: 6600 }, { m: "Dec", v: 7340 },
];
const BREAKDOWN = [
  { label: "Honda Activa 6G rentals", amount: 4200 },
  { label: "Ride sharing (fuel splits)", amount: 1840 },
  { label: "Weekly rental bonus", amount: 900 },
  { label: "Referral rewards", amount: 400 },
];

const Earnings = () => {
  const store = useStore();
  const nav = useNavigate();
  const max = Math.max(...DATA.map((d) => d.v));
  const total = BREAKDOWN.reduce((a, b) => a + b.amount, 0);
  return (
    <div>
      <AppHeader title="Earnings" subtitle="Track how much your bikes and rides are earning."
        action={<button onClick={() => nav("/app/wallet")} data-testid="earnings-withdraw" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">Withdraw</button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="This month" value="₹7,340" icon="TrendingUp" hint="+11% vs last month" />
        <StatCard label="Total earned" value="₹31,440" icon="Wallet" />
        <StatCard label="Wallet balance" value={`₹${store.wallet.toLocaleString("en-IN")}`} icon="PiggyBank" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-surface p-8 lg:col-span-2">
          <h3 className="text-lg font-semibold">Monthly earnings</h3>
          <div className="mt-8 flex h-56 items-end gap-4">
            {DATA.map((e) => (
              <div key={e.m} className="flex h-full flex-1 flex-col items-center gap-2">
                <span className="text-[11px] text-white/50">₹{(e.v / 1000).toFixed(1)}k</span>
                <div className="flex w-full flex-1 items-end">
                  <div className="w-full rounded-t-lg bg-primary/80 transition-all hover:bg-primary" style={{ height: `${(e.v / max) * 100}%` }} />
                </div>
                <span className="text-xs text-white/45">{e.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-surface p-6">
          <h3 className="text-lg font-semibold">This month’s breakdown</h3>
          <div className="mt-5 space-y-4">
            {BREAKDOWN.map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-sm"><span className="text-white/70">{b.label}</span><span className="font-semibold">₹{b.amount}</span></div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-primary" style={{ width: `${(b.amount / total) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
