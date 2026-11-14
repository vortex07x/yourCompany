import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, BadgePercent, PackageCheck, X, Plus, Minus } from "lucide-react";
import useMenu from "../hooks/useMenu";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import VegMark from "../components/VegMark";
import { brand } from "../data";

const FEATURED = "Featured Items";
const SECTION_ORDER = [FEATURED, "Desserts", "Beverages", "Snacks", "Starters", "Breakfast", "Lunch", "Dinner", "Sides"];

const FILTERS = [
  { key: "veg", label: "Veg", test: (p) => p.veg },
  { key: "nonveg", label: "Non-Veg", test: (p) => !p.veg },
  { key: "offer", label: "On Offer", test: (p) => p.offer },
  { key: "rated", label: "Rated 4+", test: (p) => p.rating >= 4 },
  { key: "ordered", label: "Highly Ordered", test: (p) => p.highlyOrdered },
  { key: "new", label: "New", test: (p) => p.isNew },
  { key: "bestseller", label: "Bestseller", test: (p) => p.bestseller },
  { key: "instock", label: "In Stock", test: (p) => p.inStock },
];

const ICONS = {
  offer: <BadgePercent size={16} aria-hidden="true" />,
  instock: <PackageCheck size={16} aria-hidden="true" />,
};

const SORTS = [
  { key: "relevance", label: "Relevance" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "rating", label: "Rating" },
];

// Loose match so "Cookies", "Curries" and "Salads" find "cookie", "curry" and "salad".
const matches = (p, q) => {
  const hay = [p.name, p.cuisine, p.section, ...p.tags].join(" ").toLowerCase();
  const t = q.trim().toLowerCase();
  return [t, t.replace(/s$/, ""), t.replace(/ies$/, "y")].some((v) => v && hay.includes(v));
};

export default function ProductsPage() {
  const { products, status, retry } = useMenu();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const sectionParam = params.get("section");
  const searching = q.trim().length > 0;

  const [view, setView] = useState({ section: FEATURED, sub: null });
  const [expanded, setExpanded] = useState(() => new Set());
  const [filters, setFilters] = useState(() => new Set(["instock"]));
  const [sort, setSort] = useState("relevance");
  const [sortOpen, setSortOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const sortRef = useRef(null);

  useEffect(() => {
    document.title = `Menu – ${brand.name}`;
  }, []);

  useEffect(() => {
    if (!sortOpen) return;
    const onDown = (e) => {
      if (!sortRef.current?.contains(e.target)) setSortOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setSortOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [sortOpen]);

  // Sidebar structure: Featured, then meal types; cuisines become sub-sections.
  const sections = useMemo(() => {
    const map = new Map();
    map.set(FEATURED, products.filter((p) => p.bestseller));
    for (const p of products) {
      if (!map.has(p.section)) map.set(p.section, []);
      map.get(p.section).push(p);
    }
    const rank = (n) => (SECTION_ORDER.indexOf(n) < 0 ? 99 : SECTION_ORDER.indexOf(n));
    return [...map.keys()]
      .sort((a, b) => rank(a) - rank(b))
      .map((name) => {
        const items = map.get(name);
        const cuisines = name === FEATURED ? [] : [...new Set(items.map((i) => i.cuisine))];
        const children =
          cuisines.length > 1
            ? cuisines.map((c) => ({ name: c, count: items.filter((i) => i.cuisine === c).length }))
            : [];
        return { name, items, children };
      });
  }, [products]);

  // /products?section=Desserts selects that section.
  useEffect(() => {
    if (!sectionParam || !sections.length) return;
    const found = sections.find((s) => s.name.toLowerCase() === sectionParam.toLowerCase());
    if (found) setView({ section: found.name, sub: null });
  }, [sectionParam, sections]);

  const base = useMemo(() => {
    if (searching) return products.filter((p) => matches(p, q));
    const s = sections.find((x) => x.name === view.section);
    if (!s) return [];
    return view.sub ? s.items.filter((p) => p.cuisine === view.sub) : s.items;
  }, [searching, products, q, sections, view]);

  const visible = useMemo(() => {
    const active = FILTERS.filter((f) => filters.has(f.key));
    let list = base.filter((p) => active.every((f) => f.test(p)));
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [base, filters, sort]);

  const clearSearch = () => {
    if (!q) return;
    setParams(
      (prev) => {
        const n = new URLSearchParams(prev);
        n.delete("q");
        return n;
      },
      { replace: true }
    );
  };

  const select = (section, sub = null) => {
    clearSearch();
    setView({ section, sub });
    if (sub === null) setExpanded((prev) => new Set(prev).add(section));
  };

  const toggleExpanded = (name) =>
    setExpanded((prev) => {
      const n = new Set(prev);
      n.has(name) ? n.delete(name) : n.add(name);
      return n;
    });

  const toggleFilter = (key) =>
    setFilters((prev) => {
      const n = new Set(prev);
      if (n.has(key)) {
        n.delete(key);
      } else {
        n.add(key);
        if (key === "veg") n.delete("nonveg");
        if (key === "nonveg") n.delete("veg");
      }
      return n;
    });

  const clearAll = () => {
    setFilters(new Set());
    setSort("relevance");
    setSortOpen(false);
  };

  const heading = searching ? `Results for “${q.trim()}”` : view.section;
  const sub = !searching && view.sub ? view.sub : null;

  let content;
  if (status === "loading") {
    content = (
      <div className="pgrid" aria-busy="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="pcard pcard--skeleton" key={i} />
        ))}
      </div>
    );
  } else if (status === "error") {
    content = (
      <div className="shop-empty">
        <p>We couldn’t load the menu. Check your connection and try again.</p>
        <button type="button" className="btn-dark" onClick={retry}>Retry</button>
      </div>
    );
  } else if (visible.length === 0) {
    content = (
      <div className="shop-empty">
        <p>No dishes match these filters.</p>
        <button type="button" className="btn-dark" onClick={clearAll}>Clear filters</button>
      </div>
    );
  } else {
    content = (
      <div className="pgrid">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={setSelected} />
        ))}
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="container shop">
        <nav className="menu-side" aria-label="Menu sections">
          <h2>Menu</h2>
          <ul>
            {sections.map((s) => {
              const isOpen = expanded.has(s.name);
              const active = !searching && view.section === s.name && view.sub === null;
              return (
                <li key={s.name}>
                  <div className={`menu-row ${active ? "is-active" : ""}`}>
                    <button
                      type="button"
                      className="menu-row__main"
                      aria-current={active ? "true" : undefined}
                      onClick={() => select(s.name)}
                    >
                      {s.name}
                    </button>
                    {s.children.length > 0 && (
                      <button
                        type="button"
                        className="menu-row__toggle"
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Collapse" : "Expand"} ${s.name}`}
                        onClick={() => toggleExpanded(s.name)}
                      >
                        {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                      </button>
                    )}
                    <span className="menu-row__count">{s.items.length}</span>
                  </div>

                  {isOpen && s.children.length > 0 && (
                    <ul className="menu-sub">
                      {s.children.map((c) => {
                        const childActive = !searching && view.section === s.name && view.sub === c.name;
                        return (
                          <li key={c.name}>
                            <div className={`menu-row ${childActive ? "is-active" : ""}`}>
                              <button
                                type="button"
                                className="menu-row__main"
                                aria-current={childActive ? "true" : undefined}
                                onClick={() => select(s.name, c.name)}
                              >
                                {c.name}
                              </button>
                              <span className="menu-row__count">{c.count}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <section className="shop-main" aria-label="Dishes">
          <div className="shop-filters">
            <div className="filters-btn-wrap" ref={sortRef}>
              <button
                type="button"
                className="chip-btn"
                aria-haspopup="true"
                aria-expanded={sortOpen}
                onClick={() => setSortOpen((o) => !o)}
              >
                <SlidersHorizontal size={16} aria-hidden="true" /> Filters
                {filters.size > 0 && <span className="badge">{filters.size}</span>}
              </button>

              {sortOpen && (
                <div className="sort-pop">
                  <h3>Sort by</h3>
                  {SORTS.map((s) => (
                    <label key={s.key}>
                      <input
                        type="radio"
                        name="sort"
                        checked={sort === s.key}
                        onChange={() => setSort(s.key)}
                      />
                      {s.label}
                    </label>
                  ))}
                  <button type="button" className="clear" onClick={clearAll}>Clear all filters</button>
                </div>
              )}
            </div>

            <div className="chips-scroll">
              {FILTERS.map((f) => {
                const on = filters.has(f.key);
                return (
                  <button
                    key={f.key}
                    type="button"
                    className="chip-btn"
                    aria-pressed={on}
                    onClick={() => toggleFilter(f.key)}
                  >
                    {f.key === "veg" && <VegMark veg decorative />}
                    {f.key === "nonveg" && <VegMark veg={false} decorative />}
                    {ICONS[f.key]}
                    {f.label}
                    {f.key === "instock" && on && <X size={14} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="shop-head">
            <h2>
              {heading}
              {sub && <span> — {sub}</span>}
            </h2>
            <p aria-live="polite">
              {status === "ready" ? `${visible.length} ${visible.length === 1 ? "item" : "items"}` : ""}
            </p>
          </div>

          {content}
        </section>
      </div>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}