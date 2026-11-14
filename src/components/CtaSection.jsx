import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { cta } from "../data";

export default function CtaSection() {
  return (
    <section className="cta">
      <Reveal className="container">
        <h2 className="section-title">{cta.title}</h2>
        <p className="lede">{cta.text}</p>
        <Link to="/about" className="btn-soft">{cta.button}</Link>
      </Reveal>
    </section>
  );
}