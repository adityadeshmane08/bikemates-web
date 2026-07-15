import React from "react";
import { Icon } from "@/components/site/primitives";

export const AppHeader = ({ title, subtitle, action }) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-1.5 text-sm text-white/50">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export const StatCard = ({ label, value, icon, hint }) => (
  <div className="rounded-2xl border border-white/10 bg-surface p-5">
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary"><Icon name={icon} className="h-5 w-5" /></span>
    <p className="mt-4 text-2xl font-semibold font-display">{value}</p>
    <p className="mt-1 text-xs text-white/50">{label}</p>
    {hint && <p className="mt-1 text-[11px] text-emerald-400">{hint}</p>}
  </div>
);

export const EmptyState = ({ icon = "Inbox", title, text, action }) => (
  <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-surface/40 px-6 py-16 text-center">
    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 text-primary"><Icon name={icon} className="h-7 w-7" /></span>
    <h3 className="mt-5 text-lg font-semibold">{title}</h3>
    <p className="mt-2 max-w-sm text-sm text-white/50">{text}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export const Chip = ({ children, active, onClick, testid }) => (
  <button onClick={onClick} data-testid={testid} className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${active ? "border-primary bg-primary/15 text-primary" : "border-white/10 bg-surface text-white/60 hover:text-white"}`}>
    {children}
  </button>
);

export const StatusBadge = ({ children, color = "emerald" }) => {
  const map = {
    emerald: "bg-emerald-500/15 text-emerald-400",
    orange: "bg-primary/15 text-primary",
    blue: "bg-blue-500/15 text-blue-400",
    gray: "bg-white/10 text-white/60",
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${map[color]}`}>{children}</span>;
};
