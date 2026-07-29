import React from 'react'

const ShopByCategory = () => {
  return (
    <section className="shop-category-section fix section-padding">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title">Browse Our Collection</span>
          <h2 className="wow fadeInUp" data-wow-delay=".3s">Shop by Category</h2>
          <p className="mt-3 wow fadeInUp" data-wow-delay=".5s">
            This title combines a strong call to action with the essence of
            <br />
            formal elegance, making it clear to visitors
          </p>
        </div>
        <div className="categorie-wrapper wow fadeInUp" data-wow-delay=".3s">
          <div className="swiper shop-category-slider-4">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="categorie-right-image style-2">
                  <img
                    className="font-image"
                    src="assets/img/home-4/category-right1.jpg"
                    alt=""
                  />
                  <img
                    className="back-image"
                    src="assets/img/home-4/category-right4.jpg"
                    alt=""
                  />
                  <h3 className="title">
                    <a href="shop-details.html">
                      Bracelets <span>(08)</span>
                    </a>
                  </h3>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="categorie-right-image style-2">
                  <img
                    className="font-image"
                    src="assets/img/home-4/category-right2.jpg"
                    alt=""
                  />
                  <img
                    className="back-image"
                    src="assets/img/home-4/category-right3.jpg"
                    alt=""
                  />
                  <h3 className="title">
                    <a href="shop-details.html"> Earring <span>(08)</span> </a>
                  </h3>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="categorie-right-image style-2">
                  <img
                    className="font-image"
                    src="assets/img/home-4/category-right3.jpg"
                    alt=""
                  />
                  <img
                    className="back-image"
                    src="assets/img/home-4/category-right2.jpg"
                    alt=""
                  />
                  <h3 className="title">
                    <a href="shop-details.html">
                      Necklaces <span>(08)</span>
                    </a>
                  </h3>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="categorie-right-image style-2">
                  <img
                    className="font-image"
                    src="assets/img/home-4/category-right4.jpg"
                    alt=""
                  />
                  <img
                    className="back-image"
                    src="assets/img/home-4/category-right1.jpg"
                    alt=""
                  />
                  <h3 className="title">
                    <a href="shop-details.html"> Rings <span>(08)</span> </a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="array-button">
            <button className="array-prev">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="array-next">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShopByCategory
