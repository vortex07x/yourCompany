import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ slides, interval = 5000, label, arrows = false, className = "" }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = setInterval(() => setIndex((n) => (n + 1) % count), interval);
    return () => clearInterval(timer);
  }, [paused, count, interval]);

  const go = (delta) => setIndex((n) => (n + delta + count) % count);

  return (
    <div
      className={`carousel ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel__stage">
        <div className="carousel__viewport">
          <div className="carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {slides.map((slide, i) => (
              <div className="carousel__slide" key={i} aria-hidden={i !== index}>
                {slide}
              </div>
            ))}
          </div>
        </div>

        {arrows && count > 1 && (
          <>
            <button
              type="button"
              className="carousel__arrow carousel__arrow--prev"
              aria-label="Previous slide"
              onClick={() => go(-1)}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className="carousel__arrow carousel__arrow--next"
              aria-label="Next slide"
              onClick={() => go(1)}
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      <div className="carousel__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={i === index ? "is-active" : ""}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}