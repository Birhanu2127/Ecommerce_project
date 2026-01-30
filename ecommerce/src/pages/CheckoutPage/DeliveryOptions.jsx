import dayjs from "dayjs";
import axios from "axios";
import { formatMoney } from "../../utils/money";

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {

  const handleDeliveryOptionChange = async (deliveryOptionId) => {
    try {
      // Update the delivery option for this specific cart item
      await axios.put(`http://localhost:3000/api/cart-items/${cartItem.productId}`, {
        deliveryOptionId: deliveryOptionId
      });

      // Refresh the cart to update totals and UI
      if (loadCart) loadCart();

    } catch (err) {
      console.error("Error updating delivery option:", err);
    }
  };

  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = `FREE Shipping`;
        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)}- Shipping`;
        }
        const estimatedMs = deliveryOption.estimatedDeliveryTimeMs;
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        return (
          <div
            key={deliveryOption.id}
            className="delivery-option"
            onClick={() => handleDeliveryOptionChange(deliveryOption.id)}
            style={{ cursor: 'pointer' }}
          >
            <input
              type="radio"
              checked={isChecked}
              onChange={() => { }} // Controlled by onClick on parent to be easier to hit
              className="delivery-option-input"
              name={`delivery-option-${cartItem.id || cartItem.productId}`} // Ensure unique group name per item
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(estimatedMs).format(`dddd, MMMM D`)}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
