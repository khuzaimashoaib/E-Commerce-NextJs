import Link from "next/link";

export default function AdminPageHeader({
  title,
  actionText,
  actionHref,
  onActionClick,
  className = "",
}) {
  return (
    <div
      className={`d-flex justify-content-between align-items-center ${className}`}
    >
      <h4 className="admin-page-title">{title}</h4>

      {actionText &&
        (actionHref ? (
          <Link href={actionHref} className="admin-add-btn">
            <i className="fa-solid fa-plus"></i>
            {actionText}
          </Link>
        ) : (
          <button className="admin-add-btn" onClick={onActionClick}>
            <i className="fa-solid fa-plus"></i>
            {actionText}
          </button>
        ))}
    </div>
  );
}
