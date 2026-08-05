// Central reference point for all demo maps (IIT Bombay, Mumbai — swap this
// for any real campus coordinates later; everything else adapts automatically).
export const CENTER = { lat: 19.1334, lng: 72.9133 };

// Turns a text id into a stable number, so the same bike/ride always gets the
// same map position across renders and reloads (not random every time).
const seedFromId = (id) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
};

// Places a point `distanceKm` away from CENTER, in a stable direction based on id.
// 1 degree of latitude ≈ 111km, adjusted for longitude at this latitude.
export const coordsFromDistance = (id, distanceKm) => {
  const angleDeg = seedFromId(id);
  const angleRad = (angleDeg * Math.PI) / 180;
  const dLat = (distanceKm / 111) * Math.cos(angleRad);
  const dLng = (distanceKm / (111 * Math.cos((CENTER.lat * Math.PI) / 180))) * Math.sin(angleRad);
  return { lat: CENTER.lat + dLat, lng: CENTER.lng + dLng };
};

// Builds a simple curved-looking multi-point route between two coordinates,
// used for the GPS tracking animated line.
// Straight-line distance between two coordinates, in km (Haversine formula).
export const haversineKm = (a, b) => {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};
export const routeBetween = (start, end, steps = 24) => {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const wob = Math.sin(t * Math.PI) * 0.0025; // slight curve so it doesn't look like a straight ruler line
    points.push({
      lat: start.lat + (end.lat - start.lat) * t + wob,
      lng: start.lng + (end.lng - start.lng) * t - wob,
    });
  }
  return points;
};
