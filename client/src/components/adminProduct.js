import { useState } from "react";
import axios from "axios";

function AddProduct({ getAllProducts }) {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    discription: "",
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setProduct({
      ...product,
      [e.target.name]: value,
    });
  };

  const addNewProduct = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/create", product).then((res) => {
      console.log(res.data);
      getAllProducts();
    });
  };

  return (
    <div>
      <div>
        <form onSubmit={addNewProduct}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleInputChange}
            value={product.title}
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            placeholder="description...."
            onChange={handleInputChange}
            value={product.description}
          />
          <label>Price:</label>
          <input
            type="text"
            name="price"
            placeholder="price..."
            onChange={handleInputChange}
            value={product.price}
          />
          <button type="submit" className="addProductBtn">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
