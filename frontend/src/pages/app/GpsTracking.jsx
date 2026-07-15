import React from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Navigation, Clock, MapPin, Siren, Phone } from "lucide-react";
import { AppHeader } from "@/components/app/ui";

const GpsTracking = () => (
  <div>
    <AppHeader title="Live GPS Tracking" subtitle="Track your active trip in real time." />
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Map */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface lg:col-span-2" style={{ height: "60vh" }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path d="M 60 400 C 180 300, 240 260, 320 220 S 520 120, 640 90" fill="none" stroke="#FF4B00" strokeWidth="4" strokeDasharray="10 8" opacity="0.8" />
        </svg>
        <span className="absolute left-[55px] top-[390px] flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400"><span className="absolute h-4 w-4 animate-ping rounded-full bg-emerald-400/60" /></span>
        <motion.span
          className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-lg"
          initial={{ left: 55, top: 385 }}
          animate={{ left: [55, 315, 630], top: [385, 210, 80] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <Navigation className="h-4 w-4" />
        </motion.span>
        <span className="absolute right-[45px] top-[70px] flex h-4 w-4 items-center justify-center rounded-full bg-primary" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl glass px-5 py-3">
          <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-primary" /><span className="font-semibold">ETA 8 min</span></div>
          <span className="text-sm text-white/60">2.4 km to destination</span>
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

export default GpsTracking;
