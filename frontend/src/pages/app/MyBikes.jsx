import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Star, Check, X, Trash2, MapPin as MapPinIcon, ShieldAlert } from "lucide-react";
import { useStore } from "@/lib/store";
import { AppHeader, EmptyState, StatusBadge } from "@/components/app/ui";
import { CTAButton } from "@/components/site/primitives";
import { MapView } from "@/components/site/MapView";
import { coordsFromDistance } from "@/lib/geo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const REQUESTS = [
  { name: "Meera Iyer", when: "Tomorrow, 2 days", amount: 520 },
  { name: "Sahil Gupta", when: "This weekend", amount: 1500 },
];

// Owner's own bikes often have distance: 0 (no "distance from me" makes sense for your own bike),
// so we derive a stable pretend-location from the bike id instead, purely for map display.
const mapDistanceFor = (b) => (b.distance > 0 ? b.distance : (parseInt(b.id.replace(/\D/g, ""), 10) % 25) / 10 + 0.3);

const MyBikes = () => {
  const store = useStore();
  const nav = useNavigate();
  const [view, setView] = useState("list"); // list | map
  const [geoBike, setGeoBike] = useState(null);
  const [radius, setRadius] = useState(500);

  if (store.myBikes.length === 0) {
    return (
      <div>
        <AppHeader title="My Bikes" subtitle="Manage the bikes you've listed for rent." />
        <EmptyState icon="Bike" title="No bikes listed yet" text="List your first bike and start earning from idle hours on campus."
          action={<CTAButton to="/app/list-bike" testid="empty-list-bike">List a Bike</CTAButton>} />
      </div>
    );
  }

  const openGeofence = (b) => {
    setGeoBike(b);
    setRadius(b.geofence?.radiusM || 500);
  };

  const saveGeofence = (enabled) => {
    store.setGeofence(geoBike.id, { enabled, radiusM: radius, breached: enabled && geoBike.id === store.myBikes[0]?.id });
    toast.success(enabled ? "Geofence activated for this bike." : "Geofence turned off.");
    setGeoBike(null);
  };

  return (
    <div>
      <AppHeader title="My Bikes" subtitle="Manage listings, requests, live location and earnings."
        action={<button onClick={() => nav("/app/list-bike")} data-testid="add-bike-btn" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">+ List new bike</button>} />

      <div className="mb-6 flex items-center gap-2">
        <button onClick={() => setView("list")} className={`rounded-full border px-4 py-2 text-xs font-semibold ${view === "list" ? "border-primary bg-primary/15 text-primary" : "border-white/10 text-white/60"}`}>List</button>
        <button onClick={() => setView("map")} className={`rounded-full border px-4 py-2 text-xs font-semibold ${view === "map" ? "border-primary bg-primary/15 text-primary" : "border-white/10 text-white/60"}`}>Fleet Map</button>
      </div>

      {view === "map" && (
        <div className="mb-8" style={{ height: "55vh" }}>
          <MapView
            height="100%"
            markers={store.myBikes.map((b) => ({ id: b.id, ...coordsFromDistance(b.id, mapDistanceFor(b)), color: b.available ? "#22C55E" : "#FF4B00" }))}
          />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {store.myBikes.map((b) => (
          <div key={b.id} className="overflow-hidden rounded-3xl border border-white/10 bg-surface">
            <div className="flex gap-4 p-5">
              <img src={b.image} alt={b.name} className="h-24 w-32 rounded-2xl object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold">{b.name}</h3>
                  <StatusBadge color={b.available ? "emerald" : "gray"}>{b.available ? "Available" : "Rented"}</StatusBadge>
                </div>
                <p className="mt-1 text-xs text-white/50">{b.type} • {b.fuel} • {b.transmission}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-white/50">
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-primary text-primary" />{b.rating}</span>
                  <span>{b.trips} trips</span>
                  <span className="text-primary font-semibold">₹{b.daily}/day</span>
                </div>
                {b.geofence?.enabled && (
                  <span className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${b.geofence.breached ? "bg-red-500/15 text-red-400" : "bg-emerald-500/15 text-emerald-400"}`}>
                    <ShieldAlert className="h-3 w-3" /> {b.geofence.breached ? "Outside geofence" : "Within geofence"}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-white/10 px-5 py-4">
              <button onClick={() => store.toggleBikeAvailability(b.id)} className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold transition-colors hover:bg-white/5">
                Mark as {b.available ? "Rented" : "Available"}
              </button>
              <button onClick={() => openGeofence(b)} className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold transition-colors hover:bg-white/5">
                <MapPinIcon className="h-3.5 w-3.5" /> Geofence
              </button>
              <button
                onClick={() => { if (window.confirm(`Remove ${b.name} from your listings?`)) { store.deleteBike(b.id); toast(`${b.name} removed.`); } }}
                className="flex items-center gap-1.5 rounded-full border border-red-500/25 px-3.5 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
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

      <Dialog open={!!geoBike} onOpenChange={(o) => !o && setGeoBike(null)}>
        <DialogContent className="max-w-lg border-white/10 bg-surface text-white">
          {geoBike && (
            <>
              <DialogHeader><DialogTitle className="text-xl">Geofence — {geoBike.name}</DialogTitle></DialogHeader>
              <p className="text-sm text-white/55">Get alerted if this bike moves outside a set radius from its listed pickup point.</p>
              <div style={{ height: "260px" }}>
                <MapView
                  height="100%"
                  zoom={14}
                  center={coordsFromDistance(geoBike.id, mapDistanceFor(geoBike))}
                  markers={[{ id: geoBike.id, ...coordsFromDistance(geoBike.id, mapDistanceFor(geoBike)), color: "#FF4B00" }]}
                  circle={{ ...coordsFromDistance(geoBike.id, mapDistanceFor(geoBike)), radiusM: radius, breached: false }}
                />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Radius</span>
                  <span className="font-semibold">{radius} m</span>
                </div>
                <input type="range" min="100" max="2000" step="50" value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="mt-2 w-full accent-primary" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => saveGeofence(true)} className="flex-1 rounded-full bg-primary py-3 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">
                  {geoBike.geofence?.enabled ? "Update Geofence" : "Activate Geofence"}
                </button>
                {geoBike.geofence?.enabled && (
                  <button onClick={() => saveGeofence(false)} className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold transition-colors hover:bg-white/5">Turn off</button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyBikes;
