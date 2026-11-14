import { useEffect, useRef } from "react";
import { X } from "lucide-react";

// Shared shell for the cart drawer and dialogs. `bare` = no header bar (product popup).
export default function Modal({ title, onClose, side = false, bare = false, children }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const previous = document.activeElement;
    dialogRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") closeRef.current();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, []);

  return (
    <div
      className={`overlay ${side ? "overlay--side" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeRef.current();
      }}
    >
      <div
        ref={dialogRef}
        className={`dialog ${side ? "dialog--side" : ""} ${bare ? "dialog--bare" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={bare ? title : undefined}
        aria-labelledby={bare ? undefined : "dialog-title"}
        tabIndex={-1}
      >
        {bare ? (
          <>
            <button
              type="button"
              className="icon-close icon-close--float"
              aria-label="Close"
              onClick={onClose}
            >
              <X size={22} />
            </button>
            {children}
          </>
        ) : (
          <>
            <div className="dialog__head">
              <h2 id="dialog-title">{title}</h2>
              <button type="button" className="icon-close" aria-label="Close" onClick={onClose}>
                <X size={22} />
              </button>
            </div>
            <div className="dialog__body">{children}</div>
          </>
        )}
      </div>
    </div>
  );
}