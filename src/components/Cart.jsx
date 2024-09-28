import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Cart = () => {
  const userId = localStorage.getItem('userId'); // Fetch user ID
  const savedCart = localStorage.getItem(`cart_${userId}`);
  console.log(savedCart,'savedCart');
  
  const [cart, setCart] = useState(() => {
    // Use user-specific key for fetching the cart

    console.log(savedCart,'savedCart');
    return savedCart ? JSON.parse(savedCart) : [];

    
  });

  useEffect(() => {
    // Save cart to localStorage under user-specific key whenever it updates
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  }, [cart, userId]); // Add userId as a dependency

  // const addToCart = (product) => {
  //   // Check if product is already in the cart
  //   const existingItem = cart.find(item => item.id === product.id);
  //   const newCart = existingItem 
  //     ? cart.map(item => 
  //         item.id === product.id 
  //           ? { ...item, quantity: item.quantity + 1 } 
  //           : item
  //       )
  //     : [...cart, { ...product, id: uuidv4(), quantity: 1 }];

  //   setCart(newCart);
  // };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.length > 0 ? (
          cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.sellingPrice} (x{item.quantity})
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))
        ) : (
          <li>Your cart is empty.</li>
        )}
      </ul>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
