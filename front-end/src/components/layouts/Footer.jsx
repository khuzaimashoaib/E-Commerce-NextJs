import { getCategories } from "@/lib/api";
import Link from "next/link";
import React from "react";

export default async function Footer() {
  const categories = await getCategories();
  return (
    <footer className="footer-section footer-section-3 fix">
      <div className="footer-newsletter-items-4">
        <div className="container">
          <div className="footer-form-4">
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              Get Daily Update. Sign Up & Get <br />
              <span>30% off</span> on First Order
            </h2>
            <form action="#" className="wow fadeInUp" data-wow-delay=".5s">
              <div className="form-clt">
                <input type="text" placeholder="Enter Email..." />
              </div>
              <button className="theme-btn theme-btn4" type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="footer-widget-wrapper footer-widget-wrapper-3 footer-widget-wrapper-4">
          <div className="row justify-content-between">
            <div className="col-xl-3 col-lg-4 col-md-4 wow fadeInUp">
              <div className="single-widget-items">
                <div className="widget-head">
                  <a href="index.html">
                    <img src="assets/img/logo/white-logo4.svg" alt="" />
                  </a>
                </div>
                <div className="footer-content">
                  <p>
                    Sign up for the newsletter and discover the latest arrivals
                    and promotions from ou
                  </p>
                  <div className="social-icon d-flex align-items-center">
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-vimeo-v"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-pinterest-p"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-xl-2 col-lg-4 col-md-4 col-sm-6 ps-xl-5 col-6 wow fadeInUp"
              data-wow-delay=".2s"
            >
              <div className="single-widget-items">
                <div className="widget-head">
                  <h3>Quick links</h3>
                </div>
                <ul className="gt-list-area">
                  <li>
                    <a href="about.html"> About Us </a>
                  </li>
                  <li>
                    <a href="shop.html"> Shop Now </a>
                  </li>

                  <li>
                    <a href="contact.html"> Account </a>
                  </li>
                  <li>
                    <a href="faq.html"> FAQ </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6 wow fadeInUp"
              data-wow-delay=".4s"
            >
              <div className="single-widget-items">
                <div className="widget-head">
                  <h3>Categories</h3>
                </div>
                <ul className="gt-list-area">
                  {categories.map((category) => (
                    <li key={category._id}>
                      <Link href={`/shop?category=${category.slug}`}>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className="col-xl-2 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
              data-wow-delay=".6s"
            >
              <div className="single-widget-items">
                <div className="widget-head">
                  <h3>My Account</h3>
                </div>
                <ul className="gt-list-area">
                  <li>
                    <a href="contact.html"> Returns </a>
                  </li>
                  <li>
                    <a href="order-confirm.html"> Order History </a>
                  </li>
                  <li>
                    <a href="wishlist.html"> Wishlist </a>
                  </li>
                  <li>
                    <a href="shop-cart.html"> Shipping </a>
                  </li>
                  <li>
                    <a href="track-order.html"> Track Order </a>
                  </li>
                  <li>
                    <a href="shop-cart.html"> My Cart </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom style-3">
        <div className="container">
          <div
            className="footer-bottom-wrapper wow fadeInUp"
            data-wow-delay=".3s"
          >
            <p>
              Copyright 2026 <a href="index.html">POSH</a>. All Rights Reserved
            </p>
            <img src="/assets/front-end-images/bank.png" alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
}
