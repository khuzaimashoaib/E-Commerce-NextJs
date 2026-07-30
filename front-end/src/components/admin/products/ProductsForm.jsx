"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CATEGORIES = [
  "Football T-Shirts",
  "Shorts",
  "Gloves",
  "Shin Guards",
  "Socks",
  "Shoes",
  "Footballs",
];

const SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
];

const DEFAULT_FORM = {
  name: "",
  category: "",
  brand: "",
  price: "",
  discountPrice: "",
  description: "",
  isFeatured: false,
};

const DEFAULT_VARIANT = { size: "", color: "", stock: "", sku: "" };

export default function ProductForm({ productId }) {
  const router = useRouter();
  const isEditing = Boolean(productId); // ← true = edit, false = add

  const [form, setForm] = useState(DEFAULT_FORM);
  const [variants, setVariants] = useState([DEFAULT_VARIANT]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);

  // If editing — fetch existing product data
  useEffect(() => {
    if (!isEditing) return;

    const fetchProduct = async () => {
      try {
        // Will connect to real API later
        // Simulating fetched product for now
        const mockProduct = {
          name: "Nike Dri-FIT Football Jersey",
          category: "Football T-Shirts",
          brand: "Nike",
          price: "45",
          discountPrice: "35",
          description: "Lightweight, breathable football jersey.",
          isFeatured: true,
          images: ["/assets/front-end-images/placeholder.jpg"],
          variants: [
            { size: "S", color: "Red", stock: "10", sku: "TSH-NIKE-S-RED" },
            { size: "M", color: "Red", stock: "15", sku: "TSH-NIKE-M-RED" },
          ],
        };

        // Pre-fill form with existing data
        setForm({
          name: mockProduct.name,
          category: mockProduct.category,
          brand: mockProduct.brand,
          price: mockProduct.price,
          discountPrice: mockProduct.discountPrice,
          description: mockProduct.description,
          isFeatured: mockProduct.isFeatured,
        });
        setVariants(mockProduct.variants);
        setImagePreview(mockProduct.images?.[0] || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProduct();
  }, [productId, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVariantChange = (index, field, value) => {
    setVariants((prev) =>
      prev.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant,
      ),
    );
  };

  const addVariant = () => {
    setVariants((prev) => [...prev, { ...DEFAULT_VARIANT }]);
  };

  const removeVariant = (index) => {
    if (variants.length === 1) return;
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Will connect to backend later
      if (isEditing) {
        console.log("Updating product:", productId, form, variants);
      } else {
        console.log("Creating product:", form, variants);
      }
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Failed to save product:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while fetching existing product
  if (fetchLoading) {
    return (
      <div className="admin-loading">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <span>Loading product...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-4">
        {/* ── Left Column ── */}
        <div className="col-lg-8">
          {/* Basic Info */}
          <div className="admin-form-card">
            <h6 className="admin-form-card-title">Basic Information</h6>
            <div className="row g-3">
              <div className="col-md-12">
                <label className="admin-label">Product Name*</label>
                <input
                  type="text"
                  name="name"
                  className="admin-input"
                  placeholder="e.g. Nike Dri-FIT Football Jersey"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="admin-label">Brand</label>
                <input
                  type="text"
                  name="brand"
                  className="admin-input"
                  placeholder="e.g. Nike, Adidas"
                  value={form.brand}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="admin-label">Category*</label>
                <select
                  name="category"
                  className="admin-input"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-12">
                <label className="admin-label">Description*</label>
                <textarea
                  name="description"
                  className="admin-input"
                  rows="4"
                  placeholder="Product description..."
                  value={form.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="admin-form-card mt-4">
            <h6 className="admin-form-card-title">Pricing</h6>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="admin-label">Price*</label>
                <div className="admin-input-prefix">
                  <span>$</span>
                  <input
                    type="number"
                    name="price"
                    className="admin-input"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="admin-label">
                  Discount Price
                  <small className="text-muted ms-1">(optional)</small>
                </label>
                <div className="admin-input-prefix">
                  <span>$</span>
                  <input
                    type="number"
                    name="discountPrice"
                    className="admin-input"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={form.discountPrice}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="admin-form-card mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="admin-form-card-title mb-0">
                Variants (Size / Color / Stock)
              </h6>
              <button
                type="button"
                className="admin-add-btn"
                onClick={addVariant}
              >
                <i className="fa-solid fa-plus"></i>
                Add Variant
              </button>
            </div>

            <div className="admin-variant-header">
              <span>Size</span>
              <span>Color</span>
              <span>Stock</span>
              <span>SKU</span>
              <span></span>
            </div>

            {variants.map((variant, index) => (
              <div key={index} className="admin-variant-row">
                <select
                  className="admin-input"
                  value={variant.size}
                  onChange={(e) =>
                    handleVariantChange(index, "size", e.target.value)
                  }
                >
                  <option value="">Size</option>
                  {SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  className="admin-input"
                  placeholder="Color (optional)"
                  value={variant.color}
                  onChange={(e) =>
                    handleVariantChange(index, "color", e.target.value)
                  }
                />

                <input
                  type="number"
                  className="admin-input"
                  placeholder="Stock"
                  min="0"
                  value={variant.stock}
                  onChange={(e) =>
                    handleVariantChange(index, "stock", e.target.value)
                  }
                />

                <input
                  type="text"
                  className="admin-input"
                  placeholder="SKU"
                  value={variant.sku}
                  onChange={(e) =>
                    handleVariantChange(index, "sku", e.target.value)
                  }
                />

                <button
                  type="button"
                  className="admin-btn-delete"
                  onClick={() => removeVariant(index)}
                  disabled={variants.length === 1}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="col-lg-4">
          {/* Product Image */}
          <div className="admin-form-card">
            <h6 className="admin-form-card-title">Product Image</h6>
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

          {/* Settings */}
          <div className="admin-form-card mt-4">
            <h6 className="admin-form-card-title">Settings</h6>
            <label className="admin-toggle-label">
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
              />
              <span className="admin-toggle-text">
                Featured Product
                <small>Show on homepage</small>
              </span>
            </label>
          </div>

          {/* Action Buttons */}
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
                  ? "Update Product"
                  : "Save Product"}
            </button>
            <Link
              href="/dashboard/products"
              className="admin-btn-cancel w-100 d-block text-center"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
