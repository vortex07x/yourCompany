import { useState } from "react";
import { Minus, Plus, Share2 } from "lucide-react";
import Modal from "./Modal";
import VegMark from "./VegMark";
import { useStore } from "../context/StoreContext";
import { money } from "../utils/format";

export default function ProductModal({ product: p, onClose }) {
  const { addItem } = useStore();
  const [qty, setQty] = useState(1);
  const [more, setMore] = useState(false);
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: p.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* share sheet dismissed */
    }
  };

  const add = () => {
    addItem({ id: p.id, name: p.name, price: p.price, image: p.image }, qty);
    onClose();
  };

  return (
    <Modal bare title={p.name} onClose={onClose}>
      <img className="pm__img" src={p.image} alt="" />

      <div className="pm__body">
        <div className="pm__top">
          <VegMark veg={p.veg} />
          <button type="button" className="icon-close" aria-label="Share this dish" onClick={share}>
            <Share2 size={18} />
          </button>
          <span className="sr-only" aria-live="polite">{copied ? "Link copied" : ""}</span>
        </div>

        <h2 className="pm__title">{p.name}</h2>
        <p className="pm__price">
          <strong>{money(p.price)}</strong>
          {p.mrp && <s>{money(p.mrp)}</s>}
          <span>★ {p.rating.toFixed(1)} · {p.reviews} ratings</span>
        </p>

        <p className={`pm__desc ${more ? "" : "is-clamped"}`}>{p.description}</p>
        <button type="button" className="pm__more" aria-expanded={more} onClick={() => setMore((m) => !m)}>
          {more ? "Read less" : "Read more"}
        </button>

        <div className="pm__buy">
          <div className="stepper" role="group" aria-label="Quantity">
            <button type="button" aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => setQty((n) => n - 1)}>
              <Minus size={16} />
            </button>
            <span aria-live="polite">{qty}</span>
            <button type="button" aria-label="Increase quantity" disabled={qty >= 10} onClick={() => setQty((n) => n + 1)}>
              <Plus size={16} />
            </button>
          </div>
          <button type="button" className="pm__add" disabled={!p.inStock} onClick={add}>
            {p.inStock ? `Add to Cart · ${money(p.price * qty)}` : "Currently unavailable"}
          </button>
        </div>
      </div>
    </Modal>
  );
}