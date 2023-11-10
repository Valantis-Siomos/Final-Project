import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductListByCategory = ({ match }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/category/${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div>
      <h1>Products in {category}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product._id}>
              <p>{product.title}</p>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductListByCategory;