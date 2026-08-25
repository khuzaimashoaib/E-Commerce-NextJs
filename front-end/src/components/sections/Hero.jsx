import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="hero-section-4">
      <div
        className="hero-4 bg-cover"
        style={{
          backgroundColor: "#96fc80",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <span>NEW ARRIVALS</span>

                <h1>
                  Stunning <b>Collection</b>
                </h1>

                <p>Discover Exquisite Pieces for Every Occasion.</p>
              </div>

              <div className="hero-button">
                <Link href="/shop" className="theme-btn">
                  Explore More
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-image">
                <img
                  src="/assets/front-end-images/home-img.webp"
                  alt="Football collection"
                />

                <div className="icon-box">
                  <div className="icon">
                    <img
                      src="/assets/front-end-images/football-icon.png"
                      alt="Football"
                    />
                  </div>

                  <div className="discount">
                    <img src="/assets/img/home-4/dis.png" alt="Discount" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
