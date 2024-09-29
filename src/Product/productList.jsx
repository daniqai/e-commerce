import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productData from './products.json';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [filterKeyword, setFilterKeyword] = useState(''); // For filtering products
  const navigate = useNavigate();

  // Get the current logged-in user's ID
  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    setProducts(productData);
    // Restore cart from localStorage for the current user
    if (userId) {
      const savedCart = localStorage.getItem(`cart_${userId}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, [userId]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
  };

  const handleSignOut = () => {
    // Remove the user's token and ID, but keep the cart in localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    // Navigate to login or home page
    navigate('/login');
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filterKeyword.toLowerCase())
  );

  return (
    <div className="product-list">
      <h2>Product List</h2>

      <div className="view-toggle">
        <button
          onClick={() => setViewMode('grid')}
          className={viewMode === 'grid' ? 'active' : ''}
        >
          Grid View
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={viewMode === 'list' ? 'active' : ''}
        >
          List View
        </button>
      </div>

      <input
        type="text"
        placeholder="Filter products..."
        value={filterKeyword}
        onChange={(e) => setFilterKeyword(e.target.value)}
        className="filter-input"
      />

      <div className="profile-menu">
        <button onClick={handleSignOut} className="signout-btn">
          Sign Out
        </button>
      </div>

      <div className={`products ${viewMode}`}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className={`product-card ${viewMode}`} key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>
                 {product.description}
                </p>
                <p>
                  Original Price: <span className="price">${product.originalPrice}</span>
                </p>
                <p>
                  Discount Price: <span className="price">${product.discountPrice}</span>
                </p>
                <p>
                  Selling Price: <span className="price">${product.sellingPrice}</span>
                </p>
                <p>
                Quantity: <span className="price">${product.quantity}</span>
                </p>
                <p>
                UOM : <span className="price">${product.uom}</span>
                </p>
                <p>
                HSN Code: <span className="price">${product.hsnCode}</span>
                </p>
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>

      {/* Cart Preview */}
     {/* Cart Preview */}
<div className="cart-preview">
  <h3>Shopping Cart</h3>
  {cart.length === 0 ? (
    <p>The cart is empty.</p>
  ) : (
    <>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="cart-item-details">
              {item.name} (x{item.quantity}) - ${item.sellingPrice * item.quantity}
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button className="checkout-btn" onClick={() => navigate('/checkout')}>
        Proceed to Checkout
      </button>
    </>
  )}
</div>

    </div>
  );
};

export default ProductList;
