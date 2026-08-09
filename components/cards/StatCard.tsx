type StatCardProps = {
  title: string;
  value: string;
  change: string;
  positive: boolean;
};

export default function StatCard({ title, value, change, positive }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-5 flex-1">
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className={`text-sm mt-1 ${positive ? "text-green-600" : "text-red-600"}`}>
        {positive ? "↑" : "↓"} {change}
      </p>
    </div>
  );
}