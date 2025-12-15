import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
