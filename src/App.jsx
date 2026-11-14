import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductsPage from "./pages/ProductsPage";
import StoreLocator from "./pages/StoreLocator";
import Contact from "./pages/Contact";
import BlogPage from "./pages/BlogPage";
import BlogPost from "./pages/BlogPost";
import ComingSoon from "./pages/ComingSoon";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="store-locator" element={<StoreLocator />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blogs" element={<BlogPage />} />
        <Route path="blogs/:slug" element={<BlogPost />} />
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}