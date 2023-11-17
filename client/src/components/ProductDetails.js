import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

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

  return (
    <div>
      <p>{product.title}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>

      {/* <button onClick={() => addToCart(product)}>Add to Cart</button> */}
    </div>
  );
};

export default ProductDetails;
