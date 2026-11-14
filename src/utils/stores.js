// Stores are in India, so "open now" is judged in IST wherever the viewer is.
export function isOpenNow({ opens, closes }) {
  const t = new Date().toLocaleTimeString("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  return opens <= closes ? t >= opens && t < closes : t >= opens || t < closes; // closes past midnight
}

export function distanceKm(a, b) {
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
}

export const formatKm = (km) => `${km < 10 ? km.toFixed(1) : Math.round(km)} km away`;

export function to12h(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

export const directionsUrl = (s) =>
  `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`;