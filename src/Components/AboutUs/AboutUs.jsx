import React, { useState, useEffect } from "react";
import "./AboutUs.css"; 
import img29 from "../../assets/img29.jpg";
import img30 from "../../assets/img30.jpg";
import img31 from "../../assets/image31.jpg";
import img32 from "../../assets/img32.jpg";
import img34 from "../../assets/img34.jpg";
import img35 from "../../assets/img35.jpg";
import img36 from "../../assets/img36.jpg";
import img37 from "../../assets/img37.jpg";
import img38 from "../../assets/img38.jpg";
import sonyVideo from "../../assets/sony_video.mp4";

const images = [img29, img30, img31, img32, img34, img35, img36, img37, img38];

const AboutUs = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="about-us-container">
            {/* Title */}
            <h2 className="about-us-title">
                <span className="black-text">About</span> 
                <span className="gold-text"> Us</span>
            </h2>

            <div className="content-wrapper">
                <div className="image-slider">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Slide ${index + 1}`}
                            className={`slider-image ${index === currentSlide ? "active" : ""}`}
                        />
                    ))}
                </div>

                <div className="video-container">
                    <video className="video-content" autoPlay loop muted controls>
                        <source src={sonyVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            <div className="slider-dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentSlide ? "active" : ""}`}
                        onClick={() => setCurrentSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default AboutUs;
