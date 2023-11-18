import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import GooglePay from "./googleButton";

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

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
              {/* <p>{item.description}</p> */}
              <p>{item.price}</p>
            </div>
          ))}
          <GooglePay />
          <button onClick={clearCart}>Clear Cart</button>
          
        </div>
        
      )}
    </div>
  );
};

export default Cart;





