import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "./product.css";
// import Button from "@mui/material/Button";



function AddProduct({ getAllProducts }) {
  let token = localStorage.getItem("token");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, steImageList] = useState([]);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    imageUrl: "",
  });

  const imageListRef = ref(storage, "image/");
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setProduct({
          ...product,
          imageUrl: url,
        });
        alert("Image uploaded successfully");
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((snaphsot) => {
          getDownloadURL(snaphsot.ref).then((url) => {
            steImageList((prev) => [...prev, url]);
          });
        });
      });
    });
  }, []);

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
        window.location.reload();
      })

      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="formAddProduct">
      <div className="inputDivProduct">
        <form className="formProduct" onSubmit={addNewProduct}>
          <label className="productLabel">Title</label>
          <input
            className="ProductInp"
            type="text"
            name="title"
            placeholder=""
            onChange={handleInputChange}
            value={product.title}
          />
          <label>Price</label>
          <input
            className="ProductInp"
            type="text"
            name="price"
            placeholder=""
            onChange={handleInputChange}
            value={product.price}
          />
          <label>Description</label>
          <input
            className="ProductInp"
            type="text"
            name="description"
            placeholder=""
            onChange={handleInputChange}
            value={product.description}
          />
          <label>Image</label>

          <input
            className="ProductInpImg"
            type="file"
            name="imageUrl"
            placeholder="image"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
            // value={product.imageUrl}
          />
          <button className="uploadButton" onClick={uploadImage}>
            Upload image
          </button>
          {imageList.map((url) => {
            return <img src={url} alt="" />;
          })}
          <label className="productLabelImg">Category:</label>
          <select
            name="category"
            onChange={handleInputChange}
            value={product.category}
          >
            <option value="">Select a category</option>
            <option value="Living">Living</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Office">Office</option>
            <option value="Decoration">Decoration</option>
          </select>

          {/* <input
            name="category"
            placeholder="category"
            onChange={handleInputChange}
            value={product.category}
          /> */}
          {/* <label>Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
          /> */}

          <button type="submit" className="addProductBtn">
            ADD
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
