"use client";

export default function AdminModal({ title, onClose, children }) {
  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="admin-modal-header">
          <h5>{title}</h5>
          <button className="admin-modal-close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Content */}
        <div className="admin-modal-body">{children}</div>
      </div>
    </div>
  );
}
