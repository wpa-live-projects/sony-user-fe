import React from "react";
import "./BestSellers.css";
import img20 from "../../assets/img20.png";
import img21 from "../../assets/img21.png";
import img22 from "../../assets/img22.png";

const products = [
  { id: 1, image: img20, title: "T-Shirt", price: 500, color: "#F8C8C8" }, // Pink
  { id: 2, image: img21, title: "T-Shirt", price: 500, color: "#AFCFD5" }, // Light Blue
  { id: 3, image: img22, title: "T-Shirt", price: 500, color: "#4C1C24" }, // Maroon
];

const BestSellers = () => {
  return (
    <div className="best-sellers-container">
      <h2 className="sellers-title">
        <span style={{ color: "#EAAE40", fontFamily: "Courgette, cursive" }}>Best</span> 
        <span style={{ color: "black", fontFamily: "Courgette, cursive" }}>Sellers</span>
      </h2>

      <div className="best-sellers">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">
              Perfect for gym sessions or outdoor adventures. Performance meets style in one sleek package.
            </p>
            <p className="product-price"> <strong>₹{product.price}.00</strong> </p>
            <div className="rating">⭐⭐⭐⭐⭐</div>
            <button className="buy-now-btn" style={{ backgroundColor: product.color }}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
