import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./ProductListByCategory.css";
import { jwtDecode } from "jwt-decode";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
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
    const alertConfirmProduct = window.confirm("Are you sure?");
    if (alertConfirmProduct) {
      try {
        await axios.delete(`http://localhost:8000/${id}`);
        window.location.reload();
      } catch (error) {
        console.log("Error deleting product:", error);
      }
    }
  };

  const updateProduct = async () => {
    try {
      await axios.put(`http://localhost:8000/${editProduct.id}`, {
        title: editProduct.title,
        price: editProduct.price,
        description: editProduct.description,
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === editProduct.id
            ? {
                ...product,
                title: editProduct.title,
                price: editProduct.price,
                description: editProduct.description,
              }
            : product
        )
      );

      setEditProduct({
        id: null,
        title: "",
        price: "",
        description: "",
        iamageUrl: "",
      });
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
              <img
                className="productImage"
                src={product.imageUrl}
                alt={product.title}
              />
              <p className="productDetailsTitle">{product.title}</p>
              {/* <p className="productDetailsDiscription">{product.description}</p> */}
              <p className="productDetailsPrice">{product.price} €</p>
            </Link>

            {token && decoded.email === ADMIN && (
              <div>
                <div className="buttonsContainer">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="noselectDeleteButton"
                  >
                    <span className="text">Delete</span>
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                      </svg>
                    </span>
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
                    className="edit-button"
                  >
                    <svg class="edit-svgIcon" viewBox="0 0 512 512">
                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                    </svg>
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
};
export default ProductListByCategory;
