import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";
import logo from "../../assets/logo2.png";

const Footer = ({ showBrandingOnly }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Side - Location (Only shown if showBrandingOnly is false) */}
        {!showBrandingOnly && (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.61660002255!2d78.50085397382902!3d13.559095386812992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb267605f70e079%3A0x5c2e735026bebc55!2sSONY%20READYMADES!5e0!3m2!1sen!2sin!4v1742793050822!5m2!1sen!2sin"
            width="400"
            height="250"
            loading="lazy"
          ></iframe>
        )}

        {/* Right Side - Main Content (Only shown if showBrandingOnly is false) */}
        {!showBrandingOnly && (
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="golden-text">About Us</h3>
              <p>9701303248</p>
              <p>sony@gmail.com</p>
            </div>

            <div className="footer-section">
              <h3 className="golden-text">Opening Hours</h3>
              <p>Everyday: 9AM to 10PM</p>
              <p>Sunday: 12AM to 9PM</p>

              <div className="social-icons">
                <a href="https://www.linkedin.com/company/saredufy-web-plus-academy-private-limited/"><FaLinkedinIn /></a>
                <a href="https://www.instagram.com/saredufy_wpa?igsh=ZGVtaXFrcjNjcGN0"><FaInstagram /></a>
                <a href="https://www.facebook.com/profile.php?id=61561544652969&mibextid=ZbWKwL"><FaFacebookF /></a>
              </div>
            </div>

            <div className="footer-section">
              <h3 className="golden-text">Details</h3>
              <ul>
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#collections">Shop</a></li>
                <li><a href="#offers">Offers</a></li>
                <li><a href="#best-sellers">Best Sellers</a></li>
                <li><a href="#reviews">Reviews</a></li>
                <li><a href="#footer">Contact</a></li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding - Logo, Copyright, and Company Name in One Row */}
      <div className="footer-bottom">
        <div className="footer-branding">
          <img src={logo} alt="Logo" className="footer-logo" />
          <div className="footer-text">
            <p>© 2025 Developed by Saredufy WebPlusAcademy</p>
            <p className="company-name">SAREDUFY WebPlusAcademy Pvt Ltd</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
