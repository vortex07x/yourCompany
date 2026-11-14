import { createContext, useContext, useMemo, useState } from "react";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null); // "cart" | "login" | "location" | "track" | null
  const [location, setLocation] = useState("");
  const [orderType, setOrderType] = useState("Delivery");

  const value = useMemo(
    () => ({
      items,
      modal,
      setModal,
      location,
      setLocation,
      orderType,
      setOrderType,
      count: items.reduce((sum, i) => sum + i.qty, 0),
      total: items.reduce((sum, i) => sum + i.qty * i.price, 0),
            addItem(product, qty = 1) {
        setItems((prev) => {
          const found = prev.find((i) => i.id === product.id);
          return found
            ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i))
            : [...prev, { ...product, qty }];
        });
        setModal("cart");
      },
      changeQty(id, delta) {
        setItems((prev) =>
          prev.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0)
        );
      },
      removeItem(id) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      },
    }),
    [items, modal, location, orderType]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);