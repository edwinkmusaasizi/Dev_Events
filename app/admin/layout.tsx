import AdminSidebar from "@/components/admin/AdminSidebar";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
