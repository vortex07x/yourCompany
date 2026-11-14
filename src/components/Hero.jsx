import Carousel from "./Carousel";
import { heroSlides } from "../data";
import { Link } from "react-router-dom";

export default function Hero() {
  const slides = heroSlides.map((s, i) => (
    <div
      className={`hero-slide ${s.align === "left" ? "hero-slide--left" : ""}`}
      key={i}
      style={{
        background: s.image
          ? `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), center / cover url(${s.image})`
          : s.bg,
      }}
    >
      {!s.image && <div className="hero-slide__ph">Banner image {i + 1} – replace in data.js</div>}
      <div className="hero-slide__copy">
        <h1>{s.title}</h1>
        <p>{s.sub}</p>
        <Link to="/products" className="hero-slide__cta">{s.cta}</Link>
      </div>
    </div>
  ));

  return (
    <section className="hero" aria-label="Featured offers">
      <Carousel slides={slides} label="Featured offers" />
    </section>
  );
}