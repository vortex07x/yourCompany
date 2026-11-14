import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { brand, posts } from "../data";
import { formatDate } from "../utils/blog";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    document.title = `${post ? post.title : "Article not found"} – ${brand.name}`;
  }, [post]);

  return (
    <div className="blog">
      <div className="container article">
        <Link to="/blogs" className="article__back">
          <ArrowLeft size={16} aria-hidden="true" /> All articles
        </Link>

        {post ? (
          <article>
            <span className="post__eyebrow">Articles</span>
            <h1>{post.title}</h1>
            <p className="article__meta">{formatDate(post.date)} · {post.mins} min read</p>
            <img className="article__img" src={post.image} alt="" />
            {post.body.map((para) => <p key={para}>{para}</p>)}
          </article>
        ) : (
          <div className="shop-empty">
            <p>We couldn’t find that article.</p>
            <Link to="/blogs" className="btn-dark btn-link">Back to the blog</Link>
          </div>
        )}
      </div>
    </div>
  );
}