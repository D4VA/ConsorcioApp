"use client";
import { ProductGrid } from "../ProductGrid";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export const ProductTemplate = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.trim().toLowerCase();
    return product.title.toLowerCase().includes(term);
  });

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No se encontraron productos.</p>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
};
