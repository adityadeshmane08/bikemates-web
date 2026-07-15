import React, { useState } from "react";
import { toast } from "sonner";
import { Check, X, Clock } from "lucide-react";
import { AppHeader, EmptyState } from "@/components/app/ui";

const SEED = [
  { id: "req1", rider: "Meera Iyer", college: "VIT Vellore", bike: "Honda Activa 6G", when: "Tomorrow, 9 AM – 6 PM", plan: "Daily", amount: 260 },
  { id: "req2", rider: "Sahil Gupta", college: "SRM Chennai", bike: "Royal Enfield Classic 350", when: "This weekend (2 days)", plan: "Weekly", amount: 1500 },
  { id: "req3", rider: "Nikhil Raj", college: "Manipal", bike: "Yamaha FZ-S", when: "Today, 4 PM – 7 PM", plan: "Hourly", amount: 195 },
];

const BookingRequests = () => {
  const [reqs, setReqs] = useState(SEED);
  const act = (id, ok, name) => {
    setReqs((r) => r.filter((x) => x.id !== id));
    ok ? toast.success(`Accepted ${name}'s request`) : toast(`Declined ${name}'s request`);
  };

  if (reqs.length === 0) {
    return (
      <div>
        <AppHeader title="Booking Requests" subtitle="Incoming rental requests for your bikes." />
        <EmptyState icon="Inbox" title="All caught up" text="You've handled every pending request. New ones will appear here." />
      </div>
    );
  }

  return (
    <div>
      <AppHeader title="Booking Requests" subtitle="Accept or decline requests from verified students." />
      <div className="space-y-4">
        {reqs.map((r) => (
          <div key={r.id} data-testid={`request-${r.id}`} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">{r.rider[0]}</span>
              <div>
                <p className="font-semibold">{r.rider} <span className="text-xs font-normal text-white/45">• {r.college}</span></p>
                <p className="mt-1 text-sm text-white/60">{r.bike}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-white/45"><Clock className="h-3 w-3" />{r.when} • {r.plan} • ₹{r.amount}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => act(r.id, true, r.rider)} data-testid={`accept-${r.id}`} className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/25"><Check className="h-4 w-4" />Accept</button>
              <button onClick={() => act(r.id, false, r.rider)} data-testid={`reject-${r.id}`} className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition-colors hover:bg-white/20"><X className="h-4 w-4" />Decline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingRequests;
