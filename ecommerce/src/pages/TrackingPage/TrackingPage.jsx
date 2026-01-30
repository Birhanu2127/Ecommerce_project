import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import './TrackingPage.css';
import { Header } from '../../components/Header';

export function TrackingPage({ Cart }) {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const productId = searchParams.get('productId');

  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) return;
      try {
        const response = await axios.get(`http://localhost:3000/api/orders/${orderId}?expand=products`);
        const orderData = response.data;
        setOrder(orderData);

        if (orderData && orderData.products) {
          const foundProduct = orderData.products.find(p => p.productId === productId || p.id === productId);
          // usage of p.id vs p.productId depends on backend structure, 
          // OrdersPage used product.id which typically maps to a Product ID, 
          // but inside order.products it might be nested or have a different structure.
          // Based on OrdersPage: const product = orderProduct.product; 
          // and fragmentKey = order.id - product.id
          // so we are looking for the product details.

          // In the backend orders.js:
          // return { ...product, product: productDetails }
          // So orderData.products is an array of order-product associations (with quantity etc)
          // and each has a nested .product property with the details.
          // So we should find the order-product entry where productId matches.

          const matchingOrderProduct = orderData.products.find(p => p.productId === productId);
          if (matchingOrderProduct) {
            // We want the quantity from the order-product, and details from the nested product
            setProduct({
              ...matchingOrderProduct.product,
              quantity: matchingOrderProduct.quantity,
              estimatedDeliveryTimeMs: matchingOrderProduct.estimatedDeliveryTimeMs
            });
          }
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    }
    fetchOrder();
  }, [orderId, productId]);

  if (!order || !product) {
    return (
      <>
        <title>Order Tracking</title>
        <Header Cart={Cart} />
        <div className="tracking-page">
          <div className="order-tracking">
            Loading...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <title>Order Tracking</title>
      <Header Cart={Cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {dayjs(product.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {product.name}
          </div>

          <div className="product-info">
            Quantity: {product.quantity}
          </div>

          <img className="product-image" src={product.image} alt={product.name} />

          <div className="progress-labels-container">
            <div className="progress-label">
              Preparing
            </div>
            <div className="progress-label current-status">
              Shipped
            </div>
            <div className="progress-label">
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}