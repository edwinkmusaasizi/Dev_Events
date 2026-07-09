'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Users, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Manage Events", href: "/admin/events", icon: Calendar },
    { name: "Manage Users", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border-dark bg-dark-100 flex flex-col max-lg:hidden">
      <div className="p-6 border-b border-border-dark">
        <Link href="/admin" className="flex items-center gap-2">
          <p className="text-xl font-bold italic text-white">DevEvent <span className="text-primary text-sm not-italic font-normal">Admin</span></p>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? "bg-primary text-black font-semibold"
                  : "text-light-200 hover:bg-dark-200 hover:text-white"
              }`}
            >
              <Icon size={20} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border-dark">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-light-200 hover:bg-dark-200 hover:text-white rounded-md transition-colors"
        >
          <LogOut size={20} />
          Back to Main Site
        </button>
      </div>
    </aside>
  );
}
