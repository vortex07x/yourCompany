import { useCallback, useEffect, useState } from "react";

const URL = "https://dummyjson.com/recipes?limit=50";
let cache = null; // keeps the menu when you navigate away and back

const NON_VEG = /chicken|beef|lamb|mutton|pork|shrimp|prawn|fish|oyster|bacon|sausage|salmon|tuna|meat/i;
const PRIORITY = ["Dessert", "Beverage", "Snack", "Snacks", "Appetizer", "Breakfast", "Lunch", "Dinner", "Side Dish"];
const LABELS = {
  Dessert: "Desserts",
  Beverage: "Beverages",
  Snack: "Snacks",
  Snacks: "Snacks",
  Appetizer: "Starters",
  Breakfast: "Breakfast",
  Lunch: "Lunch",
  Dinner: "Dinner",
  "Side Dish": "Sides",
};

const joinList = (items) =>
  items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}` : items[0] ?? "";

// DummyJSON recipes have no prices or stock, so everything below is derived (sample data only).
function toProduct(r) {
  const raw = r.ingredients ?? [];
  const ingredients = raw.map((i) => {
    const s = i.split(",")[0].replace(/\s*\(.*\)/, "").trim();
    return s.charAt(0).toLowerCase() + s.slice(1);
  });
  const veg = (r.tags ?? []).includes("Vegetarian") || !NON_VEG.test(raw.join(" "));

  const cals = r.caloriesPerServing ?? 250;
  const base = Math.round((140 + cals * 0.9 + (r.prepTimeMinutes ?? 15) * 2) / 5) * 5;
  const offer = r.id % 3 === 0;
  const price = offer ? Math.round((base * 0.85) / 5) * 5 : base;
  const minutes = (r.prepTimeMinutes ?? 0) + (r.cookTimeMinutes ?? 0);

  const type = PRIORITY.find((t) => r.mealType?.includes(t)) ?? r.mealType?.[0] ?? "Other";
  const rating = r.rating ?? 0;
  const reviews = r.reviewCount ?? 0;

  return {
    id: `dj-${r.id}`,
    name: r.name,
    image: r.image,
    price,
    mrp: offer ? base : null,
    veg,
    rating,
    reviews,
    cuisine: r.cuisine ?? "Other",
    tags: r.tags ?? [],
    section: LABELS[type] ?? type,
    offer,
    isNew: r.id >= 44,
    bestseller: rating >= 4.7 && reviews >= 50,
    highlyOrdered: reviews >= 80,
    inStock: r.id % 9 !== 0,
    description: `Made with ${joinList(ingredients.slice(0, 4))} and more. Serves ${r.servings ?? 2}, about ${cals} kcal per serving${
      minutes ? `, ready in ${minutes} minutes` : ""
    }.`,
  };
}

export default function useMenu() {
  const [state, setState] = useState({
    products: cache ?? [],
    status: cache ? "ready" : "loading",
  });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, status: "loading" }));
    try {
      const res = await fetch(URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { recipes } = await res.json();
      cache = recipes.map(toProduct);
      setState({ products: cache, status: "ready" });
    } catch {
      setState({ products: [], status: "error" });
    }
  }, []);

  useEffect(() => {
    if (!cache) load();
  }, [load]);

  return { ...state, retry: load };
}