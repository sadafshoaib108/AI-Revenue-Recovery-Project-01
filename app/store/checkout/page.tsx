"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productName = searchParams.get("product") || "";
  const price = Number(searchParams.get("price")) || 0;

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = price * quantity;

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await supabase.from("orders").insert({
      customer_name: customerName,
      customer_email: customerEmail,
      product_name: productName,
      quantity: quantity,
      total_amount: totalAmount,
      status: "pending",
    });

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
    } else {
      alert("Order placed successfully!");
      router.push("/store");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Checkout</h1>
        <p className="text-gray-500 mb-6">
          {productName} - Price: {price}
        </p>

        <form onSubmit={handleCheckout} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-gray-900"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-gray-900"
            required
          />
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2 text-gray-900"
            required
          />

          <p className="font-semibold text-gray-900">Total: {totalAmount}</p>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white rounded py-2 hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Placing order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}