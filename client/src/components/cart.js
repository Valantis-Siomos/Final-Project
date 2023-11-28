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
    const alertConfirmProduct = window.confirm("Are you sure?");
    setCartItems([]);
    localStorage.removeItem(`cartItems_${decoded?.id}`);
  };


  const deleteItem = (index) => {
    const alertConfirmProduct = window.confirm("Are you sure?");
    if (alertConfirmProduct) {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem(`cartItems_${decoded?.id}`, JSON.stringify(newCartItems));
    }
  };
   

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="mainDivCart">
      {cartItems.length === 0 ? (
        <p className="pEmpty">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={`${item.id}_${index}`} className="item">
              <p>{item.title}</p>
              <p>{item.price}</p>
              <button className="deleteButton" onClick={() => deleteItem(index)}>
                <span className="text">Delete</span>
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                  </svg>
                </span>
              </button>
            </div>
          ))}
          <div className="totalClear">
            <p className="total">Total: {calculateTotalPrice()} €</p>
            <button className="clearCartButton" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
          <GooglePay />
        </div>
      )}
    </div>
  );
};

export default Cart;





