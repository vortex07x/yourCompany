import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, Phone, ChevronDown, Route, User, ShoppingCart, Menu, X } from "lucide-react";
import { brand, navLinks } from "../data";
import { useStore } from "../context/StoreContext";
import SearchBox from "./SearchBox";

const ORDER_TYPES = ["Delivery", "Pickup"];

export default function Header() {
  const { pathname } = useLocation();
  const compact = pathname !== "/"; // inner pages: no offer bar, no location picker
  const { count, setModal, location, orderType, setOrderType } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const typeRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!typeOpen) return;
    const onDown = (e) => {
      if (!typeRef.current?.contains(e.target)) setTypeOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setTypeOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [typeOpen]);

  return (
    <header className="site-header" id="top">
      {!compact && (
        <div className="topbar">
          <div className="container topbar__inner">
            <p>
              <strong>{brand.offer.bold}</strong> {brand.offer.rest}
            </p>
            <div className="topbar__links">
              <Link to="/store-locator"><MapPin size={14} /> Our stores</Link>
              <a href={`tel:${brand.phone.replace(/\s/g, "")}`}><Phone size={14} /> {brand.phone}</a>
            </div>
          </div>
        </div>
      )}

      <div className="mainbar">
        <div className="container mainbar__inner">
          <button
            type="button"
            className="menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link to="/" className="logo" aria-label={brand.name}>
            {brand.logo ? <img src={brand.logo} alt="" /> : brand.name}
          </Link>

          <SearchBox />

          {!compact && (
            <div className="pick">
              <button type="button" onClick={() => setModal("location")}>
                <MapPin size={16} className="pick__pin" aria-hidden="true" />
                <span>
                  <small>{orderType === "Delivery" ? "Deliver to" : "Pick up from"}</small>
                  <strong>{location || "Set location"}</strong>
                </span>
                <ChevronDown size={14} aria-hidden="true" />
              </button>

              <div className="pick__type" ref={typeRef}>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={typeOpen}
                  onClick={() => setTypeOpen((o) => !o)}
                >
                  <span><small>Order type</small><strong>{orderType}</strong></span>
                  <ChevronDown size={14} aria-hidden="true" />
                </button>
                {typeOpen && (
                  <ul className="menu" role="listbox" aria-label="Order type">
                    {ORDER_TYPES.map((t) => (
                      <li key={t} role="option" aria-selected={t === orderType}>
                        <button
                          type="button"
                          onClick={() => {
                            setOrderType(t);
                            setTypeOpen(false);
                          }}
                        >
                          {t}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          <button type="button" className="ghost-btn" onClick={() => setModal("track")}>
            <Route size={18} /> <span className="ghost-btn__label">Track</span>
          </button>
          <button type="button" className="ghost-btn" onClick={() => setModal("login")}>
            <User size={18} /> <span className="ghost-btn__label">Login</span>
          </button>
          <button
            type="button"
            className="ghost-btn ghost-btn--dark"
            aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
            onClick={() => setModal("cart")}
          >
            <ShoppingCart size={18} /> <span className="ghost-btn__label">Cart</span>
            {count > 0 && <span className="badge">{count}</span>}
          </button>
        </div>
      </div>

      <nav id="main-nav" className={`navbar ${menuOpen ? "is-open" : ""}`} aria-label="Main">
        <ul className="container">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                aria-current={link.to === pathname ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}