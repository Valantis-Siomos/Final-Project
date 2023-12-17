import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2'
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

    // alert("Product added to cart!");
    Swal.fire({
      title: 'Product added to cart!',
      // text: 'Do you want to continue',
      icon: 'success',
      confirmButtonText: 'ok',
      customClass: {
        popup: "custom-popup-class",
        confirmButton: "btn-ok",
      },
    })
  };



  return (
    <div className="detailsDivProduct">
      <div className="prodactDetails">
        <img className="imgPoductDetails" src={product.imageUrl} alt={product.title} />
        <div className="pDivs">
          <h1 className="pDetails1 withBorder">{product.title}</h1>
          <p className="pDetails2 withBorder">{product.description}</p>
          <span className="spanDetails3 withBorder">{product.price} €</span>

          {decoded ? (
            <>
              <button className="CartBtn" onClick={addToCart}>
                <span className="IconContainer">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" className="cart">
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                  </svg>
                </span>
                <p className="text">Add to Cart</p>
              </button>
            </>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};



export default ProductDetails;
