import { Mail, Phone, Sparkles, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { brand, footer } from "../data";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.7V21h2.8z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <Reveal className="container">
        <div className="ai-row">
          <div className="ai-row__text">
            <Sparkles size={20} aria-hidden="true" />
            <div>
              <strong>Summarise {brand.name} with AI</strong>
              <small>Menu, bestsellers, offers and nearest store in one answer</small>
            </div>
          </div>
          <div className="ai-chips">
            {footer.ai.map((name) => (
              <a href="#contact" className="chip" key={name}>
                <ArrowUpRight size={14} aria-hidden="true" /> {name}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__cards">
          <div className="fcard">
            <h4>Get in touch</h4>
            <div className="contact">
              <span className="contact__icon"><Mail size={20} /></span>
              <div>
                <small>Customer Support</small>
                <strong>{brand.email}</strong>
              </div>
            </div>
            <div className="contact">
              <span className="contact__icon"><Phone size={20} /></span>
              <div>
                <small>Call us</small>
                <strong>{brand.phone}</strong>
              </div>
            </div>
            <div className="social">
              <a href="#contact" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#contact" aria-label="Instagram"><InstagramIcon /></a>
            </div>
          </div>

          <div className="fcard">
            <h4>We accept</h4>
            <div className="pay">
              {footer.payments.map((p) => <span key={p}>{p}</span>)}
            </div>

            <h4 className="fcard__sub">Get the app</h4>
            <div className="app">
              <div className="qr" aria-label="QR code placeholder">QR</div>
              <div>
                <strong>Scan to Download</strong>
                <small>Available on iOS &amp; Android</small>
              </div>
            </div>
          </div>
        </div>

        <div className="links">
          <h4>Useful links</h4>
          {footer.links.map((l) => (
            <a href="#contact" key={l}>{l}</a>
          ))}
        </div>
      </Reveal>
    </footer>
  );
}