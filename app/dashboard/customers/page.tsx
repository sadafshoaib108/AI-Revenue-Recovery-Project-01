const customers = [
  { name: "Ayesha Khan", email: "ayesha@example.com", orders: 5, totalSpent: "£420.00" },
  { name: "James Smith", email: "james@example.com", orders: 2, totalSpent: "£95.50" },
  { name: "Fatima Ali", email: "fatima@example.com", orders: 8, totalSpent: "£680.99" },
  { name: "David Lee", email: "david@example.com", orders: 1, totalSpent: "£210.00" },
];

export default function CustomersPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Customers</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Orders</th>
              <th className="p-3">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.email} className="border-t">
                <td className="p-3 text-gray-800 font-medium">{customer.name}</td>
                <td className="p-3 text-gray-800">{customer.email}</td>
                <td className="p-3 text-gray-800">{customer.orders}</td>
                <td className="p-3 text-gray-800">{customer.totalSpent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}