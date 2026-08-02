import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CENTER } from "@/lib/geo";

const pinIcon = (color = "#FF4B00", pulse = false) =>
  L.divIcon({
    className: "",
    html: `<div style="position:relative;width:22px;height:22px;">
      ${pulse ? `<span style="position:absolute;inset:0;border-radius:9999px;background:${color};opacity:0.35;animation:mapPulse 1.6s infinite;"></span>` : ""}
      <span style="position:absolute;inset:0;margin:auto;width:14px;height:14px;border-radius:9999px;background:${color};border:2px solid #0a0a0a;box-shadow:0 0 8px ${color}80;"></span>
    </div>
    <style>@keyframes mapPulse{0%{transform:scale(1);opacity:0.5}100%{transform:scale(2.4);opacity:0}}</style>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });

// Recenters the map smoothly when `center` changes (used for the moving GPS marker).
const Recenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.panTo([center.lat, center.lng], { animate: true, duration: 0.8 });
  }, [center, map]);
  return null;
};

export const MapView = ({
  markers = [],
  route = null,
  liveMarker = null,
  center = CENTER,
  zoom = 13,
  height = "100%",
  onMarkerClick = () => {},
}) => (
  <div className="isolate relative z-0 overflow-hidden rounded-3xl border border-white/10" style={{ height }}>
    <MapContainer center={[center.lat, center.lng]} zoom={zoom} style={{ height: "100%", width: "100%", background: "#0a0a0a" }} zoomControl={false} attributionControl={false}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

      {markers.map((m) => (
        <Marker key={m.id} position={[m.lat, m.lng]} icon={pinIcon(m.color || "#FF4B00")} eventHandlers={{ click: () => onMarkerClick(m) }} />
      ))}

      {route && <Polyline positions={route.map((p) => [p.lat, p.lng])} pathOptions={{ color: "#FF4B00", weight: 4, dashArray: "8 8", opacity: 0.85 }} />}

      {liveMarker && (
        <>
          <Marker position={[liveMarker.lat, liveMarker.lng]} icon={pinIcon("#FF4B00", true)} />
          <Recenter center={liveMarker} />
        </>
      )}
    </MapContainer>
    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
  </div>
);
