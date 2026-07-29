"use client";

import { useState } from "react";
import AdminTable from "../ui/AdminTable";
import AdminBadge from "../ui/AdminBadge";
import AdminModal from "../ui/AdminModal";
import AdminPageHeader from "../ui/AdminPageHeader";

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
  const [showModal, setShowModal] = useState(false);
  const [products] = useState(STATIC_PRODUCTS);

  return (
    <>
      {/* Add Product Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <AdminPageHeader title="Products" />

        <button className="admin-add-btn" onClick={() => setShowModal(true)}>
          <i className="fa-solid fa-plus"></i>
          Add Product
        </button>
      </div>

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
        <AdminModal title="Add Product" onClose={() => setShowModal(false)}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="admin-label">Product Name</label>
              <input
                type="text"
                className="admin-input"
                placeholder="Enter product name"
              />
            </div>
            <div className="col-md-6">
              <label className="admin-label">Category</label>
              <select className="admin-input">
                <option>Select category</option>
                <option>Football T-Shirts</option>
                <option>Shoes</option>
                <option>Gloves</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="admin-label">Price</label>
              <input
                type="number"
                className="admin-input"
                placeholder="$0.00"
              />
            </div>
            <div className="col-md-6">
              <label className="admin-label">Discount Price</label>
              <input
                type="number"
                className="admin-input"
                placeholder="$0.00"
              />
            </div>
            <div className="col-md-12">
              <label className="admin-label">Brand</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Nike"
              />
            </div>
            <div className="col-md-12">
              <label className="admin-label">Description</label>
              <textarea
                className="admin-input"
                rows="3"
                placeholder="Product description..."
              ></textarea>
            </div>
            <div className="col-md-12">
              <label className="admin-label">Product Image</label>
              <input type="file" className="admin-input" accept="image/*" />
            </div>
            <div className="col-md-12 d-flex gap-2 justify-content-end">
              <button
                className="admin-btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="admin-btn-save">Save Product</button>
            </div>
          </div>
        </AdminModal>
      )}
    </>
  );
}
