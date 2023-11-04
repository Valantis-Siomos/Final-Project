import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


function Product({ getAllProducts, products }) {
  const [creatorIds, setCreatorIds] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = token ? jwt_decode(token) : null;

  useEffect(() => {
    if (decoded) {
      function filterProductsByOwner() {
        const updateCreatorIds = products
          .filter((p) => p.owner._id === decoded.id)
          .map((p) => p._id);
        setCreatorIds(updateCreatorIds);
      }
      filterProductsByOwner();
    }
  }, [products]);

  const [editProduct, setEditProduct] = useState({
    id: null,
    title: "",
    price: "",
    discription: "",
  });

  async function deleteProduct(id) {
    const alertDeleteProduct = window.confirm("Are you sure?");
    if (alertDeleteProduct) {
      try {
        await axios.delete(`http://localhost:8000/products/${id}`);
        getAllProducts();
      } catch (error) {
        console.log("Error deleting product:", error);
      }
    }
  }

  async function updateProduct() {
    try {
      await axios.put(`http://localhost:8000/products/${editProduct.id}`, {
        name: editProduct.name,
        expirationDate: editProduct.expirationDate,
        category: editProduct.category,
      });
      setEditProduct({
        id: null,
        name: "",
        expirationDate: "",
        category: "",
      });
      getAllProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  return (
    <div>
    {decoded ? (
      <div>
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <strong>Title:</strong> {product.title} <br />
              <strong>Price:</strong> ${product.price} <br />
              <strong>Description:</strong> {product.description} <br />
              <button
                onClick={() => setEditProduct({ id: product._id, title: product.title, price: product.price, description: product.description })}
              >
                Edit
              </button>
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p>Please log in to view your products.</p>
    )}

    {editProduct.id && (
      <div>
        <h2>Edit Product</h2>
        <input
          type="text"
          value={editProduct.title}
          onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
          placeholder="Title"
        />
        <input
          type="text"
          value={editProduct.price}
          onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
          placeholder="Price"
        />
        <input
          type="text"
          value={editProduct.description}
          onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
          placeholder="Description"
        />
        <button onClick={updateProduct}>Save</button>
        <button onClick={() => setEditProduct({ id: null, title: '', price: '', description: '' })}>Cancel</button>
      </div>
    )}
  </div>
  )







}

export default Product;
