"use client";

import { useEffect, useState } from "react";
import AdminTable from "../ui/AdminTable";
import AdminBadge from "../ui/AdminBadge";
import AdminPageHeader from "../ui/AdminPageHeader";
import Link from "next/link";
import { deleteProduct, getAdminProducts } from "@/lib/api";
import { getImageUrl } from "@/lib/utils/imageUtils";

const COLUMNS = [
  "#",
  "Image",
  "Name",
  "Category",
  "Price",
  "Stock",
  "Status",
  "Actions",
];

export default function ProductsClient() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    try {
      const data = await getAdminProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleDelete = async (id, name) => {
    if (!confirm(`Delete product "${name}"?`)) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      alert(error.message);
    }
  };
  const getTotalStock = (variants) => {
    return variants.reduce((sum, v) => sum + Number(v.stock || 0), 0);
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <span>Loading products...</span>
      </div>
    );
  }

  return (
    <>
      <AdminTable columns={COLUMNS} isEmpty={products.length === 0}>
        {products.map((product, index) => {
          const totalStock = getTotalStock(product.variants);
          return (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={getImageUrl(product.images?.[0])}
                  alt={product.name}
                  className="admin-table-img"
                />
              </td>
              <td>
                <div>
                  <p className="mb-0 fw-500">{product.name}</p>
                  {product.brand && (
                    <small className="text-muted">{product.brand}</small>
                  )}
                </div>
              </td>
              <td>{product.category?.name || "—"}</td>
              <td>
                {product.discountPrice > 0 ? (
                  <>
                    <del className="text-muted">${product.price}</del>{" "}
                    <strong>${product.discountPrice}</strong>
                  </>
                ) : (
                  <strong>${product.price}</strong>
                )}
              </td>
              <td>{totalStock}</td>
              <td>
                <AdminBadge
                  status={totalStock === 0 ? "outofstock" : "active"}
                />
              </td>
              <td>
                <div className="admin-action-btns">
                  <Link
                    href={`/dashboard/products/${product._id}/edit`}
                    className="admin-btn-edit"
                  >
                    <i className="fa-solid fa-pen"></i>
                  </Link>
                  <button
                    className="admin-btn-delete"
                    onClick={() => handleDelete(product._id, product.name)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </AdminTable>
    </>
  );
}
