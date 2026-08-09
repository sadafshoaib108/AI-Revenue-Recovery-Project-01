"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Overview", href: "/dashboard" },
  { name: "Orders", href: "/dashboard/orders" },
  { name: "Customers", href: "/dashboard/customers" },
  { name: "Products", href: "/dashboard/products" },
  { name: "Problems", href: "/dashboard/problems" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-lg font-bold mb-6">AI Revenue Recovery</h2>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded transition ${
              pathname === item.href
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}