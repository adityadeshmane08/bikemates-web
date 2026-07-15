import React from "react";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { AppHeader } from "@/components/app/ui";

const REVIEWS = [
  { name: "Meera Iyer", bike: "Honda Activa 6G", rating: 5, date: "2 days ago", text: "Super smooth handover and the bike was spotless. Would rent again!" },
  { name: "Sahil Gupta", bike: "Royal Enfield Classic 350", rating: 5, date: "1 week ago", text: "Owner was flexible with timing and the bike rode like a dream." },
  { name: "Nikhil Raj", bike: "Yamaha FZ-S", rating: 4, date: "2 weeks ago", text: "Great experience overall. Fuel was a little low at pickup but sorted quickly." },
  { name: "Priya Nair", bike: "Honda Activa 6G", rating: 5, date: "3 weeks ago", text: "Cheapest and safest ride around campus. The OTP handover feels really secure." },
];

const dist = [5, 4, 3, 2, 1].map((s) => ({ s, n: REVIEWS.filter((r) => r.rating === s).length }));

const Reviews = () => {
  const avg = (REVIEWS.reduce((a, b) => a + b.rating, 0) / REVIEWS.length).toFixed(1);
  return (
    <div>
      <AppHeader title="Ratings & Reviews" subtitle="What renters are saying about you." />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-surface p-8 text-center">
          <p className="text-5xl font-semibold font-display">{avg}</p>
          <div className="mt-2 flex justify-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
          </div>
          <p className="mt-2 text-sm text-white/50">{REVIEWS.length} reviews</p>
          <div className="mt-6 space-y-2">
            {dist.map((d) => (
              <div key={d.s} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-white/50">{d.s}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-primary" style={{ width: `${(d.n / REVIEWS.length) * 100}%` }} /></div>
                <span className="w-4 text-right text-white/40">{d.n}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 lg:col-span-2">
          {REVIEWS.map((r, i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-surface p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">{r.name[0]}</span>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="text-xs text-white/45">{r.bike} • {r.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className={`h-3.5 w-3.5 ${j < r.rating ? "fill-primary text-primary" : "text-white/20"}`} />)}
                </div>
              </div>
              <p className="mt-3 text-sm text-white/70">{r.text}</p>
              <button onClick={() => toast.success("Reply sent")} className="mt-3 text-xs font-semibold text-primary hover:underline">Reply</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
