import React from 'react'

const LatestCollSec = () => {
  return (
    <section className="latest-collection-section fix section-padding">
            <div className="container">
                <div className="shop-collection-wrapper">
                    <div className="row g-4">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                            <div className="shop-collection-image">
                                <video className="collection-video" muted playsInline preload="metadata" loop>
                                    <source src="https://ex-coders.com/vdo/shoes.mp4" type="video/mp4"/>
                                </video>

                            </div>

                        </div>
                        <div className="col-lg-6">
                            <div className="shop-collenction-content">
                                <div className="section-title mb-0">
                                    <span className="sub-title">PREMIUM FOOTWEAR</span>
                                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                                        Latest Collection
                                    </h2>
                                    <p className="mt-2 wow fadeInUp" data-wow-delay=".5s">
                                        This title combines a strong call to action with the essence of <br className="d-none d-xl-block"/> formal elegance, making it clear to visitors
                                    </p>
                                </div>
                                <div className="swiper shop-slider-6">
                                    <div className="swiper-wrapper">
                                      <div className="swiper-slide">
                                        <div className="shop-card-items style-2">
                                            <div className="thumb">
                                                <img className="font-image" src="assets/img/home-2/shop-2.jpg" alt=""/>
                                                <img className="back-image" src="assets/img/home-2/shop-5.jpg" alt=""/>
                                                <span className="discount-text bg-white">Hot</span>
                                                <a href="shop-cart.html" className="theme-btn"><i className="fa-regular fa-basket-shopping"></i> Add to Cart</a>
                                                <ul className="gt-shop-icon d-grid justify-content-center align-items-center">
                                            <li>
                                                <a href="wishlist.html"><i className="far fa-heart"></i></a>
                                            </li>
                                            <li>
                                                <a href="compare.html">
                                                    <i className="fa-solid fa-code-compare"></i>
                                                </a>
                                            </li>
                                            <li>
                                            <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                                <i className="far fa-eye"></i>
                                            </button>
                                            </li>
                                        </ul>
                                            </div>
                                            <div className="shop-content">
                                                <div className="content">
                                                    <span>Nike</span>
                                                    <h3>
                                                        <a href="shop-details.html">Sneakers with suede</a>
                                                    </h3>
                                                    <h4>$34.00</h4>
                                                </div>
                                            <div className="color-picker">
                                                    <button className="color-box box-black active"></button>
                                                    <button className="color-box box-brown"></button>
                                                    <button className="color-box box-blue"></button>
                                                    
                                                    <span className="more-count">+3</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="shop-card-items style-2">
                                            <div className="thumb">
                                                <img className="font-image" src="assets/img/home-2/shop-6.jpg" alt=""/>
                                                <img className="back-image" src="assets/img/home-2/shop-5.jpg" alt=""/>
                                                <span className="discount-text bg-white">Hot</span>
                                                <a href="shop-cart.html" className="theme-btn"><i className="fa-regular fa-basket-shopping"></i> Add to Cart</a>
                                                <ul className="gt-shop-icon d-grid justify-content-center align-items-center">
                                            <li>
                                                <a href="wishlist.html"><i className="far fa-heart"></i></a>
                                            </li>
                                            <li>
                                                <a href="compare.html">
                                                    <i className="fa-solid fa-code-compare"></i>
                                                </a>
                                            </li>
                                            <li>
                                            <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                                <i className="far fa-eye"></i>
                                            </button>
                                            </li>
                                        </ul>
                                            </div>
                                            <div className="shop-content">
                                                <div className="content">
                                                    <span>Addidas</span>
                                                    <h3>
                                                        <a href="shop-details.html">Suede ankle leader boot</a>
                                                    </h3>
                                                    <h4>$99.00</h4>
                                                </div>
                                            <div className="color-picker">
                                                    <button className="color-box box-black active"></button>
                                                    <button className="color-box box-brown"></button>
                                                    <button className="color-box box-blue"></button>
                                                    
                                                    <span className="more-count">+3</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="button-items-2">
                                    <div className="array-button style-2 wow fadeInUp" data-wow-delay=".3s">
                                        <button className="array-prev"><i className="fa-solid fa-chevron-left"></i></button>
                                        <button className="array-next"><i className="fa-solid fa-chevron-right"></i></button>
                                    </div>
                                    <div className="pagi-item">
                                        <div className="dot-number">
                                            <span className="dot-num"><span>02</span></span>
                                            <span className="dot-num"><span>06</span></span>
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

export default LatestCollSec
