import { useEffect, useState } from "react";
import { Check, Mail, Phone } from "lucide-react";
import { brand, contact } from "../data";

const BLANK = { first: "", last: "", mobile: "", email: "", zip: "", date: "", time: "", city: "" };
const TIMES = ["Morning (9 AM – 12 PM)", "Afternoon (12 PM – 4 PM)", "Evening (4 PM – 9 PM)"];

const need = (v) => (v.trim() ? "" : "This field is required.");
// Required fields only. Date and time are optional.
const RULES = {
  first: need,
  last: need,
  mobile: (v) => (/^\d{10}$/.test(v) ? "" : "Enter a 10-digit mobile number."),
  email: (v) => (/^\S+@\S+\.\S+$/.test(v.trim()) ? "" : "Enter a valid email address."),
  zip: (v) => (/^\d{6}$/.test(v) ? "" : "Enter a 6-digit pincode."),
  city: need,
};

function Postcard() {
  return (
    <svg className="cu-postcard" viewBox="0 0 180 150" aria-hidden="true">
      <circle cx="90" cy="75" r="68" fill="#fff" opacity="0.7" />
      <g transform="rotate(-18 90 75)">
        <rect x="28" y="38" width="124" height="80" rx="4" fill="#f3efc9" stroke="#c9c28a" />
        <rect x="112" y="46" width="30" height="24" fill="#9ec3d8" stroke="#7aa6bd" />
        <path d="M90 52v52M40 80h40M40 92h40M40 104h30" stroke="#c9c28a" />
      </g>
    </svg>
  );
}

export default function Contact() {
  const [values, setValues] = useState(BLANK);
  const [touched, setTouched] = useState(() => new Set());
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = `Contact Us – ${brand.name}`;
  }, []);

  const errors = Object.fromEntries(Object.entries(RULES).map(([k, rule]) => [k, rule(values[k])]));
  const shown = (k) => (submitted || touched.has(k) ? (errors[k] ?? "") : "");
  const set = (k, v) => setValues((prev) => ({ ...prev, [k]: v }));
  const blur = (k) => setTouched((prev) => new Set(prev).add(k));
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD, local time

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const bad = Object.keys(RULES).find((k) => errors[k]);
    if (bad) {
      document.getElementById(`c-${bad}`)?.focus();
      return;
    }
    setSent(true);
  };

  const reset = () => {
    setValues(BLANK);
    setTouched(new Set());
    setSubmitted(false);
    setSent(false);
  };

  // One labelled row. `digits` strips non-digits and caps the length.
  const row = (key, label, { required = true, digits = 0, ...input } = {}) => {
    const err = shown(key);
    return (
      <div className="cu-row">
        <label htmlFor={`c-${key}`}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
        <div>
          <div className={`field ${err ? "is-invalid" : ""}`}>
            <input
              id={`c-${key}`}
              value={values[key]}
              onChange={(e) => set(key, digits ? e.target.value.replace(/\D/g, "").slice(0, digits) : e.target.value)}
              onBlur={() => blur(key)}
              aria-required={required}
              aria-invalid={err ? "true" : undefined}
              aria-describedby={err ? `c-${key}-err` : undefined}
              {...input}
            />
          </div>
          {err && <p className="err" id={`c-${key}-err`}>{err}</p>}
        </div>
      </div>
    );
  };

  return (
    <div className="cu">
      <div className="container">
        <h1 className="page-subtitle">Contact Us</h1>
        <div className="diamonds"><i /><i /><i /><i /></div>
        <p className="lede">We would love to hear from you. Share your thoughts and queries with us!</p>

        <div className="cu__grid">
          <div className="cu__form">
            {sent ? (
              <div className="cu-sent" role="status">
                <Check size={32} />
                <p>Thanks, {values.first}. This is a preview, so your message wasn’t actually sent.</p>
                <button type="button" className="btn-line" onClick={reset}>Send another</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                {row("first", "First Name", { placeholder: "Enter First Name", autoComplete: "given-name" })}
                {row("last", "Last Name", { placeholder: "Enter Last Name", autoComplete: "family-name" })}
                {row("mobile", "Mobile", { placeholder: "Enter Mobile", digits: 10, inputMode: "numeric", autoComplete: "tel-national" })}
                {row("email", "Email", { placeholder: "Enter Email", type: "email", autoComplete: "email" })}
                {row("zip", "Zip Code", { placeholder: "Enter Zip Code", digits: 6, inputMode: "numeric", autoComplete: "postal-code" })}
                {row("date", "Requirement Date", { required: false, type: "date", min: today })}

                <div className="cu-row">
                  <label htmlFor="c-time">Requirement Time</label>
                  <div className="field">
                    <select id="c-time" value={values.time} onChange={(e) => set("time", e.target.value)}>
                      <option value="">Select Requirement Time</option>
                      {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {row("city", "City", { placeholder: "Enter City", autoComplete: "address-level2" })}

                <div className="cu__actions">
                  <button type="submit" className="btn-dark">Submit</button>
                  <button type="button" className="btn-line" onClick={reset}>Reset</button>
                </div>
              </form>
            )}
          </div>

          <aside className="cu-info" aria-label="Company details">
            <Postcard />
            <h2>{contact.company}</h2>

            <h3>Registered Address:</h3>
            <p>{contact.address.map((line) => <span key={line} className="cu-line">{line}</span>)}</p>

            <h3>Grievance &amp; Nodal Officer:</h3>
            <p>
              <span className="cu-line">{contact.officer.name},</span>
              <span className="cu-line">{contact.officer.role}</span>
            </p>

            <h3>Contact Details:</h3>
            <p className="cu-contact">
              <Phone size={20} aria-hidden="true" />
              <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
            </p>
            <p className="cu-contact">
              <Mail size={20} aria-hidden="true" />
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}