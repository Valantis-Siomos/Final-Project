import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid';

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
  
  const imageListRef = ref(storage, "image/")
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("OK");
    })
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          steImageList((prev) => [...prev, url]);
          
        })
      })
    })
  }, [])



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
          <label>Image:</label>
          <input
            type="file"
            name="imageUrl"
            placeholder="image"
            onChange={(event) => {setImageUpload(event.target.files[0]);
            }}
            value={product.imageUrl}
            
          />
          <button onClick={uploadImage}>
            Upload
          </button>
          {imageList.map((url) => {
            return <img src={url} />
          })}
          <label>Category:</label>
          <select
            name="category"
            onChange={handleInputChange}
            value={product.category}
          >
            <option value="">Select a category</option>
            <option value="Living Room">Living Room</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Home Office">Home Office</option>
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
