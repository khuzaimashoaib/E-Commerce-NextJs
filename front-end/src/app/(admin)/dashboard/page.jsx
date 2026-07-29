import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h4 className="mb-4">Overview</h4>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {[
          {
            label: "Total Products",
            value: "0",
            icon: "fa-solid fa-box",
            color: "#4361ee",
          },
          {
            label: "Total Orders",
            value: "0",
            icon: "fa-solid fa-bag-shopping",
            color: "#f72585",
          },
          {
            label: "Total Users",
            value: "0",
            icon: "fa-solid fa-users",
            color: "#4cc9f0",
          },
          {
            label: "Total Revenue",
            value: "$0",
            icon: "fa-solid fa-dollar-sign",
            color: "#7209b7",
          },
        ].map((stat) => (
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
    </div>
  );
};

export default Dashboard;
