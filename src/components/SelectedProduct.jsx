import React from "react";

const SelectedProduct = ({ selectedProducts, handleQuantityChange }) => {
  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-lg font-semibold mb-2">Selected Products</h2>
      <div>
        {selectedProducts.map((product) => (
          <div key={product.id} className="mb-2">
            <div className="flex items-center">
              <div className="flex-grow">
                <p>{product.name}</p>
              </div>
              <div className="flex-none">
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() =>
                    handleQuantityChange(product, product.quantity - 1)
                  }
                >
                  -
                </button>
                <span className="px-2 py-1">{product.quantity}</span>
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() =>
                    handleQuantityChange(product, product.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedProduct;