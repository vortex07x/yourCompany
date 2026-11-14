import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { brand, posts } from "../data";
import { formatDate } from "../utils/blog";

// The title link is stretched over the whole card (see .post__title a::after),
// so the card is one tab stop.
export default function BlogPage() {
  useEffect(() => {
    document.title = `Blog – ${brand.name}`;
  }, []);

  return (
    <div className="blog">
      <div className="container">
        <h1 className="blog__title">Explore our blog | {brand.name}</h1>

        <div className="blog__grid">
          {posts.map((p) => (
            <article className="post" key={p.slug}>
              <img className="post__img" src={p.image} alt="" loading="lazy" />
              <div className="post__body">
                <span className="post__eyebrow">Articles</span>
                <h2 className="post__title">
                  <Link to={`/blogs/${p.slug}`}>{p.title}</Link>
                </h2>
                <div className="post__foot">
                  <span>{formatDate(p.date)} · {p.mins} min read</span>
                  <span className="post__read" aria-hidden="true">
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}