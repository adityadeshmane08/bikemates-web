import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Upload, Check } from "lucide-react";
import { useStore } from "@/lib/store";
import { AppHeader } from "@/components/app/ui";
import { Field } from "@/components/site/form";

const ListBike = () => {
  const store = useStore();
  const nav = useNavigate();
  const [image, setImage] = useState("");
  const [data, setData] = useState({ name: "", type: "Scooter", fuel: "Petrol", transmission: "Automatic", year: "2023", seats: "2", hourly: "", daily: "", weekly: "", deposit: "", college: "", specsText: "" });

  const onChange = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }));
  const onPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();
    store.addBike({
      name: data.name, type: data.type, fuel: data.fuel, transmission: data.transmission,
      year: Number(data.year), seats: Number(data.seats), college: data.college,
      hourly: Number(data.hourly), daily: Number(data.daily), weekly: Number(data.weekly), deposit: Number(data.deposit),
      specs: data.specsText.split(",").map((s) => s.trim()).filter(Boolean),
      image: image || undefined,
    });
    toast.success("Bike listed! It's now visible to verified students.");
    nav("/app/my-bikes");
  };

  return (
    <div>
      <AppHeader title="List Bike for Rent" subtitle="Turn your idle bike into passive income. It only takes a minute." />
      <form onSubmit={submit} data-testid="list-bike-form" className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-3xl border border-white/10 bg-surface p-6">
            <h3 className="mb-4 font-semibold">Bike details</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Bike name / model" name="name" value={data.name} onChange={onChange} placeholder="e.g. Honda Activa 6G" testid="bike-name" />
              <Field label="Type" name="type" value={data.type} onChange={onChange} options={["Scooter", "Sports", "Cruiser", "Electric"]} testid="bike-type" />
              <Field label="Fuel" name="fuel" value={data.fuel} onChange={onChange} options={["Petrol", "Electric"]} testid="bike-fuel" />
              <Field label="Transmission" name="transmission" value={data.transmission} onChange={onChange} options={["Automatic", "Manual"]} testid="bike-transmission" />
              <Field label="Year" type="number" name="year" value={data.year} onChange={onChange} placeholder="2023" testid="bike-year" />
              <Field label="Seats" type="number" name="seats" value={data.seats} onChange={onChange} placeholder="2" testid="bike-seats" />
            </div>
            <div className="mt-5">
              <Field label="Your college / campus" name="college" value={data.college} onChange={onChange} placeholder="e.g. VIT Vellore" testid="bike-college" />
            </div>
            <div className="mt-5">
              <Field label="Highlights (comma separated)" name="specsText" value={data.specsText} onChange={onChange} placeholder="109cc, 50 km/l, LED headlamp" required={false} testid="bike-specs" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-surface p-6">
            <h3 className="mb-4 font-semibold">Pricing & deposit</h3>
            <div className="grid gap-5 sm:grid-cols-4">
              <Field label="Hourly ₹" type="number" name="hourly" value={data.hourly} onChange={onChange} placeholder="40" testid="bike-hourly" />
              <Field label="Daily ₹" type="number" name="daily" value={data.daily} onChange={onChange} placeholder="260" testid="bike-daily" />
              <Field label="Weekly ₹" type="number" name="weekly" value={data.weekly} onChange={onChange} placeholder="1500" testid="bike-weekly" />
              <Field label="Deposit ₹" type="number" name="deposit" value={data.deposit} onChange={onChange} placeholder="1000" testid="bike-deposit" />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-white/10 bg-surface p-6">
            <h3 className="mb-4 font-semibold">Photos</h3>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-6 text-center transition-colors hover:border-primary/50">
              {image ? (
                <img src={image} alt="Preview" className="h-40 w-full rounded-xl object-cover" />
              ) : (
                <>
                  <Upload className="h-7 w-7 text-primary" />
                  <p className="mt-3 text-sm font-medium">Upload bike photo</p>
                  <p className="mt-1 text-xs text-white/40">PNG or JPG, up to 5MB</p>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={onPhoto} data-testid="bike-photo" />
            </label>
            {image && <p className="mt-2 flex items-center gap-1 text-xs text-emerald-400"><Check className="h-3 w-3" /> Photo added</p>}
          </div>
          <div className="rounded-3xl border border-white/10 bg-surface p-6 text-sm text-white/55">
            <p className="font-semibold text-white">Included with every listing</p>
            <ul className="mt-3 space-y-2">
              {["Insurance coverage", "Refundable security deposit", "Live GPS tracking", "QR + OTP handover"].map((x) => (
                <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{x}</li>
              ))}
            </ul>
          </div>
          <button type="submit" data-testid="list-bike-submit" className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">Publish listing</button>
        </div>
      </form>
    </div>
  );
};

export default ListBike;
