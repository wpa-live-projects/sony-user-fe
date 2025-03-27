import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "./HeroSection.css";

// Import images
import img9 from "../../assets/img9.jpg";
import img10 from "../../assets/img10.jpg";
import img11 from "../../assets/img11.jpg";
import img12 from "../../assets/img12.jpg";
import img13 from "../../assets/img13.jpg";
import img14 from "../../assets/img14.jpg";
import img15 from "../../assets/img15.jpg";
import img16 from "../../assets/img16.jpg";
import img17 from "../../assets/img17.jpg";

const images = [img9, img10, img11, img12, img13, img14, img15, img16, img17];

const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Left Side - Image Sliding */}
      <div className="hero-slider">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000, // Stay on the left for a moment
            disableOnInteraction: false,
            reverseDirection: true, // Reverse sliding direction
          }}
          speed={1200} // Smooth transition speed
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="slide">
              <img src={img} alt={`Slide ${index + 1}`} className="slide-img" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right Side - Fixed Text */}
      <div className="hero-text">
        <h1>Elevate Your Style with Sony Readymades</h1>
        <p>
          Discover a premium collection of gents' fashion, designed for comfort
          and elegance. Shop the latest trends in men's clothing, from casual
          wear to formal attire.
        </p>
        <button className="hero-btn">Shop Now</button>
      </div>
    </section>
  );
};

export default HeroSection;
