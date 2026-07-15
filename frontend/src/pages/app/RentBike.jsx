import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { Star, MapPin, Search, Fuel, Cog, Calendar } from "lucide-react";
import { useStore } from "@/lib/store";
import { AppHeader, Chip } from "@/components/app/ui";
import { Icon } from "@/components/site/primitives";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const TYPES = ["All", "Scooter", "Sports", "Cruiser", "Electric"];

const RentBike = () => {
  const store = useStore();
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const [selected, setSelected] = useState(null);
  const [plan, setPlan] = useState("daily");
  const [step, setStep] = useState("details"); // details | confirm
  const [otp] = useState(() => Math.floor(1000 + Math.random() * 9000));

  const bikes = useMemo(() => store.bikes.filter((b) =>
    (type === "All" || b.type === type) &&
    (b.name.toLowerCase().includes(q.toLowerCase()) || b.owner.toLowerCase().includes(q.toLowerCase()) || b.college.toLowerCase().includes(q.toLowerCase()))
  ), [store.bikes, type, q]);

  const open = (b) => { setSelected(b); setPlan("daily"); setStep("details"); };
  const confirmBooking = () => {
    store.bookBike(selected, plan, otp);
    setStep("confirm");
    toast.success("Bike booked! Show the QR + OTP at pickup.");
  };

  const planLabel = { hourly: "Hourly", daily: "Daily", weekly: "Weekly" };

  return (
    <div>
      <AppHeader title="Rent a Bike" subtitle="Find verified bikes from students near your campus." />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input data-testid="rent-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search bikes, owners or colleges..."
            className="w-full rounded-full border border-white/10 bg-surface py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none" />
        </div>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => <Chip key={t} active={type === t} onClick={() => setType(t)} testid={`filter-${t.toLowerCase()}`}>{t}</Chip>)}
        </div>
      </div>

      {bikes.length === 0 ? (
        <p className="py-16 text-center text-white/50">No bikes match your search.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bikes.map((b) => (
            <div key={b.id} data-testid={`bike-card-${b.id}`} className="group overflow-hidden rounded-3xl border border-white/10 bg-surface transition-transform duration-300 hover:-translate-y-1.5">
              <div className="relative h-44 overflow-hidden">
                <img src={b.image} alt={b.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium backdrop-blur">{b.type}</span>
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold backdrop-blur"><Star className="h-3 w-3 fill-primary text-primary" />{b.rating}</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{b.name}</h3>
                    <p className="mt-0.5 text-xs text-white/50">{b.owner} • {b.college}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-white/50">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{b.distance} km</span>
                  <span className="flex items-center gap-1"><Fuel className="h-3 w-3" />{b.fuel}</span>
                  <span className="flex items-center gap-1"><Cog className="h-3 w-3" />{b.transmission}</span>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <span className="text-lg font-semibold text-primary">₹{b.daily}</span>
                    <span className="text-xs text-white/45">/day</span>
                  </div>
                  <button onClick={() => open(b)} data-testid={`rent-view-${b.id}`} className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">View & Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg border-white/10 bg-surface text-white">
          {selected && step === "details" && (
            <>
              <DialogHeader><DialogTitle className="text-xl">{selected.name}</DialogTitle></DialogHeader>
              <div className="overflow-hidden rounded-2xl"><img src={selected.image} alt={selected.name} className="h-48 w-full object-cover" /></div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-primary text-primary" />{selected.rating} ({selected.trips} trips)</span>
                <span>•</span><span>{selected.owner}</span><span>•</span><span>{selected.college}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selected.specs.map((s) => <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">{s}</span>)}
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-white/70">Choose a plan</p>
                <div className="grid grid-cols-3 gap-2">
                  {["hourly", "daily", "weekly"].map((p) => (
                    <button key={p} onClick={() => setPlan(p)} data-testid={`plan-${p}`} className={`rounded-2xl border p-3 text-center transition-colors ${plan === p ? "border-primary bg-primary/10" : "border-white/10"}`}>
                      <p className="text-xs text-white/50">{planLabel[p]}</p>
                      <p className="mt-1 font-semibold">₹{selected[p]}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm">
                <span className="text-white/60">Refundable deposit</span><span className="font-semibold">₹{selected.deposit}</span>
              </div>
              <button onClick={confirmBooking} data-testid="confirm-booking" className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">
                Pay ₹{selected[plan]} & Book
              </button>
              <p className="text-center text-[11px] text-white/40">Payment is a demo — no real charge. Deposit is refunded on return.</p>
            </>
          )}
          {selected && step === "confirm" && (
            <div className="py-2 text-center">
              <DialogHeader><DialogTitle className="text-center text-xl">Booking confirmed 🎉</DialogTitle></DialogHeader>
              <p className="mt-2 text-sm text-white/55">Scan this QR at pickup and share the OTP with {selected.owner}.</p>
              <img alt="QR handover" className="mx-auto mt-5 rounded-2xl bg-white p-2" width="180" height="180"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=BIKEMATES-${selected.id}-${otp}`} />
              <div className="mx-auto mt-5 w-fit rounded-2xl border border-white/10 bg-white/5 px-8 py-4">
                <p className="text-xs text-white/50">Pickup OTP</p>
                <p className="text-3xl font-semibold tracking-[0.4em] text-primary">{otp}</p>
              </div>
              <button onClick={() => setSelected(null)} data-testid="close-confirm" className="mt-6 w-full rounded-full border border-white/20 py-3 text-sm font-semibold transition-colors hover:bg-white/5">Done</button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RentBike;
