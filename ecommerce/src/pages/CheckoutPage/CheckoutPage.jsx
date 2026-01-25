import axios from "axios";
import { useState, useEffect } from "react";
import { OrderSummery } from "./OrderSummery";
import { PaymentSummery } from "./PaymentSummery";
import "./checkout-header.css";
import "./CheckoutPage.css";
export function CheckoutPage({ Cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummery, setPaymentSummery] = useState([]);
  useEffect(() => {
    // fetch the delivery options data from the backend server
    const fetchDeliveryOptions = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime`
      );
      setDeliveryOptions(response.data);
    };
    fetchDeliveryOptions();
    /*    axios
      .get(
        `http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime`
      )
      .then((response) => {
        setDeliveryOptions(response.data);
      });*/
    const fetchPaymentSummery = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/payment-summary`
      );

      setPaymentSummery(response.data);
    };
    fetchPaymentSummery();
  }, []);
  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/amazon.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              3 items
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummery Cart={Cart} deliveryOptions={deliveryOptions} />

          <PaymentSummery paymentSummery={paymentSummery} />
        </div>
      </div>
    </>
  );
}
