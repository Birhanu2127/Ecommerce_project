import dayjs from "dayjs";
import axios from "axios";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";

export function OrderSummery({ Cart, deliveryOptions, loadCart }) {

  const handleUpdate = async (productId, currentQuantity) => {
    // For now, let's just increment by 1 checking if the user wants to update? 
    // The UI shows "Update" link. Usually this toggles an input. 
    // For simplicity and to "change specific code without affect other codes" too much,
    // I'll make it prompt for a new quantity or just increment.
    // Given the requirement "change specific code", let's make it robust: 
    // Use window.prompt for now as it's the simplest way to get input without adding new UI state/components if I want to avoid massive refactor.
    // Or, better, just change it to an input field if it's easy.
    // But the current UI is: Quantity: <span class="quantity-label">1</span> <span class="update-quantity-link">Update</span>
    // I'll stick to a simple prompt to keep it minimal as requested, or just specific logic.
    // User request: "checkout item still can not change"

    const newQuantity = prompt("Enter new quantity:", currentQuantity);
    if (newQuantity && !isNaN(newQuantity) && Number(newQuantity) > 0) {
      try {
        await axios.put(`http://localhost:3000/api/cart-items/${productId}`, {
          quantity: Number(newQuantity)
        });
        loadCart();
      } catch (err) {
        console.error("Error updating cart:", err);
        alert("Failed to update cart");
      }
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart-items/${productId}`);
      loadCart();
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item");
    }
  };

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        Cart.map((cartItem, index) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            }
          );
          // Fallback if delivery option not found
          if (!selectedDeliveryOption) return null;

          const key = cartItem.id || cartItem.productId || index;
          const product = cartItem.product || {};
          // Ensure we have a productId to operate on. 
          // Database model has productId on cartItem.
          const productId = cartItem.productId || product.id;

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
                    <span
                      className="update-quantity-link link-primary"
                      onClick={() => handleUpdate(productId, cartItem.quantity)}
                      style={{ cursor: 'pointer' }}
                    >
                      Update
                    </span>
                    <span
                      className="delete-quantity-link link-primary"
                      onClick={() => handleDelete(productId)}
                      style={{ cursor: 'pointer' }}
                    >
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
