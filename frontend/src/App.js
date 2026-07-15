import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

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
import Dashboard from "@/pages/Dashboard";
import { Login, Signup } from "@/pages/Auth";

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
    <div className="App">
      <div className="noise-overlay" />
      <BrowserRouter>
        <AuthProvider>
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
