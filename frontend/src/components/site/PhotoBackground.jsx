import React from "react";

// ==========================================================================
// TO TEST A NEW BACKGROUND PHOTO:
//   1. Drop your image file into: frontend/public/images/
//   2. Change ONLY the filename in the line below.
//   3. Save this file, then hard-refresh your browser (Ctrl/Cmd+Shift+R)
//      so it doesn't show you a cached copy of the old image.
// ==========================================================================
const BG_IMAGE_FILE = "night-city-bg.jpg";

const BG_IMAGE_URL = `/images/${BG_IMAGE_FILE}`;

export const PhotoBackground = () => (
  <div className="photo-bg" aria-hidden="true">
    <img src={BG_IMAGE_URL} alt="" className="photo-bg__img" loading="eager" />
    <div className="photo-bg__overlay" />
  </div>
);
