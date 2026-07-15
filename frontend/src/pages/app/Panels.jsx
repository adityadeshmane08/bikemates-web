import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/app/ui";
import { Icon } from "@/components/site/primitives";
import { USER_DASHBOARD_CARDS, OWNER_DASHBOARD_CARDS } from "@/lib/data";

const Tile = ({ card, onClick }) => (
  <button
    onClick={onClick}
    data-testid={`dash-tile-${card.label.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")}`}
    className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center transition-transform duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/[0.05]"
  >
    <Icon name={card.icon} className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
    <span className="text-sm font-medium text-white/70">{card.label}</span>
  </button>
);

const Panels = () => {
  const nav = useNavigate();
  const [view, setView] = useState("rider");

  return (
    <div>
      <AppHeader title="Quick Panels" subtitle="Jump straight to any feature — rider or owner."
        action={
          <div className="inline-flex rounded-full border border-white/10 bg-surface p-1" data-testid="panels-toggle">
            <button data-testid="dash-view-rider" onClick={() => setView("rider")} className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${view === "rider" ? "bg-blue-500/20 text-blue-400" : "text-white/60 hover:text-white"}`}>User</button>
            <button data-testid="dash-view-owner" onClick={() => setView("owner")} className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${view === "owner" ? "bg-primary/20 text-primary" : "text-white/60 hover:text-white"}`}>Owner</button>
          </div>
        } />

      {view === "rider" ? (
        <div className="rounded-3xl border border-white/10 bg-surface p-6 sm:p-8" data-testid="user-dashboard">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold sm:text-2xl">User Dashboard</h2>
            <span className="rounded-full bg-blue-500/15 px-4 py-1.5 text-sm font-semibold text-blue-400">Rider</span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {USER_DASHBOARD_CARDS.map((c) => <Tile key={c.label} card={c} onClick={() => nav(c.to)} />)}
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-surface p-6 sm:p-8" data-testid="owner-dashboard">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold sm:text-2xl">Owner Dashboard</h2>
            <span className="rounded-full bg-primary/15 px-4 py-1.5 text-sm font-semibold text-primary">Earning</span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {OWNER_DASHBOARD_CARDS.map((c) => <Tile key={c.label} card={c} onClick={() => nav(c.to)} />)}
          </div>
          <button onClick={() => nav("/app/earnings")} data-testid="owner-earnings-box" className="mt-6 block w-full rounded-2xl bg-primary/10 p-6 text-left transition-colors hover:bg-primary/15">
            <p className="text-sm text-white/60">This month’s earnings</p>
            <p className="mt-1 text-3xl font-semibold text-primary font-display">₹{(7340).toLocaleString("en-IN")}</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Panels;
