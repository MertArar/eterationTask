import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="flex flex-col border-none shadow-lg rounded-sm p-4 mt-5 w-[240px] h-[320px] bg-white">
      <div className="flex flex-col items-center">
        <Link to={`/products/${product.id}`}>
          {" "}
          {/* Add Link to the product details page */}
          <img
            src={product.image}
            alt={product.name}
            className="mb-2 w-[220px] h-[150px]"
          />
        </Link>
      </div>
      <div className="text-[#2A59FE] mt-4">${product.price}</div>
      <div className="font-semibold mt-2">{product.name}</div>
      <div className="flex flex-col items-center">
        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-500 text-white rounded px-2 py-1 mt-5 w-[160px]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
