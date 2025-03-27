import React from "react";
import BannerImg from "../../assets/logo4.png"; // ✅ Correct import
import "./offer.css";

const Banner = () => {
  return (
    <div className="relative min-h-[550px] flex flex-col justify-center items-center py-12 sm:py-0 bg-gray-100">
      {/* Offers Title - Centered at the Top */}
      <h2 
        className="absolute top-6 text-[#EAAE40] text-3xl font-semibold text-center" 
        style={{ fontFamily: "Courgette, cursive" }}
      >
        Offers
      </h2>

      <div className="container mt-12 sm:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Image Section */}
          <div data-aos="zoom-in">
            <img
              src={BannerImg} // ✅ Use imported image
              alt="Banner"
              className="max-w-[500px] h-[350px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover rounded-md"
            />
          </div>

          {/* Text Details Section */}
          <div className="flex flex-col justify-center gap-6 sm:pt-0">
            <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold text-[#DA4744]">
              Winter Sale up to <span className="text-[#EAAE40]">50% Off</span>
            </h1>
            <p data-aos="fade-up" className="text-sm text-gray-600 tracking-wide leading-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
              reiciendis inventore iste ratione ex alias quis magni at optio.
            </p>

            {/* Explore Now Button */}
            <div data-aos="fade-up">
              <button className="px-6 py-3 bg-[#EAAE40] text-white font-medium rounded-md shadow-md hover:bg-[#DA4744] transition duration-300">
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
console.log('Banner component rendered');