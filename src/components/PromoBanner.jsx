import Reveal from "./Reveal";
import { promo } from "../data";
import { useStore } from "../context/StoreContext";

export default function PromoBanner() {
  const { setModal } = useStore();

  return (
    <section className="bg-mint promo">
      <Reveal className="container">
        <div className="promo__box">
          <h2 className="promo__title">{promo.title}</h2>
          <div className="promo__panel">
            <p>{promo.text}</p>
            <button type="button" className="promo__btn" onClick={() => setModal("login")}>
              {promo.cta}
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}