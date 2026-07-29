import React from 'react'

const CategoryFilter = ({ categories, selectedCategories, onChange }) => {
  return (
     <div className="shop-sidebar-widget">
        <div className="widget-title"><h2>Categories</h2></div>
        <div className="product-type-box">
          <ul>
            {categories.map((category) => (
              <li key={category._id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.slug)}
                    onChange={() => onChange(category.slug)}
                  />
                  <span className="checkmark"></span>
                  <span className="text">{category.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
  )
}

export default CategoryFilter
