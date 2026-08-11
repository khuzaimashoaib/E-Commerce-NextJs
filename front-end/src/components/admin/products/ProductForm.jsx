"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  createProduct,
  updateProduct,
  getAdminProducts,
  getAdminCategories,
  getAttributes,
} from "@/lib/api";
import { getImageUrl } from "@/lib/utils/imageUtils";

const DEFAULT_FORM = {
  name: "",
  category: "",
  brand: "",
  price: "",
  discountPrice: "",
  description: "",
  isFeatured: false,
};

const DEFAULT_VARIANT = { attributes: {}, stock: "", sku: "" };

export default function ProductForm({ productId }) {
  const router = useRouter();
  const isEditing = Boolean(productId);

  const [form, setForm] = useState(DEFAULT_FORM);
  const [variants, setVariants] = useState([{ ...DEFAULT_VARIANT }]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch categories + attributes on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsData, attrsData] = await Promise.all([
          getAdminCategories(),
          getAttributes(),
        ]);
        console.log("Categories:", catsData); // ← add this
        console.log("Attributes:", attrsData); // ← add this
        setCategories(catsData);
        setAttributesList(attrsData);
      } catch (err) {
        setError("Failed to load form data");
      }
    };
    fetchData();
  }, []);

  // If editing — fetch existing product
  useEffect(() => {
    if (!isEditing) {
      setFetchLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const data = await getAdminProducts();
        const product = data.find((p) => p._id === productId);
        if (product) {
          setForm({
            name: product.name,
            category: product.category?._id || "",
            brand: product.brand || "",
            price: product.price,
            discountPrice: product.discountPrice || "",
            description: product.description,
            isFeatured: product.isFeatured,
          });
          setVariants(
            product.variants.map((v) => ({
              attributes: v.attributes || { size: v.size, color: v.color },
              stock: v.stock,
              sku: v.sku,
            })),
          );
          if (product.images?.[0]) {
            setImagePreview(getImageUrl(product.images[0]));
          }
        }
      } catch (err) {
        setError("Failed to load product");
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

  // Update attribute value for a variant
  const handleVariantAttributeChange = (variantIndex, attrName, value) => {
    setVariants((prev) =>
      prev.map((variant, i) =>
        i === variantIndex
          ? {
              ...variant,
              attributes: { ...variant.attributes, [attrName]: value },
            }
          : variant,
      ),
    );
  };

  const handleVariantChange = (index, field, value) => {
    setVariants((prev) =>
      prev.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant,
      ),
    );
  };

  const addVariant = () => {
    setVariants((prev) => [...prev, { ...DEFAULT_VARIANT, attributes: {} }]);
  };

  const removeVariant = (index) => {
    if (variants.length === 1) return;
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (variants.length === 0) {
      setError("Add at least one variant");
      return;
    }

    // Build FormData — needed for image upload
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("brand", form.brand);
    formData.append("price", form.price);
    formData.append("discountPrice", form.discountPrice || 0);
    formData.append("description", form.description);
    formData.append("isFeatured", form.isFeatured);
    formData.append("variants", JSON.stringify(variants));
    if (image) formData.append("image", image);

    setLoading(true);
    try {
      if (isEditing) {
        await updateProduct(productId, formData);
      } else {
        await createProduct(formData);
      }
      router.push("/dashboard/products");
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
        <span>Loading...</span>
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

            {error && <div className="alert alert-danger mb-3">{error}</div>}

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
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
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

          {/* Variants with Attributes */}
          <div className="admin-form-card mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="admin-form-card-title mb-0">Variants</h6>
              <button
                type="button"
                className="admin-add-btn"
                onClick={addVariant}
              >
                <i className="fa-solid fa-plus"></i>
                Add Variant
              </button>
            </div>

            {attributes.length === 0 ? (
              <div className="alert alert-warning">
                <i className="fa-solid fa-triangle-exclamation me-2"></i>
                No attributes found.{" "}
                <Link href="/dashboard/attributes/add">
                  Add attributes first
                </Link>{" "}
                (e.g. Size, Color)
              </div>
            ) : (
              <>
                {/* Variant Header */}
                <div
                  className="admin-variant-header"
                  style={{
                    gridTemplateColumns: `repeat(${attributes.length}, 1fr) 1fr 1fr 40px`,
                  }}
                >
                  {attributes.map((attr) => (
                    <span key={attr._id}>{attr.name}</span>
                  ))}
                  <span>Stock</span>
                  <span>SKU</span>
                  <span></span>
                </div>

                {/* Variant Rows */}
                {variants.map((variant, index) => (
                  <div
                    key={index}
                    className="admin-variant-row"
                    style={{
                      gridTemplateColumns: `repeat(${attributes.length}, 1fr) 1fr 1fr 40px`,
                    }}
                  >
                    {/* Attribute dropdowns */}
                    {attributes.map((attr) => (
                      <select
                        key={attr._id}
                        className="admin-input"
                        value={variant.attributes?.[attr.name] || ""}
                        onChange={(e) =>
                          handleVariantAttributeChange(
                            index,
                            attr.name,
                            e.target.value,
                          )
                        }
                      >
                        <option value="">{attr.name}</option>
                        {attr.values.map((val) => (
                          <option key={val} value={val}>
                            {val}
                          </option>
                        ))}
                      </select>
                    ))}

                    {/* Stock */}
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

                    {/* SKU */}
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="SKU"
                      value={variant.sku}
                      onChange={(e) =>
                        handleVariantChange(index, "sku", e.target.value)
                      }
                    />

                    {/* Remove */}
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
              </>
            )}
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
