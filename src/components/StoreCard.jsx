import { Link } from "react-router-dom";
import { Clock, MapPin, Navigation, Phone, ShoppingBag, ShoppingCart, Truck } from "lucide-react";
import { brand } from "../data";
import { directionsUrl, formatKm, to12h } from "../utils/stores";

// Clicking anywhere selects the store on the map; the name button is the keyboard route.
export default function StoreCard({ store: s, active, onSelect, onOrder }) {
  return (
    <article id={`store-${s.id}`} className={`store ${active ? "is-active" : ""}`} onClick={() => onSelect(s.id)}>
      <div className="store__logo" aria-hidden="true">{brand.name}</div>

      <div className="store__body">
        <div className="store__head">
          <h3>
            <button
              type="button"
              className="store__name"
              aria-pressed={active}
              aria-label={`${brand.name}, ${s.area}. Show on map`}
              onClick={() => onSelect(s.id)}
            >
              {brand.name}
            </button>
          </h3>
          <span className={`open-badge ${s.isOpen ? "" : "is-closed"}`}>{s.isOpen ? "Open" : "Closed"}</span>
        </div>

        <p className="store__row">
          <Clock size={16} aria-hidden="true" />
          <span><b>Store hours</b> · {to12h(s.opens)} – {to12h(s.closes)}</span>
        </p>
        <p className="store__row">
          <MapPin size={16} aria-hidden="true" />
          <span>
            {s.area}, {s.city}
            {s.dist != null && <span className="store__dist"> · {formatKm(s.dist)}</span>}
          </span>
        </p>

        <div className="store__tags">
          {s.delivery && <span className="tag"><Truck size={14} aria-hidden="true" /> Delivery</span>}
          {s.pickup && <span className="tag tag--pickup"><ShoppingBag size={14} aria-hidden="true" /> Pickup</span>}
          {s.vegOnly && <span className="tag tag--veg">Veg only</span>}
          {s.isNew && <span className="tag tag--new">New</span>}
          {s.directPay && <span className="tag">Direct pay</span>}
        </div>

        <div className="store__actions">
          <a className="icon-btn" href={directionsUrl(s)} target="_blank" rel="noreferrer" aria-label={`Directions to ${s.area}`}>
            <Navigation size={18} />
          </a>
          <a className="icon-btn" href={`tel:${s.phone.replace(/\s/g, "")}`} aria-label={`Call ${s.area}`}>
            <Phone size={18} />
          </a>
          <Link to="/products" className="btn-order" onClick={() => onOrder(s)}>
            <ShoppingCart size={16} aria-hidden="true" /> Order Online
          </Link>
        </div>
      </div>
    </article>
  );
}