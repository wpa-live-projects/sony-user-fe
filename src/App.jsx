import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home";
import AboutUs from "./Components/AboutUs/AboutUs";
import Shop from "./Components/Collections/Collections";
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Cart from "./Components/Cart/Cart";
import MyOrders from "./Components/Myorders/Myorders";

const App = () => {
  const location = useLocation(); // Get the current route path

  // Check if current path is Cart or My Orders page
  const hideFooterRoutes = ["/cart", "/my-orders"]; // Hide footer on these pages
  const isFooterHidden = hideFooterRoutes.includes(location.pathname);

  // ✅ Check session expiry on page load or refresh
  useEffect(() => {
    const checkSessionExpiry = () => {
      const expiryTime = localStorage.getItem("expiryTime");
      if (expiryTime && new Date().getTime() > expiryTime) {
        // Clear localStorage if session expired
        localStorage.clear();
        window.location.href = "/login"; // Redirect to login
      }
    };

    checkSessionExpiry(); // Run on component load
  }, [location.pathname]); // Run on route change

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>

      {/* Hide Footer on /cart and /my-orders */}
      {!isFooterHidden && <Footer />}
    </div>
  );
};

export default App;
