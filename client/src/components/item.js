import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Item({ getAllProducts, product }) {
  const [creatorIds, setCreatorIds] = useState([]);
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
  }, [product, decoded]);

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
              <button onClick={() => deleteProduct(g._id)}>
                <i className="deleteIcon">delete</i>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Item;
