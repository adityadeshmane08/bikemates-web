import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Star, Search, Clock, Users, ArrowRight, Navigation, List, Map as MapIcon,
  ShieldCheck, SlidersHorizontal, ArrowUpDown, MapPin, Bell, MessageCircle,
  Share2, ChevronDown, Check, Route as RouteIcon, X, Locate,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { AppHeader, EmptyState, Chip } from "@/components/app/ui";
import { MapView } from "@/components/site/MapView";
import { coordsFromDistance, haversineKm, CENTER } from "@/lib/geo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// ============================================================
// Matching / calculation helpers — deterministic, derived from
// real fields on the ride + what the user actually typed/picked.
// No random numbers, no fabricated "AI" score.
// ============================================================

const parseTimeToMinutes = (t) => {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec((t || "").trim());
  if (!m) return null;
  let [, h, min, ap] = m;
  h = Number(h) % 12;
  if (/pm/i.test(ap)) h += 12;
  return h * 60 + Number(min);
};

const includesLoose = (haystack, needle) => {
  if (!needle) return false;
  return (haystack || "").toLowerCase().includes(needle.trim().toLowerCase());
};

// A ride's demo pickup coordinate — same deterministic pattern already
// used elsewhere in the app (bike distances, GPS tracking) rather than
// inventing a new fake-geo pattern. Swap for real geocoding later.
const ridePickupCoords = (ride) => coordsFromDistance(ride.id, (ride.fuelSplit % 5) + 0.5);
const userPickupCoords = (pickupText) => (pickupText ? coordsFromDistance("user:" + pickupText, 0.3) : CENTER);

const pickupDistanceKm = (ride, criteria) => haversineKm(userPickupCoords(criteria.pickup), ridePickupCoords(ride));

const formatDistance = (km) => (km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`);

// Route "distance" between the ride's own from/to — reused for the
// route summary shown on the card/details (same deterministic model).
const routeDistanceKm = (ride) => haversineKm(coordsFromDistance(ride.id + ":from", 1), coordsFromDistance(ride.id + ":to", 1 + (ride.fuelSplit % 6)));
const estimateDurationMin = (km) => Math.max(6, Math.round((km / 28) * 60)); // ~28 km/h avg city two-wheeler speed
const estimateTripCost = (ride) => ride.fuelSplit * ride.seatsTotal;

const computeMatch = (ride, criteria) => {
  let score = 0;
  const reasons = [];

  if (criteria.destination && includesLoose(ride.to, criteria.destination)) { score += 40; reasons.push("Same route"); }
  else if (criteria.destination && includesLoose(ride.to, criteria.destination.split(" ")[0])) { score += 20; reasons.push("Near your route"); }

  if (criteria.pickup && includesLoose(ride.from, criteria.pickup)) { score += 25; }

  const km = pickupDistanceKm(ride, criteria);
  if (km <= 0.3) { score += 20; reasons.push(`${formatDistance(km)} from your pickup`); }
  else if (km <= 1) { score += 10; reasons.push(`${formatDistance(km)} from your pickup`); }
  else { reasons.push(`${formatDistance(km)} from your pickup`); }

  if (criteria.time) {
    const target = parseTimeToMinutes(criteria.time);
    const rideMin = parseTimeToMinutes(ride.time);
    if (target != null && rideMin != null) {
      const diff = Math.abs(target - rideMin);
      if (diff <= 15) { score += 15; reasons.push(diff === 0 ? "Exact time match" : `${diff} min from your preferred time`); }
      else if (diff <= 30) { score += 8; reasons.push(`${diff} min from your preferred time`); }
    }
  }

  if (criteria.date && ride.date.toLowerCase() === criteria.date.toLowerCase()) score += 10;

  return { score: Math.min(100, score), reasons: reasons.slice(0, 3) };
};

const SORT_OPTIONS = [
  { id: "match", label: "Best match" },
  { id: "soonest", label: "Soonest departure" },
  { id: "cheapest", label: "Lowest contribution" },
  { id: "closest", label: "Closest pickup" },
];

const VEHICLE_TYPES = ["Scooter", "Motorcycle", "Other"];

// ============================================================
// Sub-components (kept in this file — matches existing app pattern
// of colocating page-specific pieces rather than fragmenting files)
// ============================================================

const TrustLine = ({ ride }) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/55">
    {ride.trips > 0 ? (
      <>
        <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-primary text-primary" />{ride.rating}</span>
        <span>{ride.trips} rides</span>
      </>
    ) : (
      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/60">New rider</span>
    )}
    {ride.verified && <span className="flex items-center gap-1 text-emerald-400"><ShieldCheck className="h-3 w-3" />Verified</span>}
  </div>
);

const RideCard = ({ ride, criteria, match, onView }) => {
  const km = pickupDistanceKm(ride, criteria);
  const routeKm = routeDistanceKm(ride);
  return (
    <div data-testid={`ride-card-${ride.id}`} className="rounded-3xl border border-white/10 bg-surface p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">{ride.driver[0]}</span>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold">{ride.driver}</p>
              {ride.verified && <Check className="h-3.5 w-3.5 text-emerald-400" />}
            </div>
            <TrustLine ride={ride} />
          </div>
        </div>
        {match.score >= 70 && (
          <span className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
            {match.score >= 90 ? "Best Match" : `${match.score}% Match`}
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="font-medium">{ride.from}</span>
        <ArrowRight className="h-4 w-4 text-primary" />
        <span className="font-medium">{ride.to}</span>
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-white/50">
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{ride.date} • {ride.time}</span>
        <span>{routeKm.toFixed(1)} km • ~{estimateDurationMin(routeKm)} min</span>
      </div>

      {match.reasons.length > 0 && (
        <ul className="mt-3 space-y-1">
          {match.reasons.map((r) => (
            <li key={r} className="flex items-center gap-1.5 text-xs text-white/60"><Check className="h-3 w-3 text-emerald-400" />{r}</li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
        <div className="text-xs text-white/50">
          <p className="font-medium text-white/75">{ride.vehicle}</p>
          <p><Users className="mr-1 inline h-3 w-3" />{ride.seats}/{ride.seatsTotal} seat{ride.seatsTotal > 1 ? "s" : ""} left</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-emerald-400">₹{ride.fuelSplit}</p>
          <p className="text-[11px] text-white/45">Suggested contribution</p>
        </div>
      </div>

      <button
        disabled={ride.seats === 0 || ride.mine}
        onClick={() => onView(ride)}
        data-testid={`view-ride-${ride.id}`}
        className="mt-4 w-full rounded-full border border-white/15 py-2.5 text-xs font-semibold transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {ride.mine ? "Your ride" : ride.seats === 0 ? "Full" : "View ride"}
      </button>
    </div>
  );
};

const BookRide = () => {
  const store = useStore();

  const [criteria, setCriteria] = useState({ pickup: "", destination: "", date: "Today", time: "", flex: "Anytime" });
  const [searched, setSearched] = useState(false);
  const [view, setView] = useState("list");
  const [sort, setSort] = useState("match");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({ verifiedOnly: true, vehicleTypes: [], maxDistanceKm: null });

  const [selected, setSelected] = useState(null);
  const [stage, setStage] = useState("details"); // details | confirm | success
  const [submitting, setSubmitting] = useState(false);

  const upcoming = (store.bookings || []).find((b) => b.kind === "ride" && b.status === "Confirmed");

  const matched = useMemo(() => {
    return store.rides
      .filter((r) => !r.mine)
      .filter((r) => (filters.verifiedOnly ? r.verified : true))
      .filter((r) => (filters.vehicleTypes.length ? filters.vehicleTypes.some((t) => r.vehicle.toLowerCase().includes(t.toLowerCase())) : true))
      .filter((r) => (filters.maxDistanceKm ? pickupDistanceKm(r, criteria) <= filters.maxDistanceKm : true))
      .map((r) => ({ ride: r, match: computeMatch(r, criteria) }));
  }, [store.rides, criteria, filters]);

  const sorted = useMemo(() => {
    const list = [...matched];
    if (sort === "match") list.sort((a, b) => b.match.score - a.match.score);
    if (sort === "soonest") list.sort((a, b) => (parseTimeToMinutes(a.ride.time) ?? 999) - (parseTimeToMinutes(b.ride.time) ?? 999));
    if (sort === "cheapest") list.sort((a, b) => a.ride.fuelSplit - b.ride.fuelSplit);
    if (sort === "closest") list.sort((a, b) => pickupDistanceKm(a.ride, criteria) - pickupDistanceKm(b.ride, criteria));
    return list;
  }, [matched, sort, criteria]);

  const useMyLocation = () => {
    if (!navigator.geolocation) { toast.error("Location isn't available on this device."); return; }
    navigator.geolocation.getCurrentPosition(
      () => { setCriteria((c) => ({ ...c, pickup: "Current location" })); toast.success("Using your current location as pickup."); },
      () => toast.error("Couldn't access your location — enter it manually."),
    );
  };

  const findRides = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  const openDetails = (ride) => { setSelected(ride); setStage("details"); };

  const confirmBooking = () => {
    if (submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      store.bookRide(selected);
      setSubmitting(false);
      setStage("success");
    }, 500);
  };

  const shareTrip = () => {
    const text = `Riding with ${selected.driver} — ${selected.from} → ${selected.to}, ${selected.date} ${selected.time}.`;
    if (navigator.share) navigator.share({ title: "My BikeMates ride", text }).catch(() => {});
    else { navigator.clipboard?.writeText(text); toast.success("Trip details copied to clipboard."); }
  };

  const expandFlex = () => setFilters((f) => ({ ...f, maxDistanceKm: null }));
  const createAlert = () => {
    store.addRideAlert({ ...criteria });
    toast.success("Ride alert saved. We'll flag it here when a compatible ride appears.");
  };

  return (
    <div>
      <AppHeader title="Find a Ride" subtitle="Going somewhere? Find a verified rider heading your way." />

      {upcoming && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary/25 bg-primary/10 px-5 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Upcoming ride</p>
            <p className="mt-1 text-sm font-medium">{upcoming.title}</p>
            <p className="text-xs text-white/55">{upcoming.date} • {upcoming.sub}</p>
          </div>
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">Confirmed</span>
        </div>
      )}

      {/* SEARCH CARD */}
      <form onSubmit={findRides} className="mb-8 rounded-3xl border border-white/10 bg-surface p-5 sm:p-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-white/50">Where are you going?</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input data-testid="ride-pickup" value={criteria.pickup} onChange={(e) => setCriteria((c) => ({ ...c, pickup: e.target.value }))}
              placeholder="Search pickup location" className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-11 text-sm placeholder:text-white/40 focus:border-primary focus:outline-none" />
            <button type="button" onClick={useMyLocation} data-testid="use-current-location" title="Use current location" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-primary">
              <Locate className="h-4 w-4" />
            </button>
          </div>
          <div className="relative">
            <RouteIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input data-testid="ride-destination" value={criteria.destination} onChange={(e) => setCriteria((c) => ({ ...c, destination: e.target.value }))}
              placeholder="Search destination" className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm placeholder:text-white/40 focus:border-primary focus:outline-none" />
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <select value={criteria.date} onChange={(e) => setCriteria((c) => ({ ...c, date: e.target.value }))} data-testid="ride-date"
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm focus:border-primary focus:outline-none">
            <option>Today</option><option>Tomorrow</option>
          </select>
          <input type="text" value={criteria.time} onChange={(e) => setCriteria((c) => ({ ...c, time: e.target.value }))} placeholder="Departure e.g. 5:30 PM" data-testid="ride-time"
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm placeholder:text-white/40 focus:border-primary focus:outline-none" />
          <select value={criteria.flex} onChange={(e) => setCriteria((c) => ({ ...c, flex: e.target.value }))} data-testid="ride-flex"
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm focus:border-primary focus:outline-none">
            <option>Anytime</option><option>±15 min</option><option>±30 min</option>
          </select>
        </div>

        <button type="submit" data-testid="find-rides" className="mt-4 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300] sm:w-auto sm:px-10">
          Find rides
        </button>
      </form>

      {!searched ? null : (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Best matches for you</h2>
              <p className="text-xs text-white/50">{sorted.length} ride{sorted.length === 1 ? "" : "s"} found</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => setView("list")} className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold ${view === "list" ? "border-primary bg-primary/15 text-primary" : "border-white/10 text-white/60"}`}><List className="h-3.5 w-3.5" /> List</button>
              <button onClick={() => setView("map")} className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold ${view === "map" ? "border-primary bg-primary/15 text-primary" : "border-white/10 text-white/60"}`}><MapIcon className="h-3.5 w-3.5" /> Map</button>
              <button onClick={() => setFiltersOpen(true)} data-testid="open-filters" className="flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/60 hover:text-white"><SlidersHorizontal className="h-3.5 w-3.5" /> Filters</button>
              <div className="relative">
                <select value={sort} onChange={(e) => setSort(e.target.value)} data-testid="sort-rides"
                  className="appearance-none rounded-full border border-white/10 bg-transparent py-2 pl-4 pr-9 text-xs font-semibold text-white/60 focus:text-white focus:outline-none">
                  {SORT_OPTIONS.map((o) => <option key={o.id} value={o.id} className="bg-surface">{o.label}</option>)}
                </select>
                <ArrowUpDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
              </div>
            </div>
          </div>

          {view === "map" && (
            <div className="mb-6" style={{ height: "50vh" }}>
              <MapView
                height="100%"
                markers={sorted.map(({ ride }) => ({ id: ride.id, ...ridePickupCoords(ride), color: "#A855F7" }))}
                onMarkerClick={(m) => { const found = sorted.find((x) => x.ride.id === m.id); if (found) openDetails(found.ride); }}
              />
            </div>
          )}

          {sorted.length === 0 ? (
            <EmptyState
              icon="SearchX"
              title="No matching rides yet"
              text="We couldn't find a ride matching your route and time."
              action={
                <div className="flex flex-wrap justify-center gap-2">
                  <button onClick={expandFlex} className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold hover:bg-white/5">Expand pickup distance</button>
                  <button onClick={createAlert} data-testid="create-ride-alert" className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-[#E64300]"><Bell className="h-3.5 w-3.5" />Create ride alert</button>
                </div>
              }
            />
          ) : (
            <div className="space-y-4">
              {sorted.map(({ ride, match }) => (
                <RideCard key={ride.id} ride={ride} criteria={criteria} match={match} onView={openDetails} />
              ))}
            </div>
          )}
        </>
      )}

      {/* FILTERS SHEET */}
      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogContent className="max-w-md border-white/10 bg-surface text-white">
          <DialogHeader><DialogTitle>Filters</DialogTitle></DialogHeader>
          <div className="space-y-5">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/50">Verification</p>
              <Chip active={filters.verifiedOnly} onClick={() => setFilters((f) => ({ ...f, verifiedOnly: !f.verifiedOnly }))} testid="filter-verified">✓ Verified users only</Chip>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/50">Pickup distance</p>
              <div className="flex flex-wrap gap-2">
                {[{ l: "Any", v: null }, { l: "250 m", v: 0.25 }, { l: "500 m", v: 0.5 }, { l: "1 km", v: 1 }].map((o) => (
                  <Chip key={o.l} active={filters.maxDistanceKm === o.v} onClick={() => setFilters((f) => ({ ...f, maxDistanceKm: o.v }))}>{o.l}</Chip>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/50">Vehicle type</p>
              <div className="flex flex-wrap gap-2">
                {VEHICLE_TYPES.map((t) => (
                  <Chip key={t} active={filters.vehicleTypes.includes(t)} onClick={() => setFilters((f) => ({ ...f, vehicleTypes: f.vehicleTypes.includes(t) ? f.vehicleTypes.filter((x) => x !== t) : [...f.vehicleTypes, t] }))}>{t}</Chip>
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => setFiltersOpen(false)} className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-semibold text-white hover:bg-[#E64300]">
            Show {sorted.length} ride{sorted.length === 1 ? "" : "s"}
          </button>
        </DialogContent>
      </Dialog>

      {/* RIDE DETAILS / CONFIRM / SUCCESS */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg border-white/10 bg-surface text-white">
          {selected && stage === "details" && (
            <>
              <DialogHeader><DialogTitle className="text-xl">Ride details</DialogTitle></DialogHeader>
              {(() => {
                const match = computeMatch(selected, criteria);
                const routeKm = routeDistanceKm(selected);
                return (
                  <div className="space-y-4">
                    {match.score >= 50 && (
                      <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
                        {match.score >= 90 ? "Best Match" : `${match.score}% Match`}
                      </span>
                    )}
                    {match.reasons.map((r) => (
                      <p key={r} className="flex items-center gap-1.5 text-xs text-white/60"><Check className="h-3 w-3 text-emerald-400" />{r}</p>
                    ))}

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-lg font-semibold text-primary">{selected.driver[0]}</span>
                      <div>
                        <p className="flex items-center gap-1.5 font-semibold">{selected.driver}{selected.verified && <Check className="h-3.5 w-3.5 text-emerald-400" />}</p>
                        <TrustLine ride={selected} />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-4">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex flex-col items-center pt-1">
                          <span className="h-2 w-2 rounded-full bg-primary" />
                          <span className="my-1 h-8 w-px bg-white/20" />
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        </div>
                        <div className="flex-1 space-y-5">
                          <div><p className="text-xs text-white/45">Pickup</p><p className="font-medium">{selected.from}</p></div>
                          <div><p className="text-xs text-white/45">Destination</p><p className="font-medium">{selected.to}</p></div>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 text-xs text-white/55">
                        <span>Distance: {routeKm.toFixed(1)} km</span>
                        <span>Duration: ~{estimateDurationMin(routeKm)} min</span>
                        <span>Departure: {selected.date} • {selected.time}</span>
                        <span>{formatDistance(pickupDistanceKm(selected, criteria))} from your pickup</span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-4 text-sm">
                      <p className="font-medium">{selected.vehicle}</p>
                      <p className="mt-1 text-xs text-white/55">{selected.seats} passenger seat{selected.seats > 1 ? "s" : ""} available</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/50">Safety & trust</p>
                      <div className="space-y-1.5 text-xs text-white/60">
                        <p className="flex items-center gap-1.5"><Check className="h-3 w-3 text-emerald-400" />Identity verified</p>
                        <p className="flex items-center gap-1.5"><Check className="h-3 w-3 text-emerald-400" />In-app chat available</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div>
                        <p className="text-xs text-white/45">Suggested contribution</p>
                        <p className="text-xl font-semibold text-emerald-400">₹{selected.fuelSplit}</p>
                      </div>
                      <p className="text-xs text-white/40">Est. trip cost ₹{estimateTripCost(selected)}</p>
                    </div>

                    <button onClick={() => setStage("confirm")} data-testid="proceed-to-confirm" className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">
                      Book seat — ₹{selected.fuelSplit}
                    </button>
                  </div>
                );
              })()}
            </>
          )}

          {selected && stage === "confirm" && (
            <>
              <DialogHeader><DialogTitle className="text-xl">Confirm your ride</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 p-4 text-sm">
                  <p className="text-white/45">Route</p>
                  <p className="mt-1 font-medium">{selected.from} → {selected.to}</p>
                  <p className="mt-3 text-white/45">Time</p>
                  <p className="mt-1 font-medium">{selected.date} • {selected.time}</p>
                  <p className="mt-3 text-white/45">Ride host</p>
                  <p className="mt-1 font-medium">{selected.driver} {selected.verified && "✓"}</p>
                  <p className="mt-3 text-white/45">Vehicle</p>
                  <p className="mt-1 font-medium">{selected.vehicle}</p>
                  <p className="mt-3 text-white/45">Contribution</p>
                  <p className="mt-1 font-medium text-emerald-400">₹{selected.fuelSplit}</p>
                </div>
                <button onClick={confirmBooking} disabled={submitting} data-testid="confirm-ride"
                  className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300] disabled:opacity-60">
                  {submitting ? "Confirming..." : "Confirm booking"}
                </button>
                <p className="text-center text-[11px] text-white/40">Demo payment — no real charge.</p>
              </div>
            </>
          )}

          {selected && stage === "success" && (
            <div className="py-2 text-center">
              <DialogHeader><DialogTitle className="text-center text-xl">Ride confirmed 🎉</DialogTitle></DialogHeader>
              <span className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400"><Navigation className="h-8 w-8" /></span>
              <p className="mt-4 text-sm text-white/55">You're going to {selected.to}, {selected.date} • {selected.time} with {selected.driver}. Live tracking activates 15 minutes before pickup.</p>
              <div className="mt-6 grid grid-cols-2 gap-2">
                <button onClick={() => { toast.info("Opening chat..."); }} className="flex items-center justify-center gap-1.5 rounded-full border border-white/15 py-2.5 text-xs font-semibold hover:bg-white/5"><MessageCircle className="h-3.5 w-3.5" />Chat</button>
                <button onClick={shareTrip} className="flex items-center justify-center gap-1.5 rounded-full border border-white/15 py-2.5 text-xs font-semibold hover:bg-white/5"><Share2 className="h-3.5 w-3.5" />Share trip</button>
              </div>
              <button onClick={() => setSelected(null)} data-testid="close-ride-confirm" className="mt-3 w-full rounded-full py-3 text-sm font-semibold text-white/60 hover:text-white">Done</button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookRide;
