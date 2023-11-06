import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Item({ getAllProducts, product }) {
  const [creatorIds, setCreatorIds] = useState([]);
  const [editProduct, setEditProduct] = useState({ // Define editProduct and setEditProduct
    // id: null,
    title: "",
    price: "",
    description: "",
  });
  let token = localStorage.getItem("token");

  const decoded = token ? jwtDecode(token) : null;

  useEffect(() => {
    if (decoded) {
      function filtered() {
        let updatedCreatorIds = product
          .filter((p) => p.creator._id === decoded.id)
          .map((p) => p._id);
        setCreatorIds(updatedCreatorIds);
      }
      filtered();
    }
  }, [product]);


  async function EditProduct() {
    try {
      await axios.put(`http://localhost:8000/${editProduct.id}`, {
        title: editProduct.title,
        price: editProduct.price,
        description: editProduct.description,
      });
      setEditProduct({
        // id: null,
        title: "",
        price: "",
        description: "",
      });
      getAllProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
    }
  

  async function deleteProduct(id) {
    const alertDeleteProduct = window.confirm("are you sure?");
    if (alertDeleteProduct) {
      try {
        await axios.delete(`http://localhost:8000/${id}`);
        getAllProducts();
      } catch (error) {
        console.log("delete product", error);
      }
    }
  }

  return (
    <div className="container">
      {product.map((g, index) => (
        <div className="block" key={index}>
          <div className="return">
            <h1>{g.title}</h1>
            <p>{g.description}</p>
            <p>{g.price}$$$$$</p>
            {token && creatorIds.includes(g._id) && (
              <div>
                <button onClick={() => deleteProduct(g._id)}>
                  <i className="deleteIcon">Delete</i>
                </button>
                <button
                  onClick={() =>
                    setEditProduct({
                      id: g._id,
                      title: g.title,
                      price: g.price,
                      description: g.description,
                    })
                  }
                >
                  <i className="editIcon">Edit</i>
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {editProduct.id && (
        <div>
          <h2>Edit Product</h2>
          <input
            type="text"
            placeholder="Title"
            value={editProduct.title}
            onChange={(e) =>
              setEditProduct({ ...editProduct, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Price"
            value={editProduct.price}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={editProduct.description}
            onChange={(e) =>
              setEditProduct({ ...editProduct, description: e.target.value })
            }
          />
          <button onClick={EditProduct}>Save</button>
        </div>
      )}
    </div>
  );
}

export default Item;
