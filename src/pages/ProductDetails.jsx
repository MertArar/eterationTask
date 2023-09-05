import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // axios'ı içe aktarın

const API_URL = "https://5fc9346b2af77700165ae514.mockapi.io/products";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Ürünü axios kullanarak alın
        const response = await axios.get(`${API_URL}/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <img src={product.image} alt={product.name} className="my-4" />
      <p className="text-gray-700">{product.description}</p>
      <p className="text-blue-500 mt-4">${product.price}</p>
    </div>
  );
};

export default ProductDetails;
