import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setShowProfileDropdown(false);
      navigate("/");
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId) {
        setError("Session expired. Please login again.");
        handleLogout();
        return;
      }

      const response = await axios.put(
        "http://localhost:5000/api/change-password",
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword
        },
        {
          headers: {
            "Content-Type": "application/json",
            "user-id": userId,
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.msg === "Password updated successfully") {
        setShowPasswordPopup(false);
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        alert("Password changed successfully!");
      } else {
        setError(response.data.msg || "Failed to change password");
      }
    } catch (err) {
      console.error("Password change error:", err);

      if (err.response?.status === 401) {
        if (err.response?.data?.msg === "No userId, authorization denied") {
          setError("Session expired. Please login again.");
          handleLogout();
        }
      } else if (err.response?.status === 404) {
        setError("Endpoint not found. Please check the URL.");
      } else {
        setError(err.message || "Failed to change password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <a onClick={() => navigate("/")} className="navbar-logo">
          <img src="/logo.jpg" alt="Logo" className="logo-img" />
        </a>

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>

        <ul className={`navbar-menu ${isOpen ? "open" : ""}`}>
          <li>
            <a href="#hero" onClick={() => setIsOpen(false)}>Home</a>
          </li>
          <li>
          <a href="#about" onClick={() => setIsOpen(false)}>About Us</a>
          </li>
          <li>
          <a href="#collections" onClick={() => setIsOpen(false)}>Shop</a>
          </li>
          <li>
          <a href="#offers" onClick={() => setIsOpen(false)}>Offers</a>
          </li>
          <li>
          <a href="#reviews" onClick={() => setIsOpen(false)}>Reviews</a>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <button
                  onClick={() => {
                    navigate("/cart");
                    setIsOpen(false);
                  }}
                  className="cart-icon"
                >
                  🛒
                </button>
              </li>
              <li className="profile-menu-container">
                <button className="profile-icon" onClick={toggleProfileDropdown}>
                  👤
                </button>
                {showProfileDropdown && (
                  <ul className="profile-dropdown">
                    <li
                      onClick={() => {
                        navigate("/my-orders");
                        setShowProfileDropdown(false);
                        setIsOpen(false);
                      }}
                    >
                      My Orders
                    </li>
                    <li
                      onClick={() => {
                        setShowPasswordPopup(true);
                        setShowProfileDropdown(false);
                        setIsOpen(false);
                      }}
                    >
                      Change Password
                    </li>
                    <li onClick={handleLogout}>Logout</li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <li>
              <button className="navbar-login" onClick={handleLoginClick}>
                Login
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Password Change Popup */}
      {showPasswordPopup && (
        <div className="password-popup-overlay">
          <div className="password-popup-container">
            <button
              className="popup-close-btn"
              onClick={() => {
                setShowPasswordPopup(false);
                setError(null);
              }}
              disabled={isLoading}
            >
              ✖
            </button>
            <h2 className="popup-title">Change Password</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handlePasswordSubmit}>
              <div className="input-group">
                <label htmlFor="oldPassword">Current Password</label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="input-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  disabled={isLoading}
                  minLength="6"
                />
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  disabled={isLoading}
                  minLength="6"
                />
              </div>
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? <span className="loading-spinner"></span> : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
