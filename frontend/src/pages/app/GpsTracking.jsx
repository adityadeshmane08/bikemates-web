import React, { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { Clock, Siren, Phone } from "lucide-react";
import { AppHeader } from "@/components/app/ui";
import { MapView } from "@/components/site/MapView";
import { coordsFromDistance, routeBetween } from "@/lib/geo";

const GpsTracking = () => {
  const start = useMemo(() => coordsFromDistance("gps-start", 1.4), []);
  const end = useMemo(() => coordsFromDistance("gps-end", 3.6), []);
  const route = useMemo(() => routeBetween(start, end, 30), [start, end]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % route.length);
    }, 400);
    return () => clearInterval(id);
  }, [route.length]);

  const live = route[step];
  const remainingKm = (((route.length - step) / route.length) * 2.4).toFixed(1);
  const etaMin = Math.max(1, Math.round(((route.length - step) / route.length) * 8));

  return (
    <div>
      <AppHeader title="Live GPS Tracking" subtitle="Track your active trip in real time." />
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map */}
        <div className="relative lg:col-span-2" style={{ height: "60vh" }}>
          <MapView markers={[{ id: "start", ...start, color: "#22C55E" }, { id: "end", ...end, color: "#FF4B00" }]} route={route} liveMarker={live} center={live} zoom={14} height="100%" />
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl glass px-5 py-3">
            <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-primary" /><span className="font-semibold">ETA {etaMin} min</span></div>
            <span className="text-sm text-white/60">{remainingKm} km to destination</span>
          </div>
        </div>
        {/* Trip info */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-surface p-6">
            <h3 className="font-semibold">Current trip</h3>
            <div className="mt-4 flex items-center gap-3 text-sm">
              <div className="flex flex-col items-center pt-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="my-1 h-8 w-px bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-primary" />
              </div>
              <div className="flex-1 space-y-5">
                <div><p className="text-xs text-white/45">Pickup</p><p className="font-medium">Main Campus Gate</p></div>
                <div><p className="text-xs text-white/45">Drop</p><p className="font-medium">Andheri Station</p></div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-surface p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">R</span>
              <div><p className="text-sm font-semibold">Rohan Mehta</p><p className="text-xs text-white/45">Honda Activa 6G • MH 04 2231</p></div>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => toast("Calling rider…")} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 py-2.5 text-sm font-semibold transition-colors hover:bg-white/5"><Phone className="h-4 w-4" />Call</button>
              <button onClick={() => toast.error("SOS activated — sharing live location with your contacts and safety team.")} data-testid="sos-btn" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-red-500/90 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95"><Siren className="h-4 w-4" />SOS</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GpsTracking;
