import { useEffect } from "react";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import Products from "../components/Products";
import PromoBanner from "../components/PromoBanner";
import Testimonials from "../components/Testimonials";
import CtaSection from "../components/CtaSection";
import { brand } from "../data";

export default function Home() {
  useEffect(() => {
    document.title = `${brand.name} – Store design preview`;
  }, []);

  return (
    <>
      <Hero />
      <Intro />
      <Products />
      <PromoBanner />
      <Testimonials />
      <CtaSection />
    </>
  );
}