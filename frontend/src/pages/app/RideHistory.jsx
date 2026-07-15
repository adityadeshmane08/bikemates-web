import React from "react";
import { ArrowRight, Star, Bike, MapPinned } from "lucide-react";
import { useStore } from "@/lib/store";
import { AppHeader, StatusBadge } from "@/components/app/ui";

const PAST = [
  { kind: "ride", title: "Campus Gate → Andheri Station", sub: "with Rohan Mehta", date: "Dec 12, 2025", amount: 45, rating: 5 },
  { kind: "bike", title: "Royal Enfield Classic 350", sub: "from Karan Singh", date: "Dec 9, 2025", amount: 650, rating: 5 },
  { kind: "ride", title: "Hostel Block C → Tech Park", sub: "with Ishita Verma", date: "Dec 5, 2025", amount: 35, rating: 4 },
  { kind: "bike", title: "TVS Jupiter", sub: "from Ishita Verma", date: "Nov 28, 2025", amount: 230, rating: 5 },
];

const RideHistory = () => {
  const store = useStore();
  const history = [...store.bookings.map((b) => ({ ...b, rating: 5 })), ...PAST];
  return (
    <div>
      <AppHeader title="Ride History" subtitle="Every trip and rental you've completed." />
      <div className="space-y-4">
        {history.map((h, i) => (
          <div key={h.id || i} className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-surface p-5">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                {h.kind === "bike" ? <Bike className="h-5 w-5" /> : <MapPinned className="h-5 w-5" />}
              </span>
              <div>
                <p className="font-semibold">{h.title}</p>
                <p className="text-xs text-white/50">{h.sub} • {h.date}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} className={`h-3.5 w-3.5 ${j < (h.rating || 5) ? "fill-primary text-primary" : "text-white/20"}`} />)}
              </div>
              <p className="mt-1 text-sm font-semibold">₹{h.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RideHistory;
