import Reveal from "./Reveal";
import Placeholder from "./Placeholder";
import { intro, introImage } from "../data";

export default function Intro() {
  const left = intro.features.slice(0, 2);
  const right = intro.features.slice(2);

  const renderFeature = (f) => (
    <div className="feature" key={f.title}>
      <h3>{f.title}</h3>
      <p>{f.text}</p>
    </div>
  );

  return (
    <section className="section" id="about">
      <Reveal className="container">
        <h2 className="section-title">{intro.title}</h2>
        <p className="lede">{intro.text}</p>

        <div className="intro__grid">
          <div className="intro__col">{left.map(renderFeature)}</div>
          <div className="intro__art">
            <Placeholder label="Storefront" tone="#F6D9D4" image={introImage} />
          </div>
          <div className="intro__col">{right.map(renderFeature)}</div>
        </div>
      </Reveal>
    </section>
  );
}