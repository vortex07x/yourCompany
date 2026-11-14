// A labeled block that stands in for a photo. Pass `image` to show a real one.
export default function Placeholder({ label, tone, image, className = "" }) {
  if (image) {
    return <img className={`ph-img ${className}`} src={image} alt={label} />;
  }
  return (
    <div
      className={`ph ${className}`}
      style={tone ? { background: tone } : undefined}
      role="img"
      aria-label={label}
    >
      <span>{label}</span>
    </div>
  );
}