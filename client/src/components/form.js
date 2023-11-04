import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Form({ getAllProducts }) {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
  });

  function handleInputChange(e) {
    const value = e.target.value;
    setProduct({
      ...product,
      [e.target.name]: value,
    });
  }

  const addNewProduct = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/create", product, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        getAllProducts();
        navigate("/products");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
        <div>
        <form
          onSubmit={(e) => {
            addNewProduct(e);
          }}
          className="form"
        >
          <label>title</label>
          <br />
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={product.tile}
          />
          <br />
          <label>price</label>
          <br />
          <input
            type="text"
            name="price"
            onChange={handleInputChange}
            value={product.price}
          />
          <br />
          <label>discription</label>
          <br />
          <input
            type="text"
            name="description"
            onChange={handleInputChange}
            value={product.description}
          />
          <br />
          <button type="submit">Add</button>
          </form>
        </div>
    </div>
  )


}

export default Form;
