"use client";

export const dynamic = "force-dynamic";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function CheckoutForm() {
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
          {productName ? `${productName} - Price: $${price}` : "No product selected"}
        </p>

        <form onSubmit={handleCheckout} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <p className="font-semibold text-gray-900 text-lg mt-2">
            Total: ${totalAmount}
          </p>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white rounded py-2 font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {loading ? "Placing order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Loading checkout...</p>
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}