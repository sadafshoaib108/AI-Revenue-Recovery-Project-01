const orders = [
  { id: "ORD-1001", customer: "Ayesha Khan", amount: "£120.00", status: "Completed" },
  { id: "ORD-1002", customer: "James Smith", amount: "£45.50", status: "Pending" },
  { id: "ORD-1003", customer: "Fatima Ali", amount: "£89.99", status: "Completed" },
  { id: "ORD-1004", customer: "David Lee", amount: "£210.00", status: "Refunded" },
];

export default function OrdersPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Orders</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3 text-gray-800 font-medium">{order.id}</td>
                <td className="p-3 text-gray-800">{order.customer}</td>
                <td className="p-3 text-gray-800">{order.amount}</td>
                <td className="p-3 text-gray-800">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}