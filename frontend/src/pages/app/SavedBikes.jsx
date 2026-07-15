import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Heart, Star, MapPin } from "lucide-react";
import { useStore } from "@/lib/store";
import { AppHeader, EmptyState } from "@/components/app/ui";
import { CTAButton } from "@/components/site/primitives";

const SavedBikes = () => {
  const store = useStore();
  const nav = useNavigate();
  const [saved, setSaved] = useState(() => store.bikes.filter((b) => !b.mine).slice(0, 3).map((b) => b.id));
  const bikes = store.bikes.filter((b) => saved.includes(b.id));

  const remove = (id) => { setSaved((s) => s.filter((x) => x !== id)); toast("Removed from saved bikes"); };

  if (bikes.length === 0) {
    return (
      <div>
        <AppHeader title="Saved Bikes" subtitle="Your favourite bikes, one tap away." />
        <EmptyState icon="Heart" title="No saved bikes" text="Tap the heart on any bike to save it for later."
          action={<CTAButton to="/app/rent-bike" testid="empty-saved">Browse Bikes</CTAButton>} />
      </div>
    );
  }

  return (
    <div>
      <AppHeader title="Saved Bikes" subtitle="Your favourite bikes, one tap away." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bikes.map((b) => (
          <div key={b.id} className="group overflow-hidden rounded-3xl border border-white/10 bg-surface transition-transform duration-300 hover:-translate-y-1.5">
            <div className="relative h-44 overflow-hidden">
              <img src={b.image} alt={b.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <button onClick={() => remove(b.id)} data-testid={`unsave-${b.id}`} className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur transition-colors hover:bg-black/80">
                <Heart className="h-4 w-4 fill-primary text-primary" />
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-semibold">{b.name}</h3>
              <p className="mt-0.5 text-xs text-white/50">{b.owner} • {b.college}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-white/50">
                <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-primary text-primary" />{b.rating}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{b.distance} km</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-primary">₹{b.daily}<span className="text-xs text-white/45">/day</span></span>
                <button onClick={() => nav("/app/rent-bike")} className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">Book</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedBikes;
