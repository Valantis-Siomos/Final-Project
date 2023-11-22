import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./ProductListByCategory.css";
import { jwtDecode } from "jwt-decode";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid';
import AddProduct from "./product";


const ProductListByCategory = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({
    id: null,
    title: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const { category } = useParams();

  const ADMIN = process.env.REACT_APP_ADMIN;
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/category/${category}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [category]);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/${id}`);
      window.location.reload();
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  const updateProduct = async () => {
    try {
      await axios.put(`http://localhost:8000/${editProduct.id}`, {
        title: editProduct.title,
        price: editProduct.price,
        description: editProduct.description,
      });
      setEditProduct({
        id: null,
        title: "",
        price: "",
        description: "",
        iamageUrl: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  return (
    <div className="mainByCategory">
      <div className="categoryTitle">
      <h1>{category}</h1>
      </div>
      <div className="productsGrid">
        {products.map((product, url) => (
          <div className="productDiv" key={product._id}>
            <Link to={`/product/${product._id}`}>
              <img className="productImage" src={product.imageUrl} alt={product.title} />
              <p className="productDetailsTitle">{product.title}</p>
              {/* <p className="productDetailsDiscription">{product.description}</p> */}
              <p className="productDetailsPrice">{product.price} €</p>
              
              
              
            </Link>
  
            {token && decoded.email === ADMIN && (
              <div>
                <div className="buttonsContainer">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="deleteButton"
                  >
                    <i className="material-icons">Delete</i>
                  </button>
                  <button
                    onClick={() => {
                      setEditProduct({
                        id: product._id,
                        title: product.title,
                        description: product.description,
                        price: product.price,
                      });
                    }}
                    className="editButton"
                  >
                    <i className="material-icons">Edit</i>
                  </button>
                </div>
  
                {editProduct.id === product._id && (
                  <div className="editForm">
                    <input
                      type="text"
                      value={editProduct.title}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          title: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editProduct.price}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          price: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editProduct.description}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          description: e.target.value,
                        })
                      }
                    />
                    <button onClick={updateProduct}>Save</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
                    }  
export default ProductListByCategory;
