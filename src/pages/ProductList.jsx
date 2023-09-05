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
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Ürünleri sırala
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
    // Ürünleri filtrele
    const filterProducts = () => {
      let filtered = products;

      // Filtreleme kriterlerine göre ürünleri filtrele
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

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [filterCriteria, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="filter-section">
        {/* Filtreleme kriterleri burada bulunmalı */}
      </div>

      <div className="sort-section">
        <label>Sıralama:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Varsayılan Sıralama</option>
          <option value="priceLowToHigh">Fiyat Düşükten Yükseğe</option>
          <option value="priceHighToLow">Fiyat Yüksekten Düşüğe</option>
          <option value="dateNewToOld">Yeniden Eskiye</option>
          <option value="dateOldToNew">Eskiden Yeniye</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
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
                i + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductList;
