import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { Star, Search, Clock, Users, ArrowRight, Navigation } from "lucide-react";
import { useStore } from "@/lib/store";
import { AppHeader } from "@/components/app/ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const BookRide = () => {
  const store = useStore();
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);
  const [booked, setBooked] = useState(false);

  const rides = useMemo(() => store.rides.filter((r) =>
    r.from.toLowerCase().includes(q.toLowerCase()) || r.to.toLowerCase().includes(q.toLowerCase()) || r.driver.toLowerCase().includes(q.toLowerCase())
  ), [store.rides, q]);

  const open = (r) => { setSelected(r); setBooked(false); };
  const confirm = () => {
    store.bookRide(selected);
    setBooked(true);
    toast.success("Seat booked! Chat with your driver to coordinate pickup.");
  };

  return (
    <div>
      <AppHeader title="Book a Ride" subtitle="Grab a seat with a student heading your way and split the fuel." />

      <div className="relative mb-6 max-w-xl">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input data-testid="ride-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by pickup, drop or driver..."
          className="w-full rounded-full border border-white/10 bg-surface py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none" />
      </div>

      {rides.length === 0 ? (
        <p className="py-16 text-center text-white/50">No rides match your search.</p>
      ) : (
        <div className="space-y-4">
          {rides.map((r) => (
            <div key={r.id} data-testid={`ride-card-${r.id}`} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-surface p-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">{r.driver[0]}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{r.driver}</p>
                    <span className="flex items-center gap-1 text-xs text-white/50"><Star className="h-3 w-3 fill-primary text-primary" />{r.rating}</span>
                    {r.mine && <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">Yours</span>}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-medium">{r.from}</span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span className="font-medium">{r.to}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/50">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{r.date}, {r.time}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{r.seats}/{r.seatsTotal} seats left</span>
                    <span>{r.vehicle}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end">
                <div className="text-right">
                  <p className="text-lg font-semibold text-primary">₹{r.fuelSplit}</p>
                  <p className="text-xs text-white/45">fuel split</p>
                </div>
                <button disabled={r.seats === 0 || r.mine} onClick={() => open(r)} data-testid={`book-ride-${r.id}`}
                  className="rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300] disabled:cursor-not-allowed disabled:opacity-40">
                  {r.mine ? "Your ride" : r.seats === 0 ? "Full" : "Book seat"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg border-white/10 bg-surface text-white">
          {selected && !booked && (
            <>
              <DialogHeader><DialogTitle className="text-xl">Confirm your seat</DialogTitle></DialogHeader>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-lg font-semibold text-primary">{selected.driver[0]}</span>
                <div>
                  <p className="font-semibold">{selected.driver}</p>
                  <p className="text-xs text-white/50">{selected.college} • <Star className="inline h-3 w-3 fill-primary text-primary" /> {selected.rating}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 p-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex flex-col items-center pt-1">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="my-1 h-8 w-px bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 space-y-5">
                    <div><p className="text-xs text-white/45">Pickup</p><p className="font-medium">{selected.from}</p></div>
                    <div><p className="text-xs text-white/45">Drop</p><p className="font-medium">{selected.to}</p></div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-sm">
                  <span className="text-white/60">{selected.date}, {selected.time}</span>
                  <span className="font-semibold">Your share ₹{selected.fuelSplit}</span>
                </div>
              </div>
              <button onClick={confirm} data-testid="confirm-ride" className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">Confirm & Pay ₹{selected.fuelSplit}</button>
              <p className="text-center text-[11px] text-white/40">Demo payment — no real charge.</p>
            </>
          )}
          {selected && booked && (
            <div className="py-2 text-center">
              <DialogHeader><DialogTitle className="text-center text-xl">Seat confirmed 🎉</DialogTitle></DialogHeader>
              <span className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400"><Navigation className="h-8 w-8" /></span>
              <p className="mt-4 text-sm text-white/55">You’re riding with {selected.driver} from {selected.from} to {selected.to}. Live tracking activates 15 minutes before pickup.</p>
              <button onClick={() => setSelected(null)} data-testid="close-ride-confirm" className="mt-6 w-full rounded-full border border-white/20 py-3 text-sm font-semibold transition-colors hover:bg-white/5">Done</button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookRide;
