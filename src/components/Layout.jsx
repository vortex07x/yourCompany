import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTop from "./ScrollTop";
import Modals from "./Modals";
import ScrollManager from "./ScrollManager";

export default function Layout() {
  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const set = () =>
      document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <ScrollManager />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollTop />
      <Modals />
    </>
  );
}