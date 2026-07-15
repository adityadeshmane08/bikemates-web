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
  ],
  rides: [
    { id: "r1", mine: false, driver: "Rohan Mehta", college: "IIT Bombay", from: "Main Campus Gate", to: "Andheri Station", date: "Today", time: "5:30 PM", seats: 2, seatsTotal: 2, fuelSplit: 45, vehicle: "Honda Activa 6G", rating: 4.9, recurring: "Daily (Mon–Fri)" },
    { id: "r2", mine: false, driver: "Ishita Verma", college: "SRM Chennai", from: "Hostel Block C", to: "Tech Park, Phase 2", date: "Today", time: "8:15 AM", seats: 1, seatsTotal: 1, fuelSplit: 35, vehicle: "TVS Jupiter", rating: 4.7, recurring: "Daily (Mon–Sat)" },
    { id: "r3", mine: false, driver: "Karan Singh", college: "BITS Pilani", from: "Library", to: "City Center Mall", date: "Tomorrow", time: "6:00 PM", seats: 1, seatsTotal: 2, fuelSplit: 60, vehicle: "Royal Enfield Classic 350", rating: 4.8, recurring: "Weekends" },
    { id: "r4", mine: false, driver: "Aditya Rao", college: "Manipal University", from: "North Gate", to: "Railway Junction", date: "Today", time: "7:45 AM", seats: 2, seatsTotal: 2, fuelSplit: 50, vehicle: "Bajaj Pulsar 150", rating: 4.6, recurring: "Daily" },
  ],
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

  const topUp = useCallback((amount) => {
    setState((s) => ({ ...s, wallet: s.wallet + amount, transactions: [{ id: "t" + Date.now(), label: "Wallet top-up", amount, date: "Just now", type: "credit" }, ...s.transactions] }));
  }, []);

  const withdraw = useCallback((amount) => {
    setState((s) => ({ ...s, wallet: Math.max(0, s.wallet - amount), transactions: [{ id: "t" + Date.now(), label: "Withdrawal to bank", amount: -amount, date: "Just now", type: "debit" }, ...s.transactions] }));
  }, []);

  const reset = useCallback(() => { localStorage.removeItem(KEY); setState(seed); }, []);

  const value = { ...state, addBike, addRide, bookBike, bookRide, topUp, withdraw, reset,
    myBikes: state.bikes.filter((b) => b.mine), myRides: state.rides.filter((r) => r.mine) };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
