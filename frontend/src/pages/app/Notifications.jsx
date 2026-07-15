import React from "react";
import { useStore } from "@/lib/store";
import { AppHeader } from "@/components/app/ui";
import { Icon } from "@/components/site/primitives";

const NOTES = [
  { icon: "CheckCircle2", color: "#22C55E", title: "Booking confirmed", text: "Your rental of Honda Activa 6G is confirmed. OTP shared.", time: "2m ago" },
  { icon: "Wallet", color: "#FF4B00", title: "Wallet credited", text: "₹500 has been added to your Bikemates wallet.", time: "1h ago" },
  { icon: "Star", color: "#3B82F6", title: "New review", text: "Rohan gave you a 5-star rating. Nice riding!", time: "3h ago" },
  { icon: "Users", color: "#A855F7", title: "Seat request", text: "Meera requested a seat on your morning route.", time: "5h ago" },
  { icon: "ShieldCheck", color: "#22C55E", title: "Verification complete", text: "Your driving licence has been verified.", time: "1d ago" },
];

const Notifications = () => {
  useStore();
  return (
    <div>
      <AppHeader title="Notifications" subtitle="Stay on top of bookings, requests and rewards." />
      <div className="space-y-3">
        {NOTES.map((n, i) => (
          <div key={i} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-surface p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${n.color}1f`, color: n.color }}><Icon name={n.icon} className="h-5 w-5" /></span>
            <div className="flex-1">
              <div className="flex items-center justify-between"><p className="font-medium">{n.title}</p><span className="text-xs text-white/40">{n.time}</span></div>
              <p className="mt-1 text-sm text-white/55">{n.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
