"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/context/AuthContext";
import { loginUser } from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();
  const { updateUser } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await loginUser({ email, password });
      console.log("Login success:", user);
      updateUser(user); // ← directly update context
      if (user.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/shop");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lost-password-section section-padding fix">
      <div className="container">
        <div className="login-form-items">
          <h2>Login</h2>
          <p className="description">
            Your email address will not be published. Required fields marked *
          </p>

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger mb-3">
              <i className="fa-solid fa-circle-exclamation me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              <label>
                Email<span>*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label>
                Password<span>*</span>
              </label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <i
                  className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="remember-forget-row">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkmark"></span>
                Remember Me
              </label>
              <Link href="/forgot-password" className="forget-pass">
                Forget Password?
              </Link>
            </div>

            {/* Submit */}
            <button type="submit" className="theme-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login Now"}
            </button>
          </form>

          <p className="footer-text">
            Don't have an account?
            <Link href="/register">Create a free account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
