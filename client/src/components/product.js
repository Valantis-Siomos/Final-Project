import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function AddProduct({ getAllProducts}) {
    let token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [product, setProduct] = useState({
      title: "",
      price: "",
      description: "",
      category: "",
    });

    const handleInputChange = (e) => {
      const value = e.target.value;
      setProduct({
        ...product,
        [e.target.name]: value,
      });
    };
    

    
    const validForm = () => {
      return (
        product.title.trim() !== "" &&
        product.price.trim() !== "" &&
        product.description.trim() !== ""
      );
    };
  
    function addNewProduct(e) {
      e.preventDefault();
      if (!validForm()) {
        alert("Please fill in all fields.");
        return;
      }
  
      axios
        .post("http://localhost:8000/create", product, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          getAllProducts();
        //   navigate("/");
        })
  
        .catch((err) => {
          console.log(err);
        });
    }


    return (
      <div>
      <div className="inputDiv">
        <form className="form1" onSubmit={addNewProduct}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleInputChange}
            value={product.title}
          />
          <label>Price:</label>
          <input
            type="text"
            name="price"
            placeholder="Price"
            onChange={handleInputChange}
            value={product.price}
          />
          <label>description:</label>
          <input
            type="text"
            name="description"
            placeholder="description"
            onChange={handleInputChange}
            value={product.description}
          />
          <label>Category:</label>
          <input
            type="input"
            name="category"
            placeholder="category"
            onChange={handleInputChange}
            value={product.category}
          />
          <button type="submit" className="addProductBtn">
            ADD
          </button>
        </form>
      </div>
    </div>
);
      




}

export default AddProduct;

