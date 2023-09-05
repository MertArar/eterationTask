import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const [sortOption, setSortOption] = useState("default");
  const [filterCriteria, setFilterCriteria] = useState({
    startDate: null,
    endDate: null,
    minPrice: null,
    maxPrice: null,
    brand: "",
    model: "",
    selectedBrands: [],
  });

  const [selectedModel, setSelectedModel] = useState(""); // Seçilen modeli saklamak için state

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const sortProducts = () => {
      let sorted = [...filteredProducts];
      if (sortOption === "priceLowToHigh") {
        sorted = sorted.sort((a, b) => a.price - b.price);
      } else if (sortOption === "priceHighToLow") {
        sorted = sorted.sort((a, b) => b.price - a.price);
      } else if (sortOption === "dateNewToOld") {
        sorted = sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else if (sortOption === "dateOldToNew") {
        sorted = sorted.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      }
      setFilteredProducts(sorted);
    };

    sortProducts();
  }, [sortOption, filteredProducts]);

  useEffect(() => {
    const filterProducts = () => {
      let filtered = products;

      if (filterCriteria.startDate) {
        filtered = filtered.filter(
          (product) => new Date(product.createdAt) >= filterCriteria.startDate
        );
      }

      if (filterCriteria.endDate) {
        filtered = filtered.filter(
          (product) => new Date(product.createdAt) <= filterCriteria.endDate
        );
      }

      if (filterCriteria.minPrice) {
        filtered = filtered.filter(
          (product) => product.price >= filterCriteria.minPrice
        );
      }

      if (filterCriteria.maxPrice) {
        filtered = filtered.filter(
          (product) => product.price <= filterCriteria.maxPrice
        );
      }

      if (filterCriteria.brand) {
        filtered = filtered.filter(
          (product) => product.brand === filterCriteria.brand
        );
      }

      if (filterCriteria.model) {
        filtered = filtered.filter(
          (product) => product.model === filterCriteria.model
        );
      }

      if (filterCriteria.selectedBrands.length > 0) {
        filtered = filtered.filter((product) =>
          filterCriteria.selectedBrands.includes(product.name)
        );
      }

      // Modeli filtrele
      if (selectedModel) {
        filtered = filtered.filter(
          (product) => product.model === selectedModel
        );
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [filterCriteria, products, selectedModel]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleBrandSelect = (brand) => {
    const selectedBrands = [...filterCriteria.selectedBrands];
    if (selectedBrands.includes(brand)) {
      selectedBrands.splice(selectedBrands.indexOf(brand), 1);
    } else {
      selectedBrands.push(brand);
    }
    setFilterCriteria({ ...filterCriteria, selectedBrands });
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/4 p-4">
        {/* Sort By Kartı */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Sort By</h2>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="default">Varsayılan Sıralama</option>
            <option value="priceLowToHigh">Fiyat Düşükten Yükseğe</option>
            <option value="priceHighToLow">Fiyat Yüksekten Düşüğe</option>
            <option value="dateNewToOld">Yeniden Eskiye</option>
            <option value="dateOldToNew">Eskiden Yeniye</option>
          </select>
        </div>

        {/* Markalar Kartı */}
        <div className="bg-white p-4 rounded shadow mt-4">
          <h2 className="text-lg font-semibold mb-2">Markalar</h2>
          <div className="overflow-y-auto max-h-36">
            {products.map((product) => (
              <div key={product.id} className="mb-2">
                <input
                  type="checkbox"
                  id={product.name}
                  name={product.name}
                  value={product.name}
                  checked={filterCriteria.selectedBrands.includes(product.name)}
                  onChange={() => handleBrandSelect(product.name)}
                />
                <label htmlFor={product.name} className="ml-2">
                  {product.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Modeller Kartı */}
        <div className="bg-white p-4 rounded shadow mt-4">
          <h2 className="text-lg font-semibold mb-2">Modeller</h2>
          <div className="overflow-y-auto max-h-36">
            {Array.from(new Set(products.map((product) => product.model))).map(
              (model) => (
                <div key={model} className="mb-2">
                  <input
                    type="radio"
                    id={model}
                    name="model"
                    value={model}
                    checked={selectedModel === model}
                    onChange={() => handleModelSelect(model)}
                  />
                  <label htmlFor={model} className="ml-2">
                    {model}
                  </label>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/4 p-4">
        {/* Ürünlerin Listesi ve Sayfalama burada */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(filteredProducts.length / productsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-2 p-2 rounded-full ${
                  i + 1 === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
