"use client";

import { useState } from "react";
import AdminTable from "../ui/AdminTable";
import AdminBadge from "../ui/AdminBadge";
import AdminPageHeader from "../ui/AdminPageHeader";
import Link from "next/link";

const STATIC_PRODUCTS = [
  {
    _id: "1",
    image: "/assets/back-end-images/products/t-shirt.jpg",
    name: "Nike Dri-FIT Football Jersey",
    category: "Football T-Shirts",
    price: 45,
    discountPrice: 35,
    stock: 33,
    status: "active",
  },
  {
    _id: "2",
    image: "/assets/back-end-images/products/shoes-1.jpg",
    name: "Nike Mercurial Vapor 15",
    category: "Shoes",
    price: 180,
    discountPrice: 0,
    stock: 16,
    status: "active",
  },
];

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
  const [products] = useState(STATIC_PRODUCTS);

  return (
    <>
      <AdminPageHeader
        title="Products"
        actionText="Add Product"
        actionHref="/dashboard/products/add"
        className="mb-3"
      />

      <AdminTable columns={COLUMNS} isEmpty={products.length === 0}>
        {products.map((product, index) => (
          <tr key={product._id}>
            <td>{index + 1}</td>
            <td>
              <img
                src={product.image}
                alt={product.name}
                className="admin-table-img"
              />
            </td>
            <td>{product.name}</td>
            <td>{product.category}</td>
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
            <td>{product.stock}</td>
            <td>
              <AdminBadge
                status={product.stock === 0 ? "outofstock" : product.status}
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
                <button className="admin-btn-delete">
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
