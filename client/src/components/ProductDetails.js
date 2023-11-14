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
      
    </div>
  );
};

export default ProductDetails;


















// import jwtDecode from "jwt-decode";
// import axios from "axios";

// function aaa() {
//   const ADMIN = process.env.REACT_APP_ADMIN;
//   let token;
//   let decoded;
//   try {
//     token = localStorage.getItem("token");

//     if (token) {
//       decoded = jwtDecode(token);
//     }
//   } catch (error) {
//     console.log("Invalid token", error);
//   }

//   const deleteProduct = async (id) => {
//     try {
//       if (decoded && decoded === ADMIN) {
//         await axios.delete(`http://localhost:8000/${id}`);
//       } else {
//         console.log("Access denied. User is not an admin.");
//       }
//     } catch (error) {
//       console.log("Error deleting product:", error);
//     }
//   };

//   const updateProduct = async () => {
//     try {
//       if (decoded && decoded === ADMIN) {
//         await axios.put(`http://localhost:8000/${editProduct.id}`, {
//           title: editProduct.title,
//           price: editProduct.price,
//           description: editProduct.description,
//         });
//         setEditProduct({
//           id: null,
//           title: "",
//           price: "",
//           description: "",
//         });
//       } else {
//         console.log("Access denied. User is not an admin.");
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };
// }
// export default aaa;
