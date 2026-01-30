import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { formatMoney } from "../../utils/money";
import "./OrdersPage.css";
import dayjs from "dayjs";
export function OrdersPage({ Cart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // fetch the orders data from the backend server
    const fetchOrders = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/orders?expand=products"
      );
      setOrders(response.data);
    }
    fetchOrders();
  }, []);
  return (
    <>
      <title>Orders</title>
      <Header Cart={Cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>
                        {dayjs(order.orderTimeMs).format("MMMM D, YYYY")}
                      </div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderProduct) => {
                    const product = orderProduct.product;
                    const fragmentKey = `${order.id}-${product.id}`;
                    return (
                      <Fragment key={fragmentKey}>
                        <div className="product-image-container">
                          <img src={product.image} alt={product.name} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">{product.name}</div>
                          <div className="product-delivery-date">
                            Arriving on:{" "}
                            {dayjs(product.estimatedDeliveryTimeMs).format(
                              "MMMM D"
                            )}
                          </div>
                          <div className="product-quantity">
                            Quantity: {orderProduct.quantity}
                          </div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                              alt="buy again"
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <Link to={`/tracking?orderId=${order.id}&productId=${product.id}`}>
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </Link>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
