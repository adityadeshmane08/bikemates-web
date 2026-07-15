import React from "react";
import { AppHeader, StatCard } from "@/components/app/ui";

const TRIPS = [12, 18, 15, 22, 19, 28, 24];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Analytics = () => {
  const max = Math.max(...TRIPS);
  const utilization = 72;
  return (
    <div>
      <AppHeader title="Analytics" subtitle="Understand your rental performance at a glance." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total trips" value="138" icon="Route" hint="+8% this week" />
        <StatCard label="Avg. rating" value="4.9 ★" icon="Star" />
        <StatCard label="Repeat renters" value="41%" icon="Repeat" />
        <StatCard label="Response rate" value="98%" icon="Zap" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-surface p-8 lg:col-span-2">
          <h3 className="text-lg font-semibold">Trips this week</h3>
          <div className="mt-8 flex h-52 items-end gap-4">
            {TRIPS.map((v, i) => (
              <div key={i} className="flex h-full flex-1 flex-col items-center gap-2">
                <span className="text-[11px] text-white/50">{v}</span>
                <div className="flex w-full flex-1 items-end">
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-primary/60 to-primary transition-all" style={{ height: `${(v / max) * 100}%` }} />
                </div>
                <span className="text-xs text-white/45">{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-surface p-8 text-center">
          <h3 className="mb-6 self-start text-lg font-semibold">Fleet utilization</h3>
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full" style={{ background: `conic-gradient(#FF4B00 ${utilization * 3.6}deg, rgba(255,255,255,0.08) 0deg)` }}>
            <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-surface">
              <span className="text-3xl font-semibold font-display">{utilization}%</span>
              <span className="text-xs text-white/45">utilized</span>
            </div>
          </div>
          <p className="mt-6 text-sm text-white/55">Your bikes are rented 72% of available hours — above the campus average of 58%.</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
