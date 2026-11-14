import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import Placeholder from "./Placeholder";
import { categories } from "../data";

export default function Products() {
  return (
    <section className="bg-mint products" id="products">
      <Reveal className="container">
        <h2 className="section-title section-title--spaced">Our Products</h2>

        <div className="cards">
          {categories.map((c) => (
            <Link to={`/products?q=${encodeURIComponent(c.label)}`} className="card" key={c.label}>
              <div className="card__img">
                <Placeholder label={c.label} tone={c.tone} image={c.image} />
              </div>
              <span>{c.label}</span>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}