import React from "react";
import "./Reviews.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import img23 from "../../assets/img23.jpg";
import img24 from "../../assets/img24.jpg";
import img25 from "../../assets/img25.jpg";
import img26 from "../../assets/img26.png";
import img27 from "../../assets/img27.jpg";
import img28 from "../../assets/img28.jpg";

const reviews = [
  { id: 1, name: "Varun", image: img23, review: "Sony Ready-made Dress Shop offers stylish, high-quality apparel with a great balance of affordability." },
  { id: 2, name: "Varshini", image: img24, review: "An impressive selection of well-tailored outfits for men, women, and kids." },
  { id: 3, name: "Kumar", image: img25, review: "High-quality clothing that makes everyday dressing effortless and stylish." },
  { id: 4, name: "New User", image: img26, review: "Great collection with an amazing variety of styles." },
  { id: 5, name: "Sneha", image: img27, review: "Fantastic range of trendy clothing with great customer service." },
  { id: 6, name: "Ramesh", image: img28, review: "Loved the premium fabric quality and perfect fitting!" },
];

const Reviews = () => {
  return (
    <section className="reviews-section">
      <h2 className="reviews-title">Reviews</h2>
      <div className="reviews-wrapper">
        <div className="reviews-container">
          {reviews.map((person) => (
            <div className="review-card" key={person.id}>
              <img src={person.image} alt={person.name} className="review-img" />
              <h3 className="review-name">{person.name}</h3>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="star-icon" />
                ))}
              </div>
              <p className="review-text">{person.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
