import { Link, useLocation } from "react-router-dom";

export default function ComingSoon() {
  const { pathname } = useLocation();

  return (
    <section className="coming">
      <div className="container">
        <h1 className="page-title">Coming soon</h1>
        <div className="diamonds" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="lede">The page “{pathname}” isn’t part of this preview yet.</p>
        <Link to="/" className="btn-soft">Back to home</Link>
      </div>
    </section>
  );
}