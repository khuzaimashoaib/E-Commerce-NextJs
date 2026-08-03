"use client";
import { createAttribute, updateAttribute } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AttributeForm = ({ attributeId }) => {
  const router = useRouter();
  const isEditing = Boolean(attributeId);

  const [name, setName] = useState("");
  const [values, setValues] = useState([]); // ["XS", "S", "M"]
  const [inputValue, setInputValue] = useState(""); // current tag input
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) return;

    const fetchAttribute = async () => {
      try {
        const data = await getAdminAttributes();
        const attribute = data.find((a) => a._id === attributeId);
        if (attribute) {
          setName(attribute.name);
          setValues(attribute.values);
        }
      } catch (err) {
        setError("Failed to load attribute");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchAttribute();
  }, [attributeId, isEditing]);
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addValue();
    }
  };
  const addValue = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (values.includes(trimmed)) {
      setInputValue("");
      return;
    }
    setValues((prev) => [...prev, trimmed]);
    setInputValue("");
  };

  const removeValue = (val) => {
    setValues((prev) => prev.filter((v) => v !== val));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Attribute name is required");
      return;
    }
    if (values.length === 0) {
      setError("Add at least one value");
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        await updateAttribute(attributeId, { name, values });
      } else {
        await createAttribute({ name, values });
      }
      router.push("/dashboard/attributes");
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
        <span>Loading attribute...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="admin-form-card">
            <h6 className="admin-form-card-title">Attribute Details</h6>

            {error && <div className="alert alert-danger mb-3">{error}</div>}

            {/* Attribute Name */}
            <div className="mb-4">
              <label className="admin-label">Attribute Name*</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Size, Color, Material"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <small className="text-muted">
                This is the name that appears on the product page
              </small>
            </div>

            {/* Values */}
            <div>
              <label className="admin-label">Values*</label>

              {/* Tag Input */}
              <div className="admin-tag-input">
                {values.map((val) => (
                  <span key={val} className="admin-tag">
                    {val}
                    <button type="button" onClick={() => removeValue(val)}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Type value and press Enter..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  onBlur={addValue}
                />
              </div>

              <small className="text-muted">
                Press <strong>Enter</strong> or <strong>comma</strong> to add
                each value
              </small>
            </div>
          </div>
        </div>

        {/* Right Column — Actions */}
        <div className="col-lg-4">
          <div className="admin-form-card">
            <h6 className="admin-form-card-title">Preview</h6>
            {values.length > 0 ? (
              <div className="admin-attribute-values">
                {values.map((val) => (
                  <span key={val} className="admin-value-tag">
                    {val}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted" style={{ fontSize: "13px" }}>
                No values added yet
              </p>
            )}
          </div>

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
                  ? "Update Attribute"
                  : "Save Attribute"}
            </button>
            <Link
              href="/dashboard/attributes"
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

export default AttributeForm;
