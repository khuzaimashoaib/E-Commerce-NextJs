"use client";
import { createCategory, getAdminCategories, updateCategory } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CategoryForm = ({ categoryId }) => {
  const router = useRouter();
  const isEditing = Boolean(categoryId);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState("");

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    // Auto fill slug only if not editing
    if (!isEditing) {
      setSlug(generateSlug(value));
    }
  };

  useEffect(() => {
    if (!isEditing) return;

    const fetchCategory = async () => {
      try {
        const data = await getAdminCategories();
        const category = data.find((c) => c._id === categoryId);
        if (category) {
          setName(category.name);
          setSlug(category.slug);
          if (category.image) setImagePreview(getImageUrl(category.image));
        }
      } catch (err) {
        setError("Failed to load category");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId, isEditing]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }
    if (!slug.trim()) {
      setError("Slug is required");
      return;
    }

    // Use FormData — sends image as multipart
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    if (image) formData.append("image", image);

    setLoading(true);
    try {
      if (isEditing) {
        await updateCategory(categoryId, formData);
      } else {
        await createCategory(formData);
      }
      router.push("/dashboard/categories");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  if (fetchLoading) {
    return (
      <div className="admin-loading">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <span>Loading category...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-4">
        {/* ── Left Column ── */}
        <div className="col-lg-8">
          <div className="admin-form-card">
            <h6 className="admin-form-card-title">Category Details</h6>

            {error && <div className="alert alert-danger mb-3">{error}</div>}

            {/* Name */}
            <div className="mb-3">
              <label className="admin-label">Category Name*</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Football T-Shirts"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>

            {/* Slug */}
            <div className="mb-3">
              <label className="admin-label">
                Slug*
                <small className="text-muted ms-2">
                  (auto-generated from name)
                </small>
              </label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. football-tshirts"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
              <small className="text-muted">
                Used in URLs: /shop?category={slug || "your-slug"}
              </small>
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="col-lg-4">
          {/* Image */}
          <div className="admin-form-card">
            <h6 className="admin-form-card-title">Category Image</h6>
            {imagePreview ? (
              <div className="admin-image-preview">
                <img src={imagePreview} alt="preview" />
                <button
                  type="button"
                  className="admin-image-remove"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            ) : (
              <label className="admin-image-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <span>Click to upload image</span>
                <small>PNG, JPG up to 5MB</small>
              </label>
            )}
          </div>

          {/* Actions */}
          <div className="admin-form-card mt-4">
            <button
              type="submit"
              className="admin-btn-save w-100 mb-2"
              disabled={loading}
            >
              <i className="fa-solid fa-floppy-disk me-2"></i>
              {loading
                ? "Saving..."
                : isEditing
                  ? "Update Category"
                  : "Save Category"}
            </button>
            <Link
              href="/dashboard/categories"
              className="admin-btn-cancel w-100 d-block text-center"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CategoryForm;
