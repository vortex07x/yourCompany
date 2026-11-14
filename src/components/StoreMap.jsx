import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from "react-leaflet";
import { divIcon, latLngBounds } from "leaflet";
import { Navigation, ShoppingCart } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { brand } from "../data";
import { directionsUrl } from "../utils/stores";

const INDIA = [22.5, 79];

// CSS-drawn pins: avoids Leaflet's default marker images, which Vite can't resolve.
const pin = (active) =>
  divIcon({
    className: "pin-wrap",
    html: `<span class="pin${active ? " pin--active" : ""}"></span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 36],
    popupAnchor: [0, -34],
  });
const PIN = pin(false);
const PIN_ACTIVE = pin(true);

function MapView({ stores, user, selected }) {
  const map = useMap();

  // Refit when the filtered set or the person's location changes (not on sort).
  useEffect(() => {
    const pts = user
      ? [user, ...[...stores].sort((a, b) => a.dist - b.dist).slice(0, 3)]
      : stores;
    if (pts.length === 0) {
      map.setView(INDIA, 5);
      return;
    }
    map.fitBounds(latLngBounds(pts.map((p) => [p.lat, p.lng])), { padding: [48, 48], maxZoom: 13 });
  }, [map, stores, user]);

  useEffect(() => {
    if (selected) {
      map.flyTo([selected.lat, selected.lng], Math.max(map.getZoom(), 12), { duration: 0.6 });
    }
  }, [map, selected]);

  return null;
}

function StoreMarker({ store: s, active, onSelect, onClose, onOrder }) {
  const ref = useRef(null);

  useEffect(() => {
    if (active) ref.current?.openPopup();
  }, [active]);

  return (
    <Marker
      ref={ref}
      position={[s.lat, s.lng]}
      icon={active ? PIN_ACTIVE : PIN}
      zIndexOffset={active ? 1000 : 0}
      eventHandlers={{ click: () => onSelect(s.id), popupclose: () => onClose(s.id) }}
    >
      <Popup>
        <div className="mpop">
          <div className="mpop__head">
            <strong>{brand.name}</strong>
            <span className={`open-badge ${s.isOpen ? "" : "is-closed"}`}>{s.isOpen ? "Open" : "Closed"}</span>
          </div>
          <span className="mpop__area">{s.area}, {s.city}</span>
          <a className="btn-line" href={directionsUrl(s)} target="_blank" rel="noreferrer">
            <Navigation size={14} aria-hidden="true" /> Directions
          </a>
          <Link className="btn-order" to="/products" onClick={() => onOrder(s)}>
            <ShoppingCart size={14} aria-hidden="true" /> Order Online
          </Link>
        </div>
      </Popup>
    </Marker>
  );
}

export default function StoreMap({ stores, user, selectedId, onSelect, onClose, onOrder }) {
  const selected = stores.find((s) => s.id === selectedId) ?? null;

  return (
    <MapContainer className="store-map" center={INDIA} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapView stores={stores} user={user} selected={selected} />
      {user && (
        <CircleMarker
          center={[user.lat, user.lng]}
          radius={8}
          pathOptions={{ color: "#fff", weight: 3, fillColor: "#1b7f6e", fillOpacity: 1 }}
        />
      )}
      {stores.map((s) => (
        <StoreMarker
          key={s.id}
          store={s}
          active={s.id === selectedId}
          onSelect={onSelect}
          onClose={onClose}
          onOrder={onOrder}
        />
      ))}
    </MapContainer>
  );
}