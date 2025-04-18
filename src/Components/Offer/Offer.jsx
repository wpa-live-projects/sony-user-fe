// Offers.jsx
import React from "react";
import BannerImg from "../../assets/offers1.jpg";
import "./offer.css";

const Offers = () => {
  return (
    <div className="offers-section">
      <h2 className="offers-title">Offers</h2>

      <div className="offers-content">
        {/* Image Section */}
        <div className="offers-image-container" data-aos="zoom-in">
          <img
            src={BannerImg}
            alt="Offer"
            className="offers-image"
          />
        </div>

        {/* Text Section */}
        <div className="offers-text-content">
          <h1 className="offers-heading" data-aos="fade-up">
            Winter Sale up to <span>50% Off</span>
          </h1>
          <p className="offers-description" data-aos="fade-up">
  Take advantage of our Winter Sale with up to <strong>50% off</strong> on select products. Shop now for the best deals on stylish and cozy winter essentials!
</p>

          <button className="offers-button" data-aos="fade-up">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offers;
