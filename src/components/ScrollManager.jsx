import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to the #section in the URL, or to the top when changing pages.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const t = setTimeout(
        () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
        50
      );
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash, key]);

  return null;
}