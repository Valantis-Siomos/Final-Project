import React, { useState, useEffect } from 'react';

const ShoppingCart = () => {
  
  const [cart, setCart] = useState([]);

  
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={clearCart}>Clear Cart</button>

      
      <h2>Product Listing</h2>
      
    </div>
  );
};

export default ShoppingCart;