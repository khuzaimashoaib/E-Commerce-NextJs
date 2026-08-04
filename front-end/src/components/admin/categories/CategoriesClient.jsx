"use client";

import { useEffect, useState } from "react";
import AdminModal from "@/components/admin/ui/AdminModal";
import AdminTable from "@/components/admin/ui/AdminTable";
import AdminPageHeader from "../ui/AdminPageHeader";
import { deleteCategory, getAdminCategories } from "@/lib/api";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils/imageUtils";

const COLUMNS = ["#", "Image", "Name", "Slug", "Products", "Actions"];

export default function CategoriesClient() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const data = await getAdminCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete category "${name}"?`)) return;
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <span>Loading categories...</span>
      </div>
    );
  }

  return (
    <>
      <AdminTable columns={COLUMNS} isEmpty={categories.length === 0}>
        {categories.map((category, index) => (
          <tr key={category._id}>
            <td>{index + 1}</td>
            <td>
              {category.image ? (
                <img
                  src={getImageUrl(category.image)}
                  alt={category.name}
                  className="admin-table-img"
                />
              ) : (
                <div className="admin-table-img-placeholder">
                  <i className="fa-solid fa-image"></i>
                </div>
              )}
              {/* <div className="admin-table-img-placeholder">
                <i className="fa-solid fa-image"></i>
              </div> */}
            </td>
            <td>
              <strong>{category.name}</strong>
            </td>
            <td>
              <span className="admin-slug">{category.slug}</span>
            </td>
            <td>{category.productCount ?? 0} products</td>
            <td>
              <div className="admin-action-btns">
                <Link
                  href={`/dashboard/categories/${category._id}/edit`}
                  className="admin-btn-edit"
                >
                  <i className="fa-solid fa-pen"></i>
                </Link>
                <button
                  className="admin-btn-delete"
                  onClick={() => handleDelete(category._id, category.name)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </>
  );
}
