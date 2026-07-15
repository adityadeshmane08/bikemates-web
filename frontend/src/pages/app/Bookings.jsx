import React from "react";
import { Bike, MapPinned } from "lucide-react";
import { useStore } from "@/lib/store";
import { AppHeader, EmptyState, StatusBadge } from "@/components/app/ui";
import { CTAButton } from "@/components/site/primitives";

const Bookings = () => {
  const store = useStore();

  if (store.bookings.length === 0) {
    return (
      <div>
        <AppHeader title="My Bookings" subtitle="Your bike rentals and booked rides." />
        <EmptyState icon="CalendarCheck" title="No bookings yet" text="Rent a bike or book a ride to see it here."
          action={<div className="flex gap-3"><CTAButton to="/app/rent-bike" testid="empty-rent">Rent a Bike</CTAButton><CTAButton to="/app/book-ride" testid="empty-book" variant="secondary" icon={false}>Book a Ride</CTAButton></div>} />
      </div>
    );
  }

  return (
    <div>
      <AppHeader title="My Bookings" subtitle="Your bike rentals and booked rides." />
      <div className="space-y-4">
        {store.bookings.map((b) => (
          <div key={b.id} data-testid={`booking-${b.id}`} className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-surface p-5">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                {b.kind === "bike" ? <Bike className="h-5 w-5" /> : <MapPinned className="h-5 w-5" />}
              </span>
              <div>
                <p className="font-semibold">{b.title}</p>
                <p className="text-xs text-white/50">{b.sub} • {b.date}{b.plan ? ` • ${b.plan}` : ""}</p>
                {b.otp && <p className="mt-1 text-xs text-white/50">Pickup OTP: <span className="font-semibold tracking-widest text-primary">{b.otp}</span></p>}
              </div>
            </div>
            <div className="text-right">
              <StatusBadge>{b.status}</StatusBadge>
              <p className="mt-1.5 text-sm font-semibold">₹{b.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
