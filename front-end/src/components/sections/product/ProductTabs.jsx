"use client";

import { useState } from "react";

const TABS = [
  { id: "description", label: "Description" },
  { id: "additional", label: "Additional Information" },
];

export default function ProductTabs({ description }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="single-tab mt-5">
      {/* Tab Nav */}
      <ul className="nav mb-5" role="tablist">
        {TABS.map((tab) => (
          <li key={tab.id} className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
            >
              <span>{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Description Tab */}
        {activeTab === "description" && (
          <div className="tab-pane fade active show" role="tabpanel">
            <div className="description-items">
              <div className="description-content">
                <h3>Product Description</h3>
                <p className="mb-4">{description}</p>
                <div className="description-list-items d-flex justify-content-between">
                  <ul className="description-list">
                    <li>
                      Occasion: <span>Lifestyle, Sport</span>
                    </li>
                    <li>
                      Country: <span>Italy</span>
                    </li>
                  </ul>
                  <ul className="description-list">
                    <li>
                      Occasion: <span>Lifestyle, Sport</span>
                    </li>
                    <li>
                      Country: <span>Italy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Information Tab */}
        {activeTab === "additional" && (
          <div className="tab-pane fade active show" role="tabpanel">
            <div className="table-responsive mb-15">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Weight</td>
                    <td>240 Ton</td>
                  </tr>
                  <tr>
                    <td>Dimensions</td>
                    <td>20 × 30 × 40 cm</td>
                  </tr>
                  <tr>
                    <td>Colors</td>
                    <td>Black, Blue, Green</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
