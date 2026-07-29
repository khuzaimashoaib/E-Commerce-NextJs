import React from 'react'

const HeaderTop = () => {
  return (
   <div className="header-top-section style-4">
      <div className="container-fluid">
        <div className="header-top-wrapper style-4">
          <ul className="contact-list">
            <li>
              <i className="fa-regular fa-location-dot"></i>
              Find a Store
            </li>
            <li>
              <i className="fa-regular fa-phone"></i>
              <a href="tel:+40276328246">+402 763 282 46</a>
            </li>
          </ul>
          <div className="flag-wrapper">
            <div className="flag-wrap">
              <div className="nice-select" tabIndex="0">
                <span className="current">
                  <i className="fa-sharp fa-regular fa-globe"></i> English
                </span>
                <ul className="list">
                  <li data-value="1" className="option selected focus">English</li>
                  <li data-value="1" className="option">Bangla</li>
                  <li data-value="1" className="option">Hindi</li>
                </ul>
              </div>
            </div>
            <div className="flag-wrap">
              <div className="nice-select style-2" tabIndex="0">
                <span className="current"> $Usd </span>
                <ul className="list">
                  <li data-value="1" className="option selected focus">$Usd</li>
                  <li data-value="1" className="option">$Eur</li>
                  <li data-value="1" className="option">$Jpy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderTop
