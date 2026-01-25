import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid.jsx";
import "./HomePage.css";
export function HomePage({ Cart }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // fetch the products data from the backend server
    axios.get("http://localhost:3000/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <>
      <title>Ecommerce Project</title>
      <Header Cart={Cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
