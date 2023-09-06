import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SelectedProduct from "../components/SelectedProduct";
import TotalPrices from "../components/TotalPrice";
import Navbar from "../components/Navbar";
import axios from "axios";

const API_URL = "https://5fc9346b2af77700165ae514.mockapi.io/products";

const ProductDetails = ({ selectedProducts, setSelectedProducts }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

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
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    } else {
      const updatedSelectedProducts = [...selectedProducts];
      updatedSelectedProducts[selectedProductIndex].quantity += 1;
      setSelectedProducts(updatedSelectedProducts);
    }

    setCartUpdated((prevCartUpdated) => !prevCartUpdated);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar walletAmount="117.000" userName="Kerem" />
      <div className="flex lg:flex-row flex-col justify-center items-center">
        <div className="flex flex-col lg:flex-row justify-center items-center mt-24 p-8 w-[1420px] bg-white shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="my-4 bg-cover w-[580px] h-[520px]"
          />

          <div className="flex flex-row md:flex-col p-8 ml-24">
            <h2 className="text-3xl font-normal ">{product.name}</h2>
            <p className="text-blue-500 mt-4 text-2xl mb-8">${product.price}</p>
            <div className="flex flex-col justify-center items-center">
              <button
                className="bg-[#2A59FE] text-white p-2 rounded-[4px] w-[420px] flex items-center justify-center"
                onClick={() => handleAddToCart(product)}
              >
                Add To Cart
              </button>
              <p className="text-gray-700 p-14">{product.description}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center ml-10">
          <SelectedProduct
            selectedProducts={selectedProducts}
            handleQuantityChange={handleQuantityChange}
            cartUpdated={cartUpdated}
          />
          <TotalPrices
            selectedProducts={selectedProducts}
            cartUpdated={cartUpdated}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
