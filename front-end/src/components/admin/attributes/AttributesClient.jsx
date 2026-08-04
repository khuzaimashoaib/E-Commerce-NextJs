"use client";

import React, { useEffect, useState } from "react";
import AdminTable from "../ui/AdminTable";
import { deleteAttribute, getAdminAttributes } from "@/lib/api";
import Link from "next/link";

const COLUMNS = ["#", "Attribute Name", "Values", "Actions"];

const AttributesClient = () => {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAttributes = async () => {
    try {
      const data = await getAdminAttributes();
      setAttributes(data);
    } catch (error) {
      console.error("Failed to fetch attributes:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAttributes();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this attribute?")) return;
    try {
      await deleteAttribute(id);
      setAttributes((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <span>Loading...</span>
      </div>
    );
  }
  return (
    <>
      <AdminTable columns={COLUMNS} isEmpty={attributes.length === 0}>
        {attributes.map((attr, index) => (
          <tr key={attr._id}>
            <td>{index + 1}</td>
            <td>
              <strong>{attr.name}</strong>
            </td>
            <td>
              <div className="admin-attribute-values">
                {attr.values.map((val) => (
                  <span key={val} className="admin-value-tag">
                    {val}
                  </span>
                ))}
              </div>
            </td>
            <td>
              <div className="admin-action-btns">
                <Link
                  href={`/dashboard/attributes/${attr._id}/edit`}
                  className="admin-btn-edit"
                >
                  <i className="fa-solid fa-pen"></i>
                </Link>
                <button
                  className="admin-btn-delete"
                  onClick={() => handleDelete(attr._id)}
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
};

export default AttributesClient;
