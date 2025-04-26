import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home";
import AboutUs from "./Components/AboutUs/AboutUs";
import ShirtCollections from "./Components/Collections/Collections"; // Import the ShirtCollections component
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Cart from "./Components/Cart/Cart";
import MyOrders from "./Components/Myorders/Myorders";

const App = () => {
  const location = useLocation(); // Get the current route path

  // Add /shop/more to the list of routes where the footer should be hidden
  const hideFooterRoutes = ["/cart", "/my-orders", "/login", "/signup", "/shop/more"];
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
        <Route path="/shop" element={<ShirtCollections />} />
        <Route path="/shop/more" element={<ShirtCollections />} /> {/* This route will now hide the footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-orders" element={<MyOrders />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Hide Footer on /cart, /my-orders, /login, /signup, and /shop/more */}
      {!isFooterHidden && <Footer />}
    </div>
  );
};

export default App;
