export default function VegMark({ veg, decorative = false }) {
  const a11y = decorative
    ? { "aria-hidden": "true" }
    : { role: "img", "aria-label": veg ? "Vegetarian" : "Non-vegetarian" };
  return <span className={`veg-mark ${veg ? "is-veg" : "is-nonveg"}`} {...a11y} />;
}