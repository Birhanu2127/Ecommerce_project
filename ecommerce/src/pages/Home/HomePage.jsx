import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid.jsx";
import "./HomePage.css";
export function HomePage({ Cart, loadCart }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // fetch the products data from the backend server
    axios.get("http://localhost:3000/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  // Split products into chunks for demo sections
  const section1 = products.slice(0, 4);
  const section2 = products.slice(4, 8);
  const section3 = products.slice(8, 12);
  const section4 = products.slice(12);

  return (
    <>
      <title>Ecommerce Project</title>
      <Header Cart={Cart} />

      <div className="home-page">
        <ProductsGrid products={section1} loadCart={loadCart} title="Recommended for You" />
        <ProductsGrid products={section2} loadCart={loadCart} title="New Arrivals" />
        <ProductsGrid products={section3} loadCart={loadCart} title="Best Sellers" />
        {section4.length > 0 && <ProductsGrid products={section4} loadCart={loadCart} title="More Items" />}
      </div>
    </>
  );
}
