import Reveal from "./Reveal";
import Carousel from "./Carousel";
import { testimonials } from "../data";

export default function Testimonials() {
  const slides = testimonials.map((t) => (
    <figure className="t-card" key={t.name}>
      <span className="t-card__mark" aria-hidden="true">“</span>
      <blockquote>{t.quote}</blockquote>
      <figcaption>{t.name}</figcaption>
    </figure>
  ));

  return (
    <section className="testimonials">
      <Reveal className="container">
        <h2 className="section-title">Testimonials</h2>
        <Carousel slides={slides} interval={6000} label="Customer testimonials" />
      </Reveal>
    </section>
  );
}