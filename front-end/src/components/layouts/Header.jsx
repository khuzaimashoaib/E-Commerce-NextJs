"use client";

import { useCartContext } from "@/lib/context/CartContext";
import { useAuthContext } from "@/lib/context/AuthContext";
import { logoutUser } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { itemCount } = useCartContext();
  const { user, authLoaded, clearUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      clearUser(); // ← directly update context
      // router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header id="header-sticky" className="header-1 header-4 mt-0">
        <div className="container-fluid">
          <div className="mega-menu-wrapper">
            <div className="header-main">
              <div className="header-left">
                {/* Logo */}
                <div className="logo">
                  <Link href="/" className="header-logo">
                    <Image
                      src="/assets/img/logo/logo-4.svg"
                      alt="logo"
                      width={150}
                      height={50}
                    />
                  </Link>
                  <Link href="/" className="header-logo-2">
                    <Image
                      src="/assets/img/logo/logo-4.svg"
                      alt="logo"
                      width={150}
                      height={50}
                    />
                  </Link>
                </div>

                {/* Nav */}
                <div className="mean__menu-wrapper">
                  <div className="main-menu">
                    <nav id="mobile-menu">
                      <ul>
                        <li>
                          <Link href="/about">About Us</Link>
                        </li>
                        <li>
                          <Link href="/shop">Shop</Link>
                        </li>
                        <li>
                          <Link href="/contact">Contact Us</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>

              <div className="header-right d-flex justify-content-end align-items-center">
                <ul className="header-icon">
                  {!authLoaded ? (
                    <li>
                      <i className="fa-regular fa-user"></i>
                    </li>
                  ) : user ? (
                    <>
                      <li>
                        <span className="header-username">
                          Hi, {user.name.split(" ")[0]}
                        </span>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          disabled={loading}
                          className="header-logout-btn"
                        >
                          {loading ? "..." : <i className="fa fa-sign-out"></i>}
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link href="/login">
                        <i className="fa-regular fa-user"></i>
                      </Link>
                    </li>
                  )}

                  {/* Cart */}
                  <li>
                    <Link href="/cart">
                      <i className="fa fa-shopping-cart"></i>
                      {itemCount > 0 && (
                        <span className="number">{itemCount}</span>
                      )}
                    </Link>
                  </li>
                </ul>

                {/* Hamburger */}
                <div className="header__hamburger my-auto">
                  <div className="sidebar__toggle">
                    <i className="fa-solid fa-align-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
