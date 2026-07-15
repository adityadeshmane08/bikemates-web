import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useStore } from "@/lib/store";
import { AppHeader } from "@/components/app/ui";
import { Field } from "@/components/site/form";

const ShareRide = () => {
  const store = useStore();
  const nav = useNavigate();
  const [data, setData] = useState({ from: "", to: "", date: "Today", time: "", seats: "1", fuelSplit: "", vehicle: "", college: "", recurring: "One-time" });
  const onChange = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    store.addRide({
      from: data.from, to: data.to, date: data.date, time: data.time,
      seats: Number(data.seats), fuelSplit: Number(data.fuelSplit),
      vehicle: data.vehicle, college: data.college, recurring: data.recurring,
    });
    toast.success("Ride posted! Students on your route can now book a seat.");
    nav("/app/my-rides");
  };

  return (
    <div>
      <AppHeader title="List Route / Share Ride" subtitle="Post your commute, fill empty seats, and split the fuel with classmates." />
      <form onSubmit={submit} data-testid="share-ride-form" className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-3xl border border-white/10 bg-surface p-6">
            <h3 className="mb-4 font-semibold">Route</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Pickup point" name="from" value={data.from} onChange={onChange} placeholder="e.g. Main Campus Gate" testid="ride-from" />
              <Field label="Drop point" name="to" value={data.to} onChange={onChange} placeholder="e.g. Andheri Station" testid="ride-to" />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-surface p-6">
            <h3 className="mb-4 font-semibold">Schedule & seats</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Date" name="date" value={data.date} onChange={onChange} options={["Today", "Tomorrow", "This weekend"]} testid="ride-date" />
              <Field label="Time" name="time" value={data.time} onChange={onChange} placeholder="e.g. 5:30 PM" testid="ride-time" />
              <Field label="Seats available" name="seats" value={data.seats} onChange={onChange} options={["1", "2", "3"]} testid="ride-seats" />
              <Field label="Recurring" name="recurring" value={data.recurring} onChange={onChange} options={["One-time", "Daily (Mon–Fri)", "Daily (Mon–Sat)", "Weekends"]} testid="ride-recurring" />
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="rounded-3xl border border-white/10 bg-surface p-6">
            <h3 className="mb-4 font-semibold">Vehicle & fare</h3>
            <div className="space-y-5">
              <Field label="Your vehicle" name="vehicle" value={data.vehicle} onChange={onChange} placeholder="e.g. Honda Activa 6G" testid="ride-vehicle" />
              <Field label="Your college / campus" name="college" value={data.college} onChange={onChange} placeholder="e.g. IIT Bombay" testid="ride-college" />
              <Field label="Fuel split per seat ₹" type="number" name="fuelSplit" value={data.fuelSplit} onChange={onChange} placeholder="45" testid="ride-fuelsplit" />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-surface p-6 text-sm text-white/55">
            <p className="font-semibold text-white">Every ride includes</p>
            <ul className="mt-3 space-y-2">
              {["Verified passengers only", "Live GPS navigation", "In-app chat", "Emergency SOS"].map((x) => (
                <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{x}</li>
              ))}
            </ul>
          </div>
          <button type="submit" data-testid="share-ride-submit" className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">Post ride</button>
        </div>
      </form>
    </div>
  );
};

export default ShareRide;
