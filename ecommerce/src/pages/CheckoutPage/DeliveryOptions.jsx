import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
export function DeliveryOptions({ deliveryOptions, cartItem, key }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = `FREE Shipping`;
        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)}- Shipping`;
        }
        const estimatedMs = deliveryOption.estimatedDeliveryTimeMs;
        return (
          <div key={deliveryOption.id} className="delivery-option">
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              className="delivery-option-input"
              name={`delivery-option-${key}`}
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
