import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid.jsx";
import "./HomePage.css";

export function HomePage({ Cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // fetch the products data from the backend server
    axios.get("http://localhost:3000/api/products").then((response) => {
      setProducts(response.data);
      setFilteredProducts(response.data);
    });
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredProducts(products);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(lowerQuery)
      );
      setFilteredProducts(filtered);
    }
  };

  // If searching (filtered count != distinct total count), maybe show all in one grid?
  // But user asked for "available items" and "section name or title should be in the center"
  // If search is active, we can show a single section "Search Results".
  // Or we can keep the structure if we want. Let's do a single "Search Results" section if searching,
  // otherwise show standard sections.

  const isSearching = products.length !== filteredProducts.length || (filteredProducts.length > 0 && products.length > 0 && products.length === filteredProducts.length && false); // Simplified check: actually just check input value? No access to input value here directly unless state.
  // Better approach: Since we don't have separate "isSearching" state, let's just use filteredProducts.
  // If searching, we might want to just show all results.

  // Actually, to make it simple and robust:
  // Always render sections from filteredProducts.

  let content;
  if (filteredProducts.length < products.length) {
    // Searching
    content = (
      <ProductsGrid products={filteredProducts} loadCart={loadCart} title="Search Results" />
    );
  } else {
    // Default view
    const section1 = filteredProducts.slice(0, 4);
    const section2 = filteredProducts.slice(4, 8);
    const section3 = filteredProducts.slice(8, 12);
    const section4 = filteredProducts.slice(12);

    content = (
      <>
        <ProductsGrid products={section1} loadCart={loadCart} title="Recommended for You" />
        <ProductsGrid products={section2} loadCart={loadCart} title="New Arrivals" />
        <ProductsGrid products={section3} loadCart={loadCart} title="Best Sellers" />
        {section4.length > 0 && <ProductsGrid products={section4} loadCart={loadCart} title="More Items" />}
      </>
    );
  }

  return (
    <>
      <title>Ecommerce Project</title>
      <Header Cart={Cart} onSearch={handleSearch} />

      <div className="home-page">
        <div className="home-page-content">
          {content}
        </div>
      </div>
    </>
  );
}
