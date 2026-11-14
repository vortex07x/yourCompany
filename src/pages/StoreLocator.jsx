import { useEffect, useMemo, useState } from "react";
import { Crosshair } from "lucide-react";
import StoreCard from "../components/StoreCard";
import StoreMap from "../components/StoreMap";
import { brand, stores } from "../data";
import { useStore } from "../context/StoreContext";
import { distanceKm, isOpenNow } from "../utils/stores";

const CITIES = [...new Set(stores.map((s) => s.city))].sort();

const TOGGLES = [
  { key: "vegOnly", label: "Veg Only", test: (s) => s.vegOnly },
  { key: "openNow", label: "Open Now", test: (s) => s.isOpen },
  { key: "isNew", label: "Newly Opened", test: (s) => s.isNew },
  { key: "directPay", label: "Direct Pay", test: (s) => s.directPay },
];

const GEO_MSG = {
  asking: "Finding your location…",
  done: "Showing the stores nearest to you.",
  denied: "Couldn’t get your location. Pick a city instead.",
  unsupported: "This browser can’t share your location. Pick a city instead.",
};

export default function StoreLocator() {
  const { setLocation } = useStore();
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [orderType, setOrderType] = useState("all"); // all | delivery | pickup
  const [toggles, setToggles] = useState(() => new Set());
  const [sort, setSort] = useState("relevance");
  const [user, setUser] = useState(null);
  const [geo, setGeo] = useState("idle");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    document.title = `Find stores – ${brand.name}`;
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    document.getElementById(`store-${selectedId}`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedId]);

  // Adds open/closed and distance to each store.
  const withState = useMemo(
    () => stores.map((s) => ({ ...s, isOpen: isOpenNow(s), dist: user ? distanceKm(user, s) : null })),
    [user]
  );

  const filtered = useMemo(() => {
    const active = TOGGLES.filter((t) => toggles.has(t.key));
    return withState.filter(
      (s) =>
        (!city || s.city === city) &&
        (!area || s.area === area) &&
        (orderType === "all" || s[orderType]) &&
        active.every((t) => t.test(s))
    );
  }, [withState, city, area, orderType, toggles]);

  const visible = useMemo(() => {
    const list = [...filtered];
    if (sort === "nearest") list.sort((a, b) => a.dist - b.dist);
    if (sort === "area") list.sort((a, b) => a.area.localeCompare(b.area));
    return list;
  }, [filtered, sort]);

  const areas = city ? stores.filter((s) => s.city === city).map((s) => s.area).sort() : [];

  const locate = () => {
    if (!navigator.geolocation) {
      setGeo("unsupported");
      return;
    }
    setGeo("asking");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUser({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setCity("");
        setArea("");
        setSort("nearest");
        setGeo("done");
      },
      () => setGeo("denied"),
      { timeout: 10000 }
    );
  };

  const toggle = (key) =>
    setToggles((prev) => {
      const n = new Set(prev);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });

  const clearAll = () => {
    setCity("");
    setArea("");
    setOrderType("all");
    setToggles(new Set());
    setSort(user ? "nearest" : "relevance");
  };

  const order = (s) => setLocation(`${s.area}, ${s.city}`);
  const closePopup = (id) => setSelectedId((cur) => (cur === id ? null : cur));

  return (
    <div className="locator">
      <section className="locator__hero">
        <div className="container">
          <h1>Find {brand.name} stores near you</h1>
          <p className="locator__count">{stores.length} stores across {CITIES.length} cities</p>

          <div className="locator__pick">
            <button type="button" className="chip-btn" onClick={locate} disabled={geo === "asking"}>
              <Crosshair size={16} aria-hidden="true" /> Use my location
            </button>
            <select
              aria-label="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setArea("");
              }}
            >
              <option value="">Select City</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select aria-label="Locality" value={area} disabled={!city} onChange={(e) => setArea(e.target.value)}>
              <option value="">Select Locality</option>
              {areas.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          {GEO_MSG[geo] && <p className="locator__msg" role="status">{GEO_MSG[geo]}</p>}
        </div>
      </section>

      <div className="container">
        <div className="locator__bar">
          <div className="chips-scroll">
            <select aria-label="Order type" value={orderType} onChange={(e) => setOrderType(e.target.value)}>
              <option value="all">Order Type</option>
              <option value="delivery">Delivery</option>
              <option value="pickup">Pickup</option>
            </select>
            {TOGGLES.map((t) => (
              <button
                key={t.key}
                type="button"
                className="chip-btn"
                aria-pressed={toggles.has(t.key)}
                onClick={() => toggle(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p aria-live="polite">{visible.length} {visible.length === 1 ? "result" : "results"} found</p>
          <select aria-label="Sort by" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="relevance">Sort By</option>
            <option value="nearest" disabled={!user}>Nearest first</option>
            <option value="area">Area A–Z</option>
          </select>
        </div>

        <div className="locator__grid">
          <div className="locator__list">
            {visible.length === 0 ? (
              <div className="shop-empty">
                <p>No stores match these filters.</p>
                <button type="button" className="btn-dark" onClick={clearAll}>Clear filters</button>
              </div>
            ) : (
              visible.map((s) => (
                <StoreCard key={s.id} store={s} active={s.id === selectedId} onSelect={setSelectedId} onOrder={order} />
              ))
            )}
          </div>

          <div className="locator__map">
            <StoreMap
              stores={filtered}
              user={user}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onClose={closePopup}
              onOrder={order}
            />
          </div>
        </div>
      </div>
    </div>
  );
}