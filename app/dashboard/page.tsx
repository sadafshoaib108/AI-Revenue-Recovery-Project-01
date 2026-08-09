import StatCard from "@/components/cards/StatCard";
import ProblemCard from "@/components/problems/ProblemCard";
import { detectProblems } from "@/lib/detectProblems";

const store = {
  revenue: "£24,500",
  revenueChange: "12.5%",
  orders: "500",
  ordersChange: "8.2%",
  customers: "380",
  customersChange: "6.4%",
  conversion: "2.8%",
  conversionChange: "4.1%",
};

export default function DashboardHome() {
  const problems = detectProblems();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1 text-gray-900">Welcome back 👋</h2>
      <p className="text-gray-500 mb-6">Here's what's happening with your store today.</p>

      <div className="flex gap-4 flex-wrap mb-8">
        <StatCard title="Revenue" value={store.revenue} change={store.revenueChange} positive={true} />
        <StatCard title="Orders" value={store.orders} change={store.ordersChange} positive={true} />
        <StatCard title="Customers" value={store.customers} change={store.customersChange} positive={true} />
        <StatCard title="Conversion" value={store.conversion} change={store.conversionChange} positive={false} />
      </div>

      <h3 className="text-lg font-bold mb-3 text-gray-900">🚨 Problems Detected</h3>
      <div className="flex flex-col gap-3">
        {problems.length === 0 ? (
          <p className="text-gray-500">No problems detected. Everything looks healthy! ✅</p>
        ) : (
          problems.map((problem) => (
            <ProblemCard
              key={problem.title}
              title={problem.title}
              severity={problem.severity}
              description={problem.description}
            />
          ))
        )}
      </div>
    </div>
  );
}