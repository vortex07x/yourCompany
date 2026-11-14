import { useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Search, Mic } from "lucide-react";
import { categories, navLinks } from "../data";

const ITEMS = (() => {
  const seen = new Set();
  return [
    ...categories.map((c) => ({
      label: c.label,
      type: "Collection",
      to: `/products?q=${encodeURIComponent(c.label)}`,
    })),
    ...navLinks
      .filter((l) => l.label !== "Home")
      .map((l) => ({ label: l.label, type: "Page", to: l.to })),
  ].filter((i) => (seen.has(i.label) ? false : seen.add(i.label)));
})();

export default function SearchBox() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params, setParams] = useSearchParams();
  const menuMode = pathname === "/products";

  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(-1);

  const value = menuMode ? params.get("q") ?? "" : q;

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return term ? ITEMS.filter((i) => i.label.toLowerCase().includes(term)).slice(0, 6) : [];
  }, [q]);

  const go = (item) => {
    setOpen(false);
    setQ("");
    navigate(item.to);
  };

  const onChange = (e) => {
    const v = e.target.value;
    if (menuMode) {
      setParams(
        (prev) => {
          const n = new URLSearchParams(prev);
          v ? n.set("q", v) : n.delete("q");
          return n;
        },
        { replace: true }
      );
      return;
    }
    setQ(v);
    setOpen(true);
    setCursor(-1);
  };

  const onKeyDown = (e) => {
    if (menuMode) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, -1));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showList = !menuMode && open && q.trim();

  return (
    <form
      className="search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (!menuMode && results.length) go(results[cursor >= 0 ? cursor : 0]);
      }}
    >
      <Search size={18} aria-hidden="true" />
      <input
        type="search"
        value={value}
        placeholder={menuMode ? "Search the menu for dishes, cuisines or tags" : "Search for items, collections or pages"}
        aria-label={menuMode ? "Search the menu" : "Search"}
        role={menuMode ? undefined : "combobox"}
        aria-expanded={menuMode ? undefined : open && results.length > 0}
        aria-controls={menuMode ? undefined : "search-results"}
        aria-autocomplete={menuMode ? undefined : "list"}
        onChange={onChange}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
      />
      <Mic size={18} className="search__mic" aria-hidden="true" />

      {showList && (
        <ul className="search__list" id="search-results" role="listbox">
          {results.length ? (
            results.map((r, i) => (
              <li key={r.label} role="option" aria-selected={i === cursor}>
                <button
                  type="button"
                  tabIndex={-1}
                  className={i === cursor ? "is-active" : ""}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => go(r)}
                >
                  {r.label}
                  <small>{r.type}</small>
                </button>
              </li>
            ))
          ) : (
            <li className="search__none">No matches for “{q}”. Try “pizza” or “about”.</li>
          )}
        </ul>
      )}
    </form>
  );
}