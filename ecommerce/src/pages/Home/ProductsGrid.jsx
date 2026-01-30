import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export function ProductsGrid({ products, loadCart, title }) {
  // State to track which product has the "Added" message visible
  const [addedMessageState, setAddedMessageState] = useState({});

  const showAddedMessage = (productId) => {
    setAddedMessageState(prev => ({ ...prev, [productId]: true }));

    // Hide after 2 seconds
    setTimeout(() => {
      setAddedMessageState(prev => ({ ...prev, [productId]: false }));
    }, 2000);
  };

  return (
    <div className="product-section">
      <h2 className="product-section-title">{title}</h2>
      <div className="products-grid-scrollable">
        {products.map((product) => {
          const isAddedVisible = addedMessageState[product.id];

          return (
            <div key={product.id} className="product-container">
              <div className="product-image-container">
                <img className="product-image" src={product.image} />
              </div>

              <div className="product-name limit-text-to-2-lines">
                {product.name}
              </div>

              <div className="product-rating-container">
                <img
                  className="product-rating-stars"
                  src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                />
                <div className="product-rating-count link-primary">
                  {product.rating.count}
                </div>
              </div>

              <div className="product-price">
                {formatMoney(product.priceCents)}
              </div>

              <div className="product-quantity-container">
                <select id={`quantity-${product.id}`}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div className="product-spacer"></div>

              <div
                className="added-to-cart"
                style={{ opacity: isAddedVisible ? 1 : 0 }}
              >
                <img src="images/icons/checkmark.png" />
                Added
              </div>

              <button
                className="add-to-cart-button button-primary"
                onClick={async () => {
                  try {
                    // Get quantity from the select element
                    const quantitySelect = document.getElementById(`quantity-${product.id}`);
                    const quantity = quantitySelect ? Number(quantitySelect.value) : 1;

                    await axios.post("http://localhost:3000/api/Cart-items", {
                      productId: product.id,
                      quantity: quantity,
                    });

                    // Update UI
                    showAddedMessage(product.id);

                    if (loadCart) {
                      loadCart();
                    } else {
                      window.dispatchEvent(new Event("cart-updated"));
                    }
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
