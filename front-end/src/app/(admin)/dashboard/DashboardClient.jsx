"use client";

import { getDashboardStats } from "@/lib/api";
import { useEffect, useState } from "react";

export default function DashboardClient() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        console.log(data);

        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: "fa-solid fa-box",
      color: "#4361ee",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: "fa-solid fa-bag-shopping",
      color: "#f72585",
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: "fa-solid fa-users",
      color: "#4cc9f0",
    },
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue}`,
      icon: "fa-solid fa-dollar-sign",
      color: "#7209b7",
    },
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h4 className="mb-4">Overview</h4>

      <div className="row g-4 mb-4">
        {cards.map((stat) => (
          <div key={stat.label} className="col-xl-3 col-md-6">
            <div className="admin-stat-card">
              <div
                className="admin-stat-icon"
                style={{ backgroundColor: stat.color }}
              >
                <i className={stat.icon}></i>
              </div>

              <div className="admin-stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
