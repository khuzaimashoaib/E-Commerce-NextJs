"use client";

import { logoutUser } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/lib/context/CartContext";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useWishlistContext } from "@/lib/context/WishlistContext";

export default function Header() {
  const { itemCount } = useCartContext();
  const { wishlistCount } = useWishlistContext();
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
                      loading="eager"
                      src="/assets/front-end-images/logo.png"
                      alt="logo"
                      width={150}
                      height={80}
                    />
                  </Link>
                  <Link href="/" className="header-logo-2">
                    <Image
                      loading="eager"
                      src="/assets/front-end-images/logo.png"
                      alt="logo"
                      width={150}
                      height={80}
                    />
                  </Link>
                </div>

                {/* Nav */}
                <div className="mean__menu-wrapper">
                  <div className="main-menu">
                    <nav id="mobile-menu">
                      <ul>
                        {/* <li>
                          <Link href="/about">About Us</Link>
                        </li> */}
                        <li>
                          <Link href="/shop">Shop</Link>
                        </li>
                        {/* <li>
                          <Link href="/contact">Contact Us</Link>
                        </li> */}
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
                      {user.role === "admin" && (
                        <li>
                          <Link
                            href="/dashboard"
                            style={{
                              fontSize: "13px",
                              fontWeight: "500",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <i className="fa-external-link fa-solid"></i>
                            Dashboard
                          </Link>
                        </li>
                      )}
                      {user.role === "customer" && (
                        <li>
                          <Link
                            href="/orders"
                            style={{ fontSize: "13px", fontWeight: "500" }}
                          >
                            <i className="fa-solid fa-bag-shopping"></i> My
                            Orders
                          </Link>
                        </li>
                      )}

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
                  <li>
                    <Link href="/wishlist">
                      <i className="fa-regular fa-heart"></i>
                      {wishlistCount > 0 && (
                        <span className="number">{wishlistCount}</span>
                      )}
                    </Link>
                  </li>

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
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
