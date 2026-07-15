import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import { AppHeader } from "@/components/app/ui";
import { Switch } from "@/components/ui/switch";

const TOGGLES = [
  { key: "push", label: "Push notifications", desc: "Booking updates, requests and reminders." },
  { key: "email", label: "Email updates", desc: "Newsletter, offers and campus news." },
  { key: "location", label: "Live location sharing", desc: "Share location during active trips for safety." },
  { key: "sos", label: "Emergency SOS contacts", desc: "Alert your contacts with one tap during rides." },
];

const Settings = () => {
  const store = useStore();
  const nav = useNavigate();
  const [state, setState] = useState({ push: true, email: false, location: true, sos: true });

  const toggle = (k) => { setState((s) => ({ ...s, [k]: !s[k] })); toast.success("Preference updated"); };
  const resetDemo = () => { store.reset(); toast.success("Demo data reset"); nav("/dashboard"); };

  return (
    <div>
      <AppHeader title="Settings" subtitle="Control your preferences and app data." />
      <div className="max-w-2xl space-y-6">
        <div className="rounded-3xl border border-white/10 bg-surface p-6">
          <h3 className="mb-2 font-semibold">Preferences</h3>
          <div className="divide-y divide-white/5">
            {TOGGLES.map((t) => (
              <div key={t.key} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-xs text-white/45">{t.desc}</p>
                </div>
                <Switch checked={state[t.key]} onCheckedChange={() => toggle(t.key)} data-testid={`toggle-${t.key}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
          <h3 className="font-semibold text-red-300">Danger zone</h3>
          <p className="mt-1 text-sm text-white/55">Reset all demo listings, bookings and wallet activity to the original sample data.</p>
          <button onClick={resetDemo} data-testid="reset-demo" className="mt-4 rounded-full border border-red-500/40 px-5 py-2.5 text-sm font-semibold text-red-300 transition-colors hover:bg-red-500/10">Reset demo data</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
