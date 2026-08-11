import Link from "next/link";
import { getCategories } from "@/lib/api";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default async function ShopByCategory() {
  const categories = await getCategories();

  return (
    <section className="shop-category-section fix section-padding">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title">Browse Our Collection</span>
          <h2 className="wow fadeInUp" data-wow-delay=".3s">
            Shop by Category
          </h2>
          <p className="mt-3 wow fadeInUp" data-wow-delay=".5s">
            Find everything you need for the beautiful game —
            <br />
            from boots to jerseys, gloves to footballs.
          </p>
        </div>

        <div className="categorie-wrapper wow fadeInUp" data-wow-delay=".3s">
          <div className="swiper shop-category-slider-4">
            <div className="swiper-wrapper">
              {categories.map((category) => (
                <div key={category._id} className="swiper-slide">
                  <div className="categorie-right-image style-2">
                    {/* Front image */}
                    <img
                      className="font-image"
                      src={getImageUrl(category.image)}
                      alt={category.name}
                    />

                    {/* Back image — use same image if no second image */}
                    <img
                      className="back-image"
                      src={getImageUrl(category.image)}
                      alt={category.name}
                    />

                    <h3 className="title">
                      <Link href={`/shop?category=${category.slug}`}>
                        {category.name}
                      </Link>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Navigation */}
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
  );
}
