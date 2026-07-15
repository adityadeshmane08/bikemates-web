import React from "react";
import { Link } from "react-router-dom";
import { CTAButton } from "@/components/site/primitives";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
    <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 radial-glow" />
    <p className="text-[8rem] font-semibold leading-none text-gradient font-display sm:text-[12rem]">404</p>
    <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">This route took a wrong turn.</h1>
    <p className="mt-3 max-w-md text-white/55">The page you’re looking for doesn’t exist or has moved. Let’s get you back on the road.</p>
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <CTAButton to="/" testid="notfound-home">Back to Home</CTAButton>
      <Link to="/support" data-testid="notfound-support" className="inline-flex items-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-white/5">Contact Support</Link>
    </div>
  </div>
);

export default NotFound;
