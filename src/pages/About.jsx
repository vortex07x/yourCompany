import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CakeSlice, Heart, Tag, ShieldCheck, ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import Carousel from "../components/Carousel";
import Placeholder from "../components/Placeholder";
import StreetIllustration from "../components/StreetIllustration";
import { about, brand } from "../data";

const ICONS = { cake: CakeSlice, heart: Heart, tag: Tag, shield: ShieldCheck };

function Diamonds() {
  return (
    <div className="diamonds" aria-hidden="true">
      <i /><i /><i /><i />
    </div>
  );
}

function TeamCard({ member }) {
  const [open, setOpen] = useState(false);
  const bioId = `bio-${member.name.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <article className="team-card">
      <div className="team-card__photo">
        <Placeholder label="Portrait" tone={member.tone} image={member.image} />
      </div>
      <div className="team-card__body">
        <h3>{member.name}</h3>
        <p className="team-card__role">{member.role}</p>
        <p id={bioId} className={`team-card__bio ${open ? "is-open" : ""}`}>{member.bio}</p>
        <button
          type="button"
          className="read-more"
          aria-expanded={open}
          aria-controls={bioId}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Read less" : "Read more"} <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export default function About() {
  useEffect(() => {
    document.title = `About us – ${brand.name}`;
  }, []);

  const slides = about.gallery.map((g) => (
    <div className="gallery__slide" key={g.alt}>
      <Placeholder label={g.alt} image={g.image} />
    </div>
  ));

  return (
    <>
      <section className="about-hero">
        <div className="container">
          <h1 className="page-title">About Us</h1>
          <Diamonds />
          <StreetIllustration />
        </div>
      </section>

      <Reveal as="section" className="container about-text">
        {about.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </Reveal>

      <section className="about-gallery">
        <Reveal className="container">
          <div className="gallery__card">
            <Carousel slides={slides} arrows className="carousel--gallery" label="Store photos" />
          </div>
        </Reveal>
      </section>

      <section className="section">
        <Reveal className="container">
          <h2 className="page-subtitle">Our Promise</h2>
          <Diamonds />
          <div className="promises">
            {about.promises.map((p) => {
              const Icon = ICONS[p.icon];
              return (
                <div className="promise" key={p.title}>
                  <span className={`promise__icon promise__icon--${p.icon}`}>
                    <Icon size={30} aria-hidden="true" />
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      <section className="team">
        <Reveal className="container">
          <h2 className="page-subtitle">Our Team</h2>
          <Diamonds />
          <div className="team__grid">
            {about.team.map((m) => (
              <TeamCard key={m.name} member={m} />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="about-cta">
        <Reveal className="container">
          <h2 className="page-subtitle gold">Like our products?</h2>
          <Diamonds />
          <p className="lede">
            Treat yourself to your favourite products or surprise your loved ones with an edible gift.
          </p>
          <Link to="/#products" className="btn-outline">Order online</Link>
        </Reveal>
      </section>
    </>
  );
}