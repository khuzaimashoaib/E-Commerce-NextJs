"use client";

import Link from "next/link";

const COUNTRIES = ["Pakistan"];
const STATES = ["Punjab", "Sindh", "KPK", "Balochistan"];

export default function CheckoutForm({
  form,
  errors,
  onChange,
  onSubmit,
  loading,
}) {
  return (
    <div className="checkout-left">
      {/* Login Prompt */}
      <div className="login-prompt">
        Already have an account? <Link href="/login">Login Now</Link>
      </div>
      <div className="section-box">
        <h2 className="title">Information</h2>
        <div className="row g-3 form-grid">
          <div className="col-md-6">
            <input
              type="text"
              name="firstName"
              placeholder="First Name*"
              value={form.firstName}
              onChange={onChange}
            />
            {errors.firstName && (
              <small className="text-danger">{errors.firstName}</small>
            )}
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name*"
              value={form.lastName}
              onChange={onChange}
            />
            {errors.lastName && (
              <small className="text-danger">{errors.lastName}</small>
            )}
          </div>
          <div className="col-md-6">
            <input
              type="email"
              name="email"
              placeholder="Email Address*"
              value={form.email}
              onChange={onChange}
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          <div className="col-md-6">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number*"
              value={form.phone}
              onChange={onChange}
            />
            {errors.phone && (
              <small className="text-danger">{errors.phone}</small>
            )}
          </div>
          <div className="col-md-12">
            <div className="nice-select-wrapper full-width">
              <select name="country" value={form.country} onChange={onChange}>
                <option value="">Choose Country/Region*</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            {errors.country && (
              <small className="text-danger">{errors.country}</small>
            )}
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="city"
              placeholder="Town/City*"
              value={form.city}
              onChange={onChange}
            />
            {errors.city && (
              <small className="text-danger">{errors.city}</small>
            )}
          </div>

          <div className="col-md-6">
            <input
              type="text"
              name="street"
              placeholder="Street*"
              value={form.street}
              onChange={onChange}
            />
            {errors.street && (
              <small className="text-danger">{errors.street}</small>
            )}
          </div>
          <div className="col-md-6">
            <div className="nice-select-wrapper">
              <select name="state" value={form.state} onChange={onChange}>
                <option value="">Choose State*</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>

          <div className="col-md-6">
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code*"
              value={form.postalCode}
              onChange={onChange}
            />
            {errors.postalCode && (
              <small className="text-danger">{errors.postalCode}</small>
            )}
          </div>

          <div className="col-md-12">
            <textarea
              className="full-width"
              rows="5"
              name="note"
              placeholder="Write Note..."
              value={form.note}
              onChange={onChange}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="section-box payment-section">
        <h2 className="title">Payment Option</h2>
        <div className="payment-methods">
          <div className="method-item payment-option active">
            <div className="method-header">
              <div className="custom-radio">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="cod"
                  value="cod"
                  checked={form.paymentMethod === "cod"}
                  onChange={onChange}
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
            </div>
            {form.paymentMethod === "cod" && (
              <div className="method-content mt-2">
                <p className="desc">
                  Pay with cash upon delivery. Our delivery agent will collect
                  the payment at your doorstep.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        className="theme-btn text-center w-100"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
