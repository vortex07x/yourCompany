import { useState } from "react";
import { Minus, Plus, Trash2, Check } from "lucide-react";
import Modal from "./Modal";
import { useStore } from "../context/StoreContext";
import { money } from "../utils/format";

// const money = (n) => `Rs. ${n.toLocaleString("en-IN")}`;

// Preview-only: lets clients see the cart filled before real "Add to cart" buttons exist.
const SAMPLE = { id: "sample-1", name: "Sample gift hamper", price: 1299, tone: "#F6D4CF" };

function CartDrawer() {
  const { items, total, changeQty, removeItem, addItem, setModal } = useStore();
  const [note, setNote] = useState(false);

  return (
    <Modal title="Your cart" side onClose={() => setModal(null)}>
      {items.length === 0 ? (
        <div className="empty">
          <p><strong>Your cart is empty.</strong></p>
          <p>Add something from Our Products and it will show up here.</p>
          <button type="button" className="btn-soft" onClick={() => addItem(SAMPLE)}>
            Add a sample item
          </button>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li className="cart-item" key={item.id}>
                <div
                  className="cart-item__img"
                  style={{ background: item.image ? `center / cover url(${item.image})` : item.tone }}
                />
                <div>
                  <h3>{item.name}</h3>
                  <p>{money(item.price)}</p>
                  <div className="qty">
                    <button type="button" aria-label={`Decrease ${item.name}`} onClick={() => changeQty(item.id, -1)}>
                      <Minus size={14} />
                    </button>
                    <span aria-live="polite">{item.qty}</span>
                    <button type="button" aria-label={`Increase ${item.name}`} onClick={() => changeQty(item.id, 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="cart-item__remove"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-foot">
            <div className="cart-total">
              <span>Subtotal</span>
              <strong>{money(total)}</strong>
            </div>
            <button type="button" className="btn-dark" onClick={() => setNote(true)}>
              Check out
            </button>
            {note && <p className="hint">Checkout is not part of this preview.</p>}
          </div>
        </>
      )}
    </Modal>
  );
}

function LoginModal() {
  const { setModal } = useStore();
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const valid = /^\d{10}$/.test(phone);

  return (
    <Modal title="Log in" onClose={() => setModal(null)}>
      {sent ? (
        <div className="sent">
          <Check size={32} />
          <p>OTP sent to +91 {phone}. This is a preview, so no message is actually sent.</p>
          <button type="button" className="btn-dark" onClick={() => setModal(null)}>Done</button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (valid) setSent(true);
          }}
          noValidate
        >
          <label htmlFor="phone">Mobile number</label>
          <div className="field">
            <span>+91</span>
            <input
              id="phone"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              placeholder="10-digit number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            />
          </div>
          {phone && !valid && <p className="err">Enter a 10-digit mobile number.</p>}
          <button type="submit" className="btn-dark" disabled={!valid}>Send OTP</button>
        </form>
      )}
    </Modal>
  );
}

function LocationModal() {
  const { setLocation, setModal } = useStore();
  const [pin, setPin] = useState("");
  const valid = /^\d{6}$/.test(pin);

  const save = (value) => {
    setLocation(value);
    setModal(null);
  };

  return (
    <Modal title="Set your location" onClose={() => setModal(null)}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) save(`PIN ${pin}`);
        }}
        noValidate
      >
        <label htmlFor="pin">Delivery pincode</label>
        <div className="field">
          <input
            id="pin"
            inputMode="numeric"
            maxLength={6}
            placeholder="6-digit pincode"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          />
        </div>
        {pin && !valid && <p className="err">Enter a 6-digit pincode.</p>}
        <button type="submit" className="btn-dark" disabled={!valid}>Confirm location</button>
      </form>
      <button type="button" className="btn-line" onClick={() => save("Current location")}>
        Use my current location
      </button>
    </Modal>
  );
}

const STEPS = ["Order placed", "Being baked", "Out for delivery", "Delivered"];

function TrackModal() {
  const { setModal } = useStore();
  const [id, setId] = useState("");
  const [shown, setShown] = useState(false);

  return (
    <Modal title="Track your order" onClose={() => setModal(null)}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (id.trim()) setShown(true);
        }}
      >
        <label htmlFor="order-id">Order ID</label>
        <div className="field">
          <input
            id="order-id"
            placeholder="e.g. 100234"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setShown(false);
            }}
          />
        </div>
        <button type="submit" className="btn-dark" disabled={!id.trim()}>Track order</button>
      </form>

      {shown && (
        <>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s} className={i <= 1 ? "done" : ""}>{s}</li>
            ))}
          </ol>
          <p className="hint">Sample status for order {id}.</p>
        </>
      )}
    </Modal>
  );
}

export default function Modals() {
  const { modal } = useStore();
  if (modal === "cart") return <CartDrawer />;
  if (modal === "login") return <LoginModal />;
  if (modal === "location") return <LocationModal />;
  if (modal === "track") return <TrackModal />;
  return null;
}