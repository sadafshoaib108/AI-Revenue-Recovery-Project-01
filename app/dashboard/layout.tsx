import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <navbar />
        <main className="p-6 bg-gray-50 flex-1">{children}</main>
      </div>
    </div>
  );
}