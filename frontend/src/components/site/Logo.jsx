import React from "react";
import { Link } from "react-router-dom";

// Full brand lockup logo (image contains mark + wordmark on black bg,
// which blends seamlessly with the dark theme).
export const Logo = ({ className = "h-11", to = "/", testid = "brand-logo" }) => {
  const el = <img src="/logo.jpg" alt="Bikemates" className={`${className} w-auto rounded-md object-contain`} />;
  if (to) return <Link to={to} data-testid={testid} className="inline-flex items-center">{el}</Link>;
  return el;
};
