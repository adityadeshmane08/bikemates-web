import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Star, Check, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { AppHeader, EmptyState, StatusBadge } from "@/components/app/ui";
import { CTAButton } from "@/components/site/primitives";

const REQUESTS = [
  { name: "Meera Iyer", when: "Tomorrow, 2 days", amount: 520 },
  { name: "Sahil Gupta", when: "This weekend", amount: 1500 },
];

const MyBikes = () => {
  const store = useStore();
  const nav = useNavigate();

  if (store.myBikes.length === 0) {
    return (
      <div>
        <AppHeader title="My Bikes" subtitle="Manage the bikes you've listed for rent." />
        <EmptyState icon="Bike" title="No bikes listed yet" text="List your first bike and start earning from idle hours on campus."
          action={<CTAButton to="/app/list-bike" testid="empty-list-bike">List a Bike</CTAButton>} />
      </div>
    );
  }

  return (
    <div>
      <AppHeader title="My Bikes" subtitle="Manage listings, requests and earnings."
        action={<button onClick={() => nav("/app/list-bike")} data-testid="add-bike-btn" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">+ List new bike</button>} />

      <div className="grid gap-6 lg:grid-cols-2">
        {store.myBikes.map((b) => (
          <div key={b.id} className="overflow-hidden rounded-3xl border border-white/10 bg-surface">
            <div className="flex gap-4 p-5">
              <img src={b.image} alt={b.name} className="h-24 w-32 rounded-2xl object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{b.name}</h3>
                  <StatusBadge color={b.available ? "emerald" : "gray"}>{b.available ? "Available" : "Rented"}</StatusBadge>
                </div>
                <p className="mt-1 text-xs text-white/50">{b.type} • {b.fuel} • {b.transmission}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-white/50">
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-primary text-primary" />{b.rating}</span>
                  <span>{b.trips} trips</span>
                  <span className="text-primary font-semibold">₹{b.daily}/day</span>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">Booking requests</p>
              <div className="space-y-3">
                {REQUESTS.map((r) => (
                  <div key={r.name} className="flex items-center justify-between rounded-2xl bg-white/[0.03] px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{r.name}</p>
                      <p className="text-xs text-white/45">{r.when} • ₹{r.amount}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => toast.success(`Accepted ${r.name}'s request`)} className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 transition-colors hover:bg-emerald-500/25"><Check className="h-4 w-4" /></button>
                      <button onClick={() => toast(`Declined ${r.name}'s request`)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20"><X className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBikes;
