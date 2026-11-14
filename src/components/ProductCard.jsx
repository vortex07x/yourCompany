import VegMark from "./VegMark";
import { money } from "../utils/format";

// The name button is stretched over the whole card (see .pcard__name::after),
// so the entire card is clickable with a single tab stop.
export default function ProductCard({ product: p, onOpen }) {
  return (
    <article className={`pcard ${p.inStock ? "" : "is-out"}`}>
      <div className="pcard__text">
        <div className="pcard__tags">
          <VegMark veg={p.veg} />
          {p.bestseller && <span className="pill">Bestseller</span>}
          {p.isNew && <span className="pill pill--new">New</span>}
        </div>

        <h3>
          <button type="button" className="pcard__name" onClick={() => onOpen(p)}>
            {p.name}
          </button>
        </h3>

        <p className="pcard__price">
          <strong>{money(p.price)}</strong>
          {p.mrp && <s>{money(p.mrp)}</s>}
          <span className="pcard__rating">★ {p.rating.toFixed(1)}</span>
        </p>

        <p className="pcard__desc">{p.description}</p>
        <span className="pcard__more" aria-hidden="true">Read more</span>
      </div>

      <div className="pcard__media">
        <img className="pcard__img" src={p.image} alt="" loading="lazy" />
        <span className="pcard__add" aria-hidden="true">{p.inStock ? "ADD +" : "SOLD OUT"}</span>
      </div>
    </article>
  );
}