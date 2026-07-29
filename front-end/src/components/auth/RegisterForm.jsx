"use client";
import { registerUser } from "@/lib/api";
import { useAuthContext } from "@/lib/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterForm = () => {
  const router = useRouter();
  const { updateUser } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const name = `${form.firstName} ${form.lastName}`.trim();
      const user = await registerUser({
        name,
        email: form.email,
        password: form.password,
      });
      console.log("Register success:", user);
      updateUser(user); // ← directly update context
      router.push("/shop");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-section fix section-padding">
      <div className="container">
        <div className="registration-form-items">
          <h2>Registration</h2>
          <p className="description">
            Your email address will not be published. Required fields marked *
          </p>

          {error && (
            <div className="alert alert-danger mb-3">
              <i className="fa-solid fa-circle-exclamation me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                First Name<span>*</span>
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
            </div>

            <div className="form-group">
              <label>
                Last Name<span>*</span>
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={form.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
            </div>

            <div className="form-group">
              <label>
                Email<span>*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>
                Password<span>*</span>
              </label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  minLength={6}
                />
                <i
                  className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            </div>

            <button type="submit" className="theme-btn" disabled={loading}>
              {loading ? "Registering..." : "Register Now"}
            </button>
          </form>

          <p className="footer-text">
            Already have an account? <Link href="/login">Login Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
