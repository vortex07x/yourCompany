// Simple stand-in for the hand-drawn street scene. Replace with the real artwork later.
export default function StreetIllustration() {
  return (
    <svg
      className="street"
      viewBox="0 0 900 330"
      role="img"
      aria-label="Illustration of a colourful street of shops"
    >
      <defs>
        <pattern id="win" width="26" height="30" patternUnits="userSpaceOnUse">
          <rect x="6" y="6" width="14" height="18" rx="7" fill="#fff" opacity=".85" />
        </pattern>
      </defs>

      <rect x="60" y="268" width="800" height="2" fill="#9BD3E8" />

      {/* pink shop */}
      <rect x="150" y="120" width="130" height="150" fill="#F6C6D0" />
      <polygon points="140,120 215,80 290,120" fill="#C0503F" />
      <rect x="150" y="130" width="130" height="70" fill="url(#win)" />
      <rect x="165" y="215" width="100" height="55" rx="4" fill="#fff" opacity=".85" />

      {/* mint arch building */}
      <rect x="290" y="90" width="150" height="180" fill="#A8DCD0" />
      <rect x="282" y="70" width="166" height="24" fill="#D84B4B" />
      <rect x="300" y="105" width="130" height="60" fill="url(#win)" />
      <path d="M335 270 v-70 a30 40 0 0 1 60 0 v70z" fill="#fff" opacity=".9" />

      {/* blue building */}
      <rect x="440" y="110" width="110" height="160" fill="#5DA9E9" />
      <polygon points="432,110 495,80 558,110" fill="#8C6F5F" />
      <rect x="450" y="125" width="90" height="110" fill="url(#win)" />

      {/* yellow building */}
      <rect x="550" y="150" width="140" height="120" fill="#F6D44D" />
      <rect x="540" y="135" width="160" height="20" fill="#D9453D" />
      <rect x="550" y="200" width="140" height="6" fill="#fff" opacity=".9" />
      <rect x="560" y="165" width="120" height="30" fill="url(#win)" />

      {/* tree and car */}
      <rect x="116" y="225" width="8" height="45" fill="#7A5A44" />
      <circle cx="120" cy="215" r="26" fill="#4FA672" />
      <rect x="700" y="238" width="96" height="32" rx="9" fill="#1E2A44" />
      <path d="M716 238 q14 -26 46 -26 h12 q10 0 14 26z" fill="#F6D44D" />
      <circle cx="730" cy="272" r="9" fill="#14213D" />
      <circle cx="774" cy="272" r="9" fill="#14213D" />
    </svg>
  );
}