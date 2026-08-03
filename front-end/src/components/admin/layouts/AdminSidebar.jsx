"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "fa-solid fa-gauge",
  },
  {
    label: "Products",
    href: "/dashboard/products",
    icon: "fa-solid fa-box",
  },
  {
    label: "Categories",
    href: "/dashboard/categories",
    icon: "fa-solid fa-tags",
  },
  {
    label: "Attributes",
    href: "/dashboard/attributes",
    icon: "fa-solid fa-list-check",
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: "fa-solid fa-bag-shopping",
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: "fa-solid fa-users",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="admin-sidebar-logo">
        <Link href="/dashboard">
          <Image
            src="/assets/img/logo/logo-4.svg"
            alt="logo"
            width={130}
            height={45}
          />
        </Link>
      </div>

      {/* Nav */}
      <nav className="admin-sidebar-nav">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`admin-nav-item ${isActive(item.href) ? "active" : ""}`}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom — visit site */}
      <div className="admin-sidebar-bottom">
        <Link href="/" className="admin-nav-item visit-site" target="_blank">
          <span>Visit Site</span>
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </Link>
      </div>
    </aside>
  );
}
