const products = [
  { name: "Summer Dress", price: "£45.00", stock: 12, conversion: "17%" },
  { name: "Denim Jacket", price: "£65.00", stock: 30, conversion: "24%" },
  { name: "Classic Sneakers", price: "£80.00", stock: 5, conversion: "31%" },
  { name: "Leather Handbag", price: "£120.00", stock: 18, conversion: "22%" },
];

export default function ProductsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Products</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Conversion</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.name} className="border-t">
                <td className="p-3 text-gray-800 font-medium">{product.name}</td>
                <td className="p-3 text-gray-800">{product.price}</td>
                <td className="p-3 text-gray-800">{product.stock}</td>
                <td className="p-3 text-gray-800">{product.conversion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}