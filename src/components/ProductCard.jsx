import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="flex flex-col border rounded-sm p-4 m-2 w-[180px] h-[302px]">
      <Link to={`/products/${product.id}`}>
        {" "}
        {/* Add Link to the product details page */}
        <img
          src={product.image}
          alt={product.name}
          className="mb-2 w-[160px] h-[150px]"
        />
      </Link>
      <div className="text-[#2A59FE] mt-4">${product.price}</div>
      <div className="font-semibold">{product.name}</div>

      <button
        onClick={() => onAddToCart(product)}
        className="bg-blue-500 text-white rounded px-2 py-1 mt-10"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
