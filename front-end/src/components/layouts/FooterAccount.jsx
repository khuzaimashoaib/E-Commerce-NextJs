"use client";

import Link from "next/link";
import { useAuthContext } from "@/lib/context/AuthContext";

export default function FooterAccount() {
  const { user, authLoaded } = useAuthContext();

  return (
    <div className="single-widget-items">
      <div className="widget-head">
        <h3>My Account</h3>
      </div>
      <ul className="gt-list-area">
        {/* My Orders — login redirect if not logged in */}
        <li>
          <Link href={user ? "/orders" : "/login"}>My Orders</Link>
        </li>

        <li>
          <Link href="/cart">My Cart</Link>
        </li>

        <li>
          <Link href="#">Wishlist</Link>
        </li>

        <li>
          <Link href="#">Shipping</Link>
        </li>

        <li>
          <Link href="#">Track Order</Link>
        </li>

        {/* Show login/logout based on auth */}
        {/* {!authLoaded ? null : user ? null : ( // already logged in — no need to show login link
          <li>
            <Link href="/login">Login / Register</Link>
          </li>
        )} */}
      </ul>
    </div>
  );
}
