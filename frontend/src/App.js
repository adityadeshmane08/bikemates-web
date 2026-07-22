import React, { useEffect, useState } from "react";
import "@/App.css";

const SITE_PASSWORD = "bikemates2026";

const PasswordGate = ({ children }) => {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("bm_unlocked") === "true");
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) return children;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === SITE_PASSWORD) {
      sessionStorage.setItem("bm_unlocked", "true");
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "360px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "22px", fontWeight: 700, marginBottom: "8px" }}>BikeMates</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginBottom: "24px" }}>This site is under construction. Enter the password to continue.</p>
        <input
          type="password"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false); }}
          placeholder="Password"
          style={{ width: "100%", padding: "12px 16px", borderRadius: "999px", border: error ? "1px solid #ef4444" : "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: "14px", outline: "none", marginBottom: "12px" }}
        />
        {error && <p style={{ color: "#ef4444", fontSize: "13px", marginBottom: "12px" }}>Incorrect password, try again.</p>}
        <button type="submit" style={{ width: "100%", padding: "12px", borderRadius: "999px", border: "none", background: "#FF4B00", color: "#fff", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
          Enter
        </button>
      </form>
    </div>
  );
};
import { HashRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth";
import { StoreProvider } from "@/lib/store";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { AppLayout } from "@/components/app/AppLayout";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Features from "@/pages/Features";
import BikeRental from "@/pages/BikeRental";
import RideSharing from "@/pages/RideSharing";
import HowItWorks from "@/pages/HowItWorks";
import Safety from "@/pages/Safety";
import Pricing from "@/pages/Pricing";
import FAQ from "@/pages/FAQ";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Careers from "@/pages/Careers";
import CampusAmbassador from "@/pages/CampusAmbassador";
import ReferEarn from "@/pages/ReferEarn";
import Insurance from "@/pages/Insurance";
import PartnerColleges from "@/pages/PartnerColleges";
import Support from "@/pages/Support";
import PressKit from "@/pages/PressKit";
import Legal from "@/pages/Legal";
import NotFound from "@/pages/NotFound";
import { Login, Signup } from "@/pages/Auth";

import Dashboard from "@/pages/Dashboard";
import RentBike from "@/pages/app/RentBike";
import BookRide from "@/pages/app/BookRide";
import ListBike from "@/pages/app/ListBike";
import ShareRide from "@/pages/app/ShareRide";
import MyBikes from "@/pages/app/MyBikes";
import MyRides from "@/pages/app/MyRides";
import Bookings from "@/pages/app/Bookings";
import Wallet from "@/pages/app/Wallet";
import Messages from "@/pages/app/Messages";
import Notifications from "@/pages/app/Notifications";
import Profile from "@/pages/app/Profile";
import Settings from "@/pages/app/Settings";
import RideHistory from "@/pages/app/RideHistory";
import SavedBikes from "@/pages/app/SavedBikes";
import Rewards from "@/pages/app/Rewards";
import Referral from "@/pages/app/Referral";
import BookingRequests from "@/pages/app/BookingRequests";
import AvailabilityCalendar from "@/pages/app/AvailabilityCalendar";
import GpsTracking from "@/pages/app/GpsTracking";
import Earnings from "@/pages/app/Earnings";
import Analytics from "@/pages/app/Analytics";
import Reviews from "@/pages/app/Reviews";
import Panels from "@/pages/app/Panels";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const SiteLayout = () => (
  <>
    <Navbar />
    <main className="relative z-[2]">
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <PasswordGate>
    <div className="App">
      <div className="noise-overlay" />
      <HashRouter>
        <AuthProvider>
          <StoreProvider>
            <ScrollToTop />
            <Toaster theme="dark" position="top-center" richColors />
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/bike-rental" element={<BikeRental />} />
                <Route path="/ride-sharing" element={<RideSharing />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/safety" element={<Safety />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/campus-ambassador" element={<CampusAmbassador />} />
                <Route path="/refer-earn" element={<ReferEarn />} />
                <Route path="/insurance" element={<Insurance />} />
                <Route path="/partner-colleges" element={<PartnerColleges />} />
                <Route path="/support" element={<Support />} />
                <Route path="/press-kit" element={<PressKit />} />
                <Route path="/privacy" element={<Legal type="privacy" />} />
                <Route path="/terms" element={<Legal type="terms" />} />
                <Route path="/refund" element={<Legal type="refund" />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/app/panels" element={<Panels />} />
                <Route path="/app/rent-bike" element={<RentBike />} />
                <Route path="/app/book-ride" element={<BookRide />} />
                <Route path="/app/list-bike" element={<ListBike />} />
                <Route path="/app/share-ride" element={<ShareRide />} />
                <Route path="/app/my-bikes" element={<MyBikes />} />
                <Route path="/app/my-rides" element={<MyRides />} />
                <Route path="/app/bookings" element={<Bookings />} />
                <Route path="/app/wallet" element={<Wallet />} />
                <Route path="/app/messages" element={<Messages />} />
                <Route path="/app/notifications" element={<Notifications />} />
                <Route path="/app/profile" element={<Profile />} />
                <Route path="/app/settings" element={<Settings />} />
                <Route path="/app/ride-history" element={<RideHistory />} />
                <Route path="/app/saved-bikes" element={<SavedBikes />} />
                <Route path="/app/rewards" element={<Rewards />} />
                <Route path="/app/referral" element={<Referral />} />
                <Route path="/app/booking-requests" element={<BookingRequests />} />
                <Route path="/app/calendar" element={<AvailabilityCalendar />} />
                <Route path="/app/gps-tracking" element={<GpsTracking />} />
                <Route path="/app/earnings" element={<Earnings />} />
                <Route path="/app/analytics" element={<Analytics />} />
                <Route path="/app/reviews" element={<Reviews />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </StoreProvider>
        </AuthProvider>
     </HashRouter>
    </div>
    </PasswordGate>
  );
}

export default App;
