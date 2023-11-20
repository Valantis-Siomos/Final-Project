import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./ProductDetails.css"

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    
    
    const existingCartItems = JSON.parse(localStorage.getItem(`cartItems_${decoded?.id}`)) || [];
    const updatedCartItems = [...existingCartItems, product];

    localStorage.setItem(`cartItems_${decoded?.id}`, JSON.stringify(updatedCartItems));

    alert("Product added to cart!");
  };



  return (
    <div className="prodactDetails">
      <p className="pDetails">{product.title}</p>
      <p className="pDetails">{product.description}</p>
      <p className="pDetails">{product.price}</p>
      <img className="imgPoductDetails" src={product.imageUrl} alt={product.title} />

      {decoded ? (
        <>
          <button onClick={addToCart}>Add to Cart</button>
          <Link to="/cart">
            <button>Go to Cart</button>
          </Link>
        </>
      ) : (
        <p>Login to see cart options</p>
      )}
    </div>
  );
};


export default ProductDetails;
