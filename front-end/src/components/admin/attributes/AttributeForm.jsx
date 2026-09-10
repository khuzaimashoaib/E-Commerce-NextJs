"use client";
import { createAttribute, updateAttribute, getAttributeById } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AttributeForm = ({ attributeId }) => {
  const router = useRouter();
  const isEditing = Boolean(attributeId);

  const [name, setName] = useState("");
  const [values, setValues] = useState([]); // ["XS", "S", "M"]
  const [inputValue, setInputValue] = useState(""); // current tag input
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);

  // Fetch existing attribute when editing
  useEffect(() => {
    if (!isEditing) return;

    const fetchAttribute = async () => {
      try {
        const attribute = await getAttributeById(attributeId);
        setName(attribute.name);
        setValues(attribute.values); // ← pre-fill ALL existing values
      } catch (err) {
        toast.error("Failed to load attribute");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchAttribute();
  }, [attributeId, isEditing]);

  const addValue = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (values.includes(trimmed)) {
      setInputValue("");
      return;
    }
    // ← spreads existing values + adds new one
    setValues((prev) => [...prev, trimmed]);
    setInputValue("");
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addValue();
    }
  };

  const removeValue = (val) => {
    setValues((prev) => prev.filter((v) => v !== val));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add any pending input value that wasn't confirmed with Enter
    let finalValues = [...values];
    const pendingValue = inputValue.trim();
    if (pendingValue && !values.includes(pendingValue)) {
      finalValues = [...values, pendingValue];
      setValues(finalValues);
      setInputValue("");
    }

    if (!name.trim()) {
      toast("Attribute name is required", {
        icon: "⚠️",
      });
      // setError("Attribute name is required");
      return;
    }
    if (finalValues.length === 0) {
      toast("Add at least one value", {
        icon: "⚠️",
      });
      // setError("Add at least one value");
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        // Sends ALL values — existing + newly added
        await updateAttribute(attributeId, { name, values: finalValues });
      } else {
        await createAttribute({ name, values: finalValues });
      }
      router.push("/dashboard/attributes");
    } catch (err) {
      toast.error("Something went wrong");
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

            {/* {error && <div className="alert alert-danger mb-3">{error}</div>} */}

            {/* Attribute Name */}
            <div className="mb-4">
              <label className="admin-label">Attribute Name*</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Size, Color, Material"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
