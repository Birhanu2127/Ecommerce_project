import { Link } from 'react-router';
import './header.css';
export function Header({ Cart, onSearch }) {
  let totalquantity = 0;
  Cart.forEach(item => {
    totalquantity += item.quantity;
  });

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo"
            src="images/amazon.png" />
          <img className="mobile-logo"
            src="images/mobile-logo-white.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />

        <button className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity"> {totalquantity} </div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}