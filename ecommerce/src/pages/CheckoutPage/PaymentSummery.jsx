import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "../../utils/money";

export function PaymentSummery({ paymentSummery, loadCart }) {
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/orders", {
        cart: paymentSummery // Backend might reconstruct from DB cart items, but let's see. 
        // Checking server.js/orders.js: 
        // router.post('/', async (req, res) => { const cartItems = await CartItem.findAll(); ... });
        // So no body needed really, it uses server-side cart.
      });

      if (response.status === 201) {
        // Order created successfully
        await loadCart(); // Refresh cart (should be empty now)
        navigate("/orders"); // Redirect to orders
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>
      {paymentSummery && (
        <>
          <div className="payment-summary-row">
            <div>Items ({paymentSummery.totalItems}):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummery.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummery.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummery.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummery.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummery.totalCostCents)}
            </div>
          </div>

          <button
            className="place-order-button button-primary"
            onClick={handlePlaceOrder}
          >
            Place your order
          </button>
        </>
      )}
    </div>
  );
}
