"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  stock: number;
}

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const result = await supabase.from("products").select("*");
      if (!result.error && result.data) {
        setProducts(result.data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading products...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Demo Fashion Store
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((product) => {
          const checkoutLink =
            "/store/checkout?product=" +
            encodeURIComponent(product.name) +
            "&price=" +
            product.price;
          return (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="font-semibold text-gray-900">{product.name}</h2>
              <p className="text-gray-500 mb-2">£{product.price}</p>
              <a
                href={checkoutLink}
                className="mt-auto bg-black text-white text-center rounded py-2 hover:bg-gray-800"
              >
                Buy Now
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}