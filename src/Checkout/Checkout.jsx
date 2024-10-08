import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const userId = localStorage.getItem('userId'); // Fetch user ID
  const [cart, setCart] = useState(() => {
    // Use user-specific key for fetching the cart
    const savedCart = localStorage.getItem(`cart_${userId}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [paymentMethod, setPaymentMethod] = useState('cash'); // Default to cash payment
  const navigate = useNavigate();

  // Handle placing the order
  const placeOrder = () => {
    if (paymentMethod === 'cash') {
      alert('Your order has been placed successfully using Cash on Delivery!');
    }

    // Prepare order details
    const newOrder = {
      id: new Date().getTime(), // Unique ID based on timestamp
      items: cart,
      totalAmount: cart.reduce((acc, item) => acc + item.sellingPrice * item.quantity, 0),
      paymentMethod,
      date: new Date().toLocaleDateString(),
    };
    // Fetch existing orders for the user
    const existingOrders = JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];
    

    // Save the new order along with existing orders
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem(`orders_${userId}`, JSON.stringify(updatedOrders));

    // Clear the cart after placing the order
    setCart([]);
    localStorage.removeItem(`cart_${userId}`); // Clear cart from localStorage using user-specific key

    // Redirect to the Orders page to view the placed order
    navigate('/orders');
  };

  return (
    <div className='checkout-container'>
      <div className="checkout-page">
        <h2>Checkout</h2>
        {cart.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty. Please add some products to proceed.</p>
        ) : (
          <>
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  {item.name} (x{item.quantity}) - <span className="item-price">${(item.sellingPrice * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="order-summary">
              <h3>Order Summary</h3>
              <p>Total Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
              <p>
                Total Price: $
                {cart.reduce((acc, item) => acc + item.sellingPrice * item.quantity, 0).toFixed(2)}
              </p>
            </div>

            {/* Payment Method Selection */}
            <div className="payment-method">
              <h3>Select Payment Method</h3>
              <label className="payment-option">
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
            </div>

            <button className="place-order-btn" onClick={placeOrder}>
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
