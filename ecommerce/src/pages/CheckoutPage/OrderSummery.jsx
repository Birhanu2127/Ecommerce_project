import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
export function OrderSummery({ Cart, deliveryOptions }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        Cart.map((cartItem, index) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            }
          );
          const key = cartItem.id || cartItem.productId || index;
          const product = cartItem.product || {};
          return (
            <div key={key} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  `dddd, MMMM D`
                )}
              </div>

              <div className="cart-item-details-grid">
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                />

                <div className="cart-item-details">
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">
                    {formatMoney(product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">
                        {cartItem.quantity}
                      </span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary">
                      Delete
                    </span>
                  </div>
                </div>

                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  cartItem={cartItem}
                  key={key}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
