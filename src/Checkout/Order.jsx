import React, { useState, useEffect } from 'react';
import './Orders.css';

const Orders = () => {
  const userId = localStorage.getItem('userId'); // Fetch user ID
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch user-specific orders from localStorage
    const savedOrders = localStorage.getItem(`orders_${userId}`);
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, [userId]);

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p className="empty-orders-message">You have no orders yet.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <h3>Order Date: {order.date}</h3>
              <p>Total Items: {order.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
              <p className="total-amount">
                Total Amount: ${order.totalAmount.toFixed(2)}
              </p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.sellingPrice * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
