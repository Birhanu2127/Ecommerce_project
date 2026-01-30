import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { HomePage } from "./pages/Home/HomePage.jsx";
import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage.jsx";
import { OrdersPage } from "./pages/Orders/OrdersPage.jsx";
import { TrackingPage } from "../src/pages/TrackingPage/TrackingPage.jsx";
import "./App.css";

function App() {
  const [Cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/Cart-items?expand=product"
    );
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage Cart={Cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckoutPage Cart={Cart} loadCart={loadCart} />} />
      <Route path="orders" element={<OrdersPage Cart={Cart} loadCart={loadCart} />} />
      <Route path="tracking" element={<TrackingPage Cart={Cart} />} />
    </Routes>
  );
}

export default App;
