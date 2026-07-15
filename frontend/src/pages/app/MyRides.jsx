import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock, Users } from "lucide-react";
import { useStore } from "@/lib/store";
import { AppHeader, EmptyState, StatusBadge } from "@/components/app/ui";
import { CTAButton } from "@/components/site/primitives";

const MyRides = () => {
  const store = useStore();
  const nav = useNavigate();

  if (store.myRides.length === 0) {
    return (
      <div>
        <AppHeader title="My Rides" subtitle="Manage the routes you've posted." />
        <EmptyState icon="Route" title="No rides posted yet" text="Post your daily commute and let classmates share the fuel cost with you."
          action={<CTAButton to="/app/share-ride" testid="empty-share-ride">Share a Ride</CTAButton>} />
      </div>
    );
  }

  return (
    <div>
      <AppHeader title="My Rides" subtitle="Your posted routes and seat bookings."
        action={<button onClick={() => nav("/app/share-ride")} data-testid="add-ride-btn" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">+ Post new ride</button>} />
      <div className="space-y-4">
        {store.myRides.map((r) => (
          <div key={r.id} className="rounded-3xl border border-white/10 bg-surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span>{r.from}</span><ArrowRight className="h-4 w-4 text-primary" /><span>{r.to}</span>
              </div>
              <StatusBadge color="orange">{r.recurring}</StatusBadge>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-white/50">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{r.date}, {r.time}</span>
              <span className="flex items-center gap-1"><Users className="h-3 w-3" />{r.seats}/{r.seatsTotal} seats left</span>
              <span>{r.vehicle}</span>
              <span className="font-semibold text-primary">₹{r.fuelSplit}/seat</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRides;
