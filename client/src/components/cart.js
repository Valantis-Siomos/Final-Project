import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import GooglePay from "./googleButton";
import "./cart.css";

const Cart = () => {
  let token;
  let decoded;
  try {
    token = localStorage.getItem("token");

    if (token) {
      decoded = jwtDecode(token);
    }
    // console.log("Token:", token);
    // console.log("Decoded:", decoded);
  } catch (error) {
    console.log("Invalid token", error);
  }
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem(`cartItems_${decoded?.id}`)) || []
  );

  const clearCart = () => {
    
    setCartItems([]);
    localStorage.removeItem(`cartItems_${decoded?.id}`);
  };


  const deleteItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem(`cartItems_${decoded?.id}`, JSON.stringify(newCartItems));
  };
   

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="mainDivCart">
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={`${item.id}_${index}`} className="item">
              <p>{item.title}</p>
              {/* <p>{item.description}</p> */}
              <p>{item.price}</p>
              <button onClick={() => deleteItem(index)}>Delete</button>
              
            </div>
          ))}
          <p className="total">Total: {calculateTotalPrice()} €</p>
          <GooglePay />
          <button className="clearCartButton" onClick={clearCart}>Clear Cart</button>
          
        </div>
        
      )}
    </div>
  );
};

export default Cart;





