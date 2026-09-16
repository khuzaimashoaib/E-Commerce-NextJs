"use client";

import Link from "next/link";
import StripePaymentForm from "./StripePaymentForm";

const COUNTRIES = ["Pakistan"];
const STATES = ["Punjab", "Sindh", "KPK", "Balochistan"];

export default function CheckoutForm({
  form,
  errors,
  onChange,
  onSubmit,
  loading,
  onPaymentMethodChange,
  stripeClientSecret,
  onStripeSuccess,
  onStripeError,
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
              placeholder="Postal Code"
              value={form.postalCode}
              onChange={onChange}
            />
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
          {/* Cash on Delivery */}
          <div
            className={`method-item mb-3 ${
              form.paymentMethod === "cod" ? "payment-option active" : ""
            }`}
          >
            <div className="method-header">
              <div className="custom-radio">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="cod"
                  value="cod"
                  checked={form.paymentMethod === "cod"}
                  onChange={(e) => {
                    onChange(e);
                    onPaymentMethodChange("cod");
                  }}
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
            </div>
            {form.paymentMethod === "cod" && (
              <div className="method-content mt-2">
                <p className="desc">
                  Pay with cash upon delivery. Our agent will collect payment at
                  your doorstep.
                </p>
              </div>
            )}
          </div>
          <div
            className={`method-item ${
              form.paymentMethod === "stripe" ? "payment-option active" : ""
            }`}
          >
            <div className="method-header">
              <div className="custom-radio">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="stripe"
                  value="stripe"
                  checked={form.paymentMethod === "stripe"}
                  onChange={(e) => {
                    onChange(e);
                    onPaymentMethodChange("stripe");
                  }}
                />
                <label htmlFor="stripe">
                  Credit / Debit Card
                  <span className="ms-2">
                    <i className="fab fa-cc-visa"></i>{" "}
                    <i className="fab fa-cc-mastercard"></i>{" "}
                    <i className="fab fa-cc-amex"></i>
                  </span>
                </label>
              </div>
            </div>
            {form.paymentMethod === "stripe" && (
              <div className="method-content mt-2">
                <p className="desc">
                  Secure payment powered by Stripe. Your card details are
                  encrypted.
                </p>
                <StripePaymentForm
                  clientSecret={stripeClientSecret}
                  onSuccess={onStripeSuccess}
                  onError={onStripeError}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {form.paymentMethod === "stripe" && !stripeClientSecret && (
        <button
          type="button"
          className="theme-btn text-center w-100 mt-3"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? "Initializing " : "Continue to Payment"}
        </button>
      )}
      {form.paymentMethod === "cod" && (
        <>
          <button
            type="button"
            className="theme-btn text-center w-100 mt-3"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          {errors.submit && (
            <div className="alert alert-danger mt-2">{errors.submit}</div>
          )}
        </>
      )}
    </div>
  );
}
