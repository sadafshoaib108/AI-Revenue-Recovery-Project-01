export default function Navbar() {
  return (
    <header className="w-full bg-white border-b px-6 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Store:</span>
        <select className="border rounded px-3 py-1 text-sm">
          <option>Demo Fashion Store</option>
        </select>
      </div>
    </header>
  );
}