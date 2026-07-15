import React, { useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppHeader } from "@/components/app/ui";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const AvailabilityCalendar = () => {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [booked, setBooked] = useState([today.getDate() + 2, today.getDate() + 3, today.getDate() + 8]);
  const [blocked, setBlocked] = useState([today.getDate() + 5]);

  const y = cursor.getFullYear(), m = cursor.getMonth();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const isThisMonth = y === today.getFullYear() && m === today.getMonth();

  const toggle = (d) => {
    if (booked.includes(d)) return toast("This day has a confirmed booking.");
    setBlocked((b) => b.includes(d) ? b.filter((x) => x !== d) : [...b, d]);
    toast.success(blocked.includes(d) ? "Day marked available" : "Day blocked");
  };

  return (
    <div>
      <AppHeader title="Availability Calendar" subtitle="Tap a date to block or open it for rentals." />
      <div className="max-w-md rounded-3xl border border-white/10 bg-surface p-6">
        <div className="mb-6 flex items-center justify-between">
          <button onClick={() => setCursor(new Date(y, m - 1, 1))} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 hover:bg-white/5"><ChevronLeft className="h-4 w-4" /></button>
          <p className="font-semibold">{MONTHS[m]} {y}</p>
          <button onClick={() => setCursor(new Date(y, m + 1, 1))} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 hover:bg-white/5"><ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-white/40">
          {DAYS.map((d) => <div key={d} className="py-1">{d}</div>)}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {Array.from({ length: first }).map((_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: days }).map((_, i) => {
            const d = i + 1;
            const isBooked = booked.includes(d), isBlocked = blocked.includes(d);
            const isToday = isThisMonth && d === today.getDate();
            return (
              <button key={d} onClick={() => toggle(d)} data-testid={`cal-day-${d}`}
                className={`flex aspect-square items-center justify-center rounded-xl text-sm transition-colors ${isBooked ? "bg-primary text-white" : isBlocked ? "bg-white/5 text-white/25 line-through" : "hover:bg-white/10 text-white/80"} ${isToday ? "ring-1 ring-primary" : ""}`}>
                {d}
              </button>
            );
          })}
        </div>
        <div className="mt-6 flex gap-4 text-xs text-white/55">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-primary" /> Booked</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-white/10" /> Blocked</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded ring-1 ring-primary" /> Today</span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
