import React from "react";
import { toast } from "sonner";
import { Gift, Zap, Percent, Coffee } from "lucide-react";
import { useStore } from "@/lib/store";
import { AppHeader } from "@/components/app/ui";

const REDEEM = [
  { icon: Percent, title: "10% off next rental", cost: 200 },
  { icon: Zap, title: "Free booking extension", cost: 350 },
  { icon: Coffee, title: "₹50 campus café voucher", cost: 500 },
  { icon: Gift, title: "Bikemates merch pack", cost: 1200 },
];

const Rewards = () => {
  const store = useStore();
  const points = 640;
  const next = 1000;
  const redeem = (r) => {
    if (points < r.cost) return toast.error("Not enough points yet — keep riding!");
    store.topUp(0);
    toast.success(`Redeemed: ${r.title}`);
  };
  return (
    <div>
      <AppHeader title="Rewards" subtitle="Earn points on every trip and redeem them for perks." />
      <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 to-surface p-8">
        <p className="text-sm text-white/60">Your reward points</p>
        <p className="mt-1 text-4xl font-semibold font-display">{points} <span className="text-lg text-white/50">pts</span></p>
        <div className="mt-5">
          <div className="flex justify-between text-xs text-white/50"><span>Silver</span><span>{next - points} pts to Gold</span></div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-primary" style={{ width: `${(points / next) * 100}%` }} />
          </div>
        </div>
      </div>

      <h2 className="mb-4 mt-8 text-lg font-semibold">Redeem points</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {REDEEM.map((r) => (
          <div key={r.title} className="flex items-center justify-between rounded-3xl border border-white/10 bg-surface p-6">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary"><r.icon className="h-6 w-6" /></span>
              <div>
                <p className="font-semibold">{r.title}</p>
                <p className="text-xs text-white/50">{r.cost} points</p>
              </div>
            </div>
            <button onClick={() => redeem(r)} data-testid={`redeem-${r.cost}`} className="rounded-full border border-white/20 px-5 py-2 text-xs font-semibold transition-colors hover:bg-white/5">Redeem</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
