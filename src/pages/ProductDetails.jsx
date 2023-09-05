import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SelectedProduct from "../components/SelectedProduct";
import TotalPrices from "../components/TotalPrice";

import Navbar from "../components/Navbar";

import axios from "axios"; // axios'ı içe aktarın

const API_URL = "https://5fc9346b2af77700165ae514.mockapi.io/products";

const ProductDetails = ({}) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const [selectedProducts, setSelectedProducts] = useState([]);

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

  const handleQuantityChange = (product, newQuantity) => {
    const updatedSelectedProducts = selectedProducts.map((p) => {
      if (p.id === product.id) {
        return { ...p, quantity: newQuantity };
      }
      return p;
    });
    setSelectedProducts(updatedSelectedProducts);
  };

  const handleAddToCart = (product) => {
    const selectedProductIndex = selectedProducts.findIndex(
      (p) => p.id === product.id
    );

    if (selectedProductIndex === -1) {
      // Ürün seçili değilse, yeni bir öğe olarak ekleyin
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    } else {
      // Ürün zaten seçiliyse, miktarını artırın
      const updatedSelectedProducts = [...selectedProducts];
      updatedSelectedProducts[selectedProductIndex].quantity += 1;
      setSelectedProducts(updatedSelectedProducts);
    }
  };

  return (
    <>
      <Navbar walletAmount={1000} userName="Kerem" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <img src={product.image} alt={product.name} className="my-4" />
        <p className="text-gray-700">{product.description}</p>
        <p className="text-blue-500 mt-4">${product.price}</p>
      </div>
      <SelectedProduct
        selectedProducts={selectedProducts}
        handleQuantityChange={handleQuantityChange}
      />
      <TotalPrices selectedProducts={selectedProducts} />
    </>
  );
};

export default ProductDetails;
