import React from "react";
import { Link } from "react-router-dom";

// Full brand lockup logo (image contains mark + wordmark on black bg,
// which blends seamlessly with the dark theme).
export const Logo = ({ className = "h-11", to = "/", testid = "brand-logo" }) => {
  const el = (
    <span className="inline-flex items-center gap-2">
      <img src={process.env.PUBLIC_URL + "/logo.jpg"} alt="Bikemates" className={`${className} w-auto rounded-md object-contain`} />
      <span className="font-display text-lg font-semibold text-white">BikeMates</span>
    </span>
  );
  if (to) return <Link to={to} data-testid={testid} className="inline-flex items-center">{el}</Link>;
  return el;
};
