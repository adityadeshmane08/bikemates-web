import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { IMAGES } from "@/lib/data";

const StoreContext = createContext(null);
const KEY = "bikemates_store_v1";

const BIKE_IMGS = [IMAGES.hero, IMAGES.commute, IMAGES.campus];
const img = (i) => BIKE_IMGS[i % BIKE_IMGS.length];

const seed = {
  wallet: 1240,
  transactions: [
    { id: "t1", label: "Wallet top-up", amount: 500, date: "1 week ago", type: "credit" },
    { id: "t2", label: "Shared ride to Central Station", amount: 85, date: "4 days ago", type: "credit" },
    { id: "t3", label: "Rented Honda Activa from Rohan M.", amount: -120, date: "2 days ago", type: "debit" },
  ],
  bikes: [
    { id: "b1", mine: false, name: "Honda Activa 6G", type: "Scooter", owner: "Rohan Mehta", college: "IIT Bombay", distance: 0.4, fuel: "Petrol", year: 2023, transmission: "Automatic", seats: 2, rating: 4.9, trips: 132, hourly: 40, daily: 260, weekly: 1500, deposit: 1000, image: img(1), specs: ["109cc", "Mileage 50 km/l", "Under-seat storage", "LED headlamp"], available: true },
    { id: "b2", mine: false, name: "Royal Enfield Classic 350", type: "Cruiser", owner: "Karan Singh", college: "BITS Pilani", distance: 1.2, fuel: "Petrol", year: 2022, transmission: "Manual", seats: 2, rating: 4.8, trips: 88, hourly: 90, daily: 650, weekly: 3800, deposit: 3000, image: img(0), specs: ["349cc", "Thump exhaust", "Dual channel ABS", "Retro styling"], available: true },
    { id: "b3", mine: false, name: "TVS Jupiter", type: "Scooter", owner: "Ishita Verma", college: "SRM Chennai", distance: 0.8, fuel: "Petrol", year: 2023, transmission: "Automatic", seats: 2, rating: 4.7, trips: 64, hourly: 35, daily: 230, weekly: 1350, deposit: 900, image: img(2), specs: ["110cc", "External fuel fill", "Mobile charger", "Large boot"], available: true },
    { id: "b4", mine: false, name: "Bajaj Pulsar 150", type: "Sports", owner: "Aditya Rao", college: "Manipal University", distance: 2.1, fuel: "Petrol", year: 2021, transmission: "Manual", seats: 2, rating: 4.6, trips: 51, hourly: 60, daily: 420, weekly: 2600, deposit: 2000, image: img(0), specs: ["149cc", "Sporty design", "Disc brakes", "Digital console"], available: true },
    { id: "b5", mine: false, name: "Ola S1 Pro (Electric)", type: "Electric", owner: "Priya Nair", college: "Christ Bengaluru", distance: 1.5, fuel: "Electric", year: 2024, transmission: "Automatic", seats: 2, rating: 4.9, trips: 40, hourly: 55, daily: 380, weekly: 2200, deposit: 2500, image: img(1), specs: ["Range 170 km", "Fast charging", "Digital cluster", "Zero emissions"], available: true },
    { id: "b6", mine: false, name: "Yamaha FZ-S", type: "Sports", owner: "Ananya Sharma", college: "VIT Vellore", distance: 0.6, fuel: "Petrol", year: 2022, transmission: "Manual", seats: 2, rating: 4.8, trips: 77, hourly: 65, daily: 450, weekly: 2700, deposit: 2200, image: img(2), specs: ["149cc", "Aggressive look", "LED lighting", "Single channel ABS"], available: true },
    { id: "b7", mine: false, name: "Suzuki Access 125", type: "Scooter", owner: "Meera Iyer", college: "NIT Trichy", distance: 0.9, fuel: "Petrol", year: 2023, transmission: "Automatic", seats: 2, rating: 4.7, trips: 58, hourly: 42, daily: 280, weekly: 1600, deposit: 1100, image: img(0), specs: ["124cc", "Bluetooth console", "USB charging", "Combi brakes"], available: true },
    { id: "b8", mine: false, name: "KTM Duke 200", type: "Sports", owner: "Vikram Nair", college: "IIT Delhi", distance: 1.8, fuel: "Petrol", year: 2022, transmission: "Manual", seats: 2, rating: 4.9, trips: 96, hourly: 110, daily: 780, weekly: 4200, deposit: 3500, image: img(1), specs: ["199cc", "Trellis frame", "Upside-down forks", "Ride modes"], available: true },
    { id: "b9", mine: false, name: "Hero Splendor Plus", type: "Commuter", owner: "Deepak Yadav", college: "Delhi University", distance: 0.5, fuel: "Petrol", year: 2021, transmission: "Manual", seats: 2, rating: 4.6, trips: 145, hourly: 25, daily: 180, weekly: 1050, deposit: 700, image: img(2), specs: ["97cc", "Best-in-class mileage", "i3s tech", "Tubeless tyres"], available: true },
    { id: "b10", mine: false, name: "Ather 450X (Electric)", type: "Electric", owner: "Nisha Reddy", college: "IIIT Hyderabad", distance: 1.1, fuel: "Electric", year: 2024, transmission: "Automatic", seats: 2, rating: 4.9, trips: 33, hourly: 58, daily: 400, weekly: 2300, deposit: 2600, image: img(0), specs: ["Range 150 km", "Touchscreen dash", "Fast charging", "Zero emissions"], available: true },
    { id: "b11", mine: false, name: "Honda SP 125", type: "Commuter", owner: "Arjun Malhotra", college: "IIT Kanpur", distance: 1.4, fuel: "Petrol", year: 2023, transmission: "Manual", seats: 2, rating: 4.7, trips: 62, hourly: 38, daily: 250, weekly: 1450, deposit: 950, image: img(1), specs: ["124cc", "HET engine", "LED headlamp", "Silent start"], available: true },
    { id: "b12", mine: false, name: "Royal Enfield Hunter 350", type: "Cruiser", owner: "Simran Kaur", college: "Punjab University", distance: 2.4, fuel: "Petrol", year: 2023, transmission: "Manual", seats: 2, rating: 4.8, trips: 71, hourly: 85, daily: 600, weekly: 3400, deposit: 2800, image: img(2), specs: ["349cc", "Retro-modern build", "Twin downtube frame", "Dual-channel ABS"], available: true },
    { id: "b13", mine: false, name: "TVS Ntorq 125", type: "Scooter", owner: "Kabir Chopra", college: "Jamia Millia", distance: 0.7, fuel: "Petrol", year: 2023, transmission: "Automatic", seats: 2, rating: 4.7, trips: 84, hourly: 45, daily: 300, weekly: 1750, deposit: 1200, image: img(0), specs: ["124cc", "SmartXonnect app", "Sporty styling", "Race-tuned engine"], available: true },
    { id: "b14", mine: false, name: "Bajaj Dominar 400", type: "Sports", owner: "Rahul Desai", college: "Pune University", distance: 3.0, fuel: "Petrol", year: 2022, transmission: "Manual", seats: 2, rating: 4.8, trips: 45, hourly: 120, daily: 850, weekly: 4600, deposit: 4000, image: img(1), specs: ["373cc", "Touring beast", "USD forks", "LED DRLs"], available: true },
    { id: "b15", mine: false, name: "Hero Electric Optima", type: "Electric", owner: "Tanya Bhatt", college: "Amity University", distance: 1.0, fuel: "Electric", year: 2023, transmission: "Automatic", seats: 2, rating: 4.5, trips: 29, hourly: 32, daily: 220, weekly: 1300, deposit: 1400, image: img(2), specs: ["Range 60 km", "Detachable battery", "Low maintenance", "Zero emissions"], available: true },
    { id: "b16", mine: false, name: "Yamaha R15 V4", type: "Sports", owner: "Aryan Kapoor", college: "IIT Madras", distance: 1.6, fuel: "Petrol", year: 2023, transmission: "Manual", seats: 2, rating: 4.9, trips: 102, hourly: 130, daily: 900, weekly: 4900, deposit: 4200, image: img(0), specs: ["155cc", "Track-derived design", "Quickshifter", "VVA engine"], available: true },
    { id: "b17", mine: false, name: "Suzuki Burgman Street", type: "Scooter", owner: "Pooja Nambiar", college: "Christ University", distance: 0.9, fuel: "Petrol", year: 2022, transmission: "Automatic", seats: 2, rating: 4.6, trips: 53, hourly: 44, daily: 290, weekly: 1650, deposit: 1150, image: img(1), specs: ["124cc", "Maxi-style design", "LED tail lamp", "Large under-seat space"], available: true },
    { id: "b18", mine: false, name: "Royal Enfield Meteor 350", type: "Cruiser", owner: "Farhan Ali", college: "AMU Aligarh", distance: 2.7, fuel: "Petrol", year: 2022, transmission: "Manual", seats: 2, rating: 4.8, trips: 67, hourly: 88, daily: 620, weekly: 3500, deposit: 2900, image: img(2), specs: ["349cc", "Tripper navigation", "Cruiser ergonomics", "Smooth torque delivery"], available: true },
    { id: "b19", mine: false, name: "Honda Dio", type: "Scooter", owner: "Sneha Pillai", college: "Kerala University", distance: 0.5, fuel: "Petrol", year: 2023, transmission: "Automatic", seats: 2, rating: 4.6, trips: 74, hourly: 36, daily: 240, weekly: 1400, deposit: 950, image: img(0), specs: ["109cc", "Muscular design", "LED position lamp", "Telescopic suspension"], available: true },
    { id: "b20", mine: false, name: "Bajaj Chetak (Electric)", type: "Electric", owner: "Aditi Joshi", college: "Symbiosis Pune", distance: 1.3, fuel: "Electric", year: 2024, transmission: "Automatic", seats: 2, rating: 4.8, trips: 38, hourly: 50, daily: 350, weekly: 2000, deposit: 2400, image: img(1), specs: ["Range 90 km", "Retro-futuristic design", "Metal body", "Zero emissions"], available: true },
  ],
  rides: [
    { id: "r1", mine: false, driver: "Rohan Mehta", college: "IIT Bombay", from: "Main Campus Gate", to: "Andheri Station", date: "Today", time: "5:30 PM", seats: 2, seatsTotal: 2, fuelSplit: 45, vehicle: "Honda Activa 6G", rating: 4.9, trips: 132, verified: true, recurring: "Daily (Mon–Fri)" },
    { id: "r2", mine: false, driver: "Ishita Verma", college: "SRM Chennai", from: "Hostel Block C", to: "Tech Park, Phase 2", date: "Today", time: "8:15 AM", seats: 1, seatsTotal: 1, fuelSplit: 35, vehicle: "TVS Jupiter", rating: 4.7, trips: 64, verified: true, recurring: "Daily (Mon–Sat)" },
    { id: "r3", mine: false, driver: "Karan Singh", college: "BITS Pilani", from: "Library", to: "City Center Mall", date: "Tomorrow", time: "6:00 PM", seats: 1, seatsTotal: 2, fuelSplit: 60, vehicle: "Royal Enfield Classic 350", rating: 4.8, trips: 88, verified: true, recurring: "Weekends" },
    { id: "r4", mine: false, driver: "Aditya Rao", college: "Manipal University", from: "North Gate", to: "Railway Junction", date: "Today", time: "7:45 AM", seats: 2, seatsTotal: 2, fuelSplit: 50, vehicle: "Bajaj Pulsar 150", rating: 4.6, trips: 51, verified: true, recurring: "Daily" },
    { id: "r5", mine: false, driver: "Meera Iyer", college: "NIT Trichy", from: "Girls Hostel", to: "Andheri Station", date: "Today", time: "5:45 PM", seats: 1, seatsTotal: 2, fuelSplit: 40, vehicle: "Suzuki Access 125", rating: 0, trips: 0, verified: true, recurring: "New rider" },
  ],
  rideAlerts: [],
  bookings: [],
};

const load = () => {
  try {
    const s = localStorage.getItem(KEY);
    if (s) return JSON.parse(s);
  } catch (e) { /* ignore */ }
  return seed;
};

export const StoreProvider = ({ children }) => {
  const [state, setState] = useState(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* quota — skip persist */ }
  }, [state]);

  const addBike = useCallback((bike) => {
    setState((s) => ({ ...s, bikes: [{ ...bike, id: "b" + Date.now(), mine: true, owner: "You", rating: 5.0, trips: 0, available: true, distance: 0, image: bike.image || img(0) }, ...s.bikes] }));
  }, []);

  const deleteBike = useCallback((id) => {
    setState((s) => ({ ...s, bikes: s.bikes.filter((b) => b.id !== id) }));
  }, []);

  const toggleBikeAvailability = useCallback((id) => {
    setState((s) => ({ ...s, bikes: s.bikes.map((b) => b.id === id ? { ...b, available: !b.available, status: !b.available ? "Available" : "Booked" } : b) }));
  }, []);

  const setGeofence = useCallback((id, patch) => {
    setState((s) => ({ ...s, bikes: s.bikes.map((b) => b.id === id ? { ...b, geofence: { ...(b.geofence || { enabled: false, radiusM: 500, breached: false }), ...patch } } : b) }));
  }, []);

  const addRide = useCallback((ride) => {
    setState((s) => ({ ...s, rides: [{ ...ride, id: "r" + Date.now(), mine: true, driver: "You", rating: 5.0, seatsTotal: Number(ride.seats) }, ...s.rides] }));
  }, []);

  const bookBike = useCallback((bike, plan, otp) => {
    setState((s) => ({
      ...s,
      bookings: [{ id: "bk" + Date.now(), kind: "bike", title: bike.name, sub: `from ${bike.owner}`, plan, otp, status: "Confirmed", date: "Just now", amount: bike[plan] || bike.daily }, ...s.bookings],
      wallet: s.wallet - (bike[plan] || bike.daily),
      transactions: [{ id: "t" + Date.now(), label: `Rented ${bike.name}`, amount: -(bike[plan] || bike.daily), date: "Just now", type: "debit" }, ...s.transactions],
    }));
  }, []);

  const bookRide = useCallback((ride) => {
    setState((s) => ({
      ...s,
      rides: s.rides.map((r) => r.id === ride.id ? { ...r, seats: Math.max(0, r.seats - 1) } : r),
      bookings: [{ id: "bk" + Date.now(), kind: "ride", title: `${ride.from} → ${ride.to}`, sub: `with ${ride.driver}`, status: "Confirmed", date: ride.date + " " + ride.time, amount: ride.fuelSplit }, ...s.bookings],
      wallet: s.wallet - ride.fuelSplit,
      transactions: [{ id: "t" + Date.now(), label: `Ride ${ride.from} → ${ride.to}`, amount: -ride.fuelSplit, date: "Just now", type: "debit" }, ...s.transactions],
    }));
  }, []);

  const addRideAlert = useCallback((alert) => {
    setState((s) => ({ ...s, rideAlerts: [{ ...alert, id: "ra" + Date.now(), createdAt: "Just now" }, ...(s.rideAlerts || [])] }));
  }, []);

  const topUp = useCallback((amount) => {
    setState((s) => ({ ...s, wallet: s.wallet + amount, transactions: [{ id: "t" + Date.now(), label: "Wallet top-up", amount, date: "Just now", type: "credit" }, ...s.transactions] }));
  }, []);

  const withdraw = useCallback((amount) => {
    setState((s) => ({ ...s, wallet: Math.max(0, s.wallet - amount), transactions: [{ id: "t" + Date.now(), label: "Withdrawal to bank", amount: -amount, date: "Just now", type: "debit" }, ...s.transactions] }));
  }, []);

  const reset = useCallback(() => { localStorage.removeItem(KEY); setState(seed); }, []);

 const value = { ...state, addBike, deleteBike, toggleBikeAvailability, setGeofence, addRide, bookBike, bookRide, addRideAlert, topUp, withdraw, reset,
    myBikes: state.bikes.filter((b) => b.mine), myRides: state.rides.filter((r) => r.mine) };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
