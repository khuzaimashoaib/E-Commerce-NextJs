const BADGE_STYLES = {
  // Order status
  pending: { bg: "#fff3cd", color: "#856404" },
  processing: { bg: "#cfe2ff", color: "#084298" },
  shipped: { bg: "#d1ecf1", color: "#0c5460" },
  delivered: { bg: "#d1e7dd", color: "#0a3622" },
  cancelled: { bg: "#f8d7da", color: "#842029" },
  // User role
  admin: { bg: "#f8d7da", color: "#842029" },
  customer: { bg: "#d1e7dd", color: "#0a3622" },
  // Product
  active: { bg: "#d1e7dd", color: "#0a3622" },
  outofstock: { bg: "#f8d7da", color: "#842029" },
};

export default function AdminBadge({ status }) {
  const style = BADGE_STYLES[status?.toLowerCase()] || {
    bg: "#e2e3e5",
    color: "#41464b",
  };

  return (
    <span
      className="admin-badge"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {status}
    </span>
  );
}
