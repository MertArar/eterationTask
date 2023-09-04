import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="border rounded-lg p-4 m-2">
      <img src={product.image} alt={product.name} className="mb-2" />
      <div className="font-semibold">{product.name}</div>
      <div className="text-gray-600">${product.price}</div>
      <button
        onClick={() => onAddToCart(product)}
        className="bg-blue-500 text-white px-2 py-1 mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
