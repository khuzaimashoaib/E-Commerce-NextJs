import React from 'react'

const Hero = () => {
  return (
   <section className="hero-section-4">
      <div className="swiper banner-active">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div
              className="hero-4 bg-cover"
             style={{
  backgroundImage: "url('/assets/img/home-4/hero-bg.jpg')",
}}
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="hero-content">
                      <span> NEW ARRIVALS </span>
                      <h1>
                        Stunning
                        <b> Collection </b>
                      </h1>
                      <p>Discover Exquisite Pieces for Every Occasion.</p>
                    </div>
                    <div className="hero-button">
                      <a href="shop.html" className="theme-btn">Explore More</a>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="hero-image">
                      <img src="assets/img/home-4/hero-1.jpg" alt="" />
                      <div className="icon-box ">
                        <div className="icon">
                          <img src="assets/img/home-4/icon.png" alt="" />
                        </div>
                        <div className="discount">
                          <img src="assets/img/home-4/dis.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    
    </section>
  )
}

export default Hero
