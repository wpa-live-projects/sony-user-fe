import React from "react";
import "./Reviews.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import img23 from "../../assets/img23.jpg";
import img24 from "../../assets/review4.jpg";
import img25 from "../../assets/img25.jpg";
import img26 from "../../assets/review6.jpg";
import img27 from "../../assets/img27.jpg";
import img28 from "../../assets/review7.jpg";
import img29 from "../../assets/review3.webp";
import img30 from "../../assets/reviwe1.jpg";
import img31 from "../../assets/review9.jpg";
import img32 from "../../assets/review8.jpg";

const reviews = [
  { id: 1, name: "Varun", image: img23, review: "Sony Ready-made Dress Shop offers stylish, high-quality apparel with a great balance of affordability." },
  { id: 2, name: "Varshini", image: img24, review: "An impressive selection of well-tailored outfits for men, women, and kids." },
  { id: 3, name: "Kumar", image: img25, review: "High-quality clothing that makes everyday dressing effortless and stylish." },
  { id: 4, name: "Mahesh", image: img26, review: "Great collection with an amazing variety of styles." },
  { id: 5, name: "Sneha", image: img27, review: "Fantastic range of trendy clothing with great customer service." },
  { id: 6, name: "Ramesh", image: img28, review: "Loved the premium fabric quality and perfect fitting!" },
  { id: 7, name: "Priya", image: img29, review: "Elegant and affordable fashion for the entire family!" },
  { id: 8, name: "Arjun", image: img30, review: "Loved the trendy designs and the cozy feel of the clothes." },
  { id: 9, name: "Deepa", image: img31, review: "A delightful shopping experience with top-notch collections." },
  { id: 10, name: "Rahul", image: img32, review: "Stylish, durable, and fits like a dream!" },
];

const Reviews = () => {
  return (
    <section className="reviews-section">
      <h2 className="reviews-title">Reviews</h2>
      {/* Limit visible area to exactly 5 cards */}
      <div className="reviews-wrapper" style={{ width: "1330px", margin: "0 auto",   overflowX: "auto" }}>
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
