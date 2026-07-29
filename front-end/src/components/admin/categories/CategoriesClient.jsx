"use client";

import { useState } from "react";
import AdminModal from "@/components/admin/ui/AdminModal";
import AdminTable from "@/components/admin/ui/AdminTable";
import AdminPageHeader from "../ui/AdminPageHeader";

const STATIC_CATEGORIES = [
  {
    _id: "1",
    name: "Football T-Shirts",
    slug: "football-tshirts",
    products: 5,
  },
  { _id: "2", name: "Shorts", slug: "shorts", products: 3 },
  { _id: "3", name: "Gloves", slug: "gloves", products: 2 },
  { _id: "4", name: "Shin Guards", slug: "shin-guards", products: 4 },
  { _id: "5", name: "Socks", slug: "socks", products: 6 },
  { _id: "6", name: "Shoes", slug: "shoes", products: 8 },
  { _id: "7", name: "Footballs", slug: "footballs", products: 3 },
];

const COLUMNS = ["#", "Name", "Slug", "Products", "Actions"];

export default function CategoriesClient() {
  const [showModal, setShowModal] = useState(false);
  const [categories] = useState(STATIC_CATEGORIES);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <AdminPageHeader title="Categories" />

        <button className="admin-add-btn" onClick={() => setShowModal(true)}>
          <i className="fa-solid fa-plus"></i>
          Add Category
        </button>
      </div>

      <AdminTable columns={COLUMNS} isEmpty={categories.length === 0}>
        {categories.map((category, index) => (
          <tr key={category._id}>
            <td>{index + 1}</td>
            <td>{category.name}</td>
            <td>
              <span className="admin-slug">{category.slug}</span>
            </td>
            <td>{category.products} products</td>
            <td>
              <div className="admin-action-btns">
                <button className="admin-btn-edit">
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button className="admin-btn-delete">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>

      {showModal && (
        <AdminModal title="Add Category" onClose={() => setShowModal(false)}>
          <div className="row g-3">
            <div className="col-md-12">
              <label className="admin-label">Category Name</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Football T-Shirts"
              />
            </div>
            <div className="col-md-12">
              <label className="admin-label">Slug</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. football-tshirts"
              />
            </div>
            <div className="col-md-12">
              <label className="admin-label">Category Image</label>
              <input type="file" className="admin-input" accept="image/*" />
            </div>
            <div className="col-md-12 d-flex gap-2 justify-content-end">
              <button
                className="admin-btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="admin-btn-save">Save Category</button>
            </div>
          </div>
        </AdminModal>
      )}
    </>
  );
}
