import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState(null); // Initial state is null
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Show/hide modal for Buy Now
  const [selectedItem, setSelectedItem] = useState(null); // Store selected item for Buy Now
  const [selectedSize, setSelectedSize] = useState(""); // Store chosen size
  const [address, setAddress] = useState(""); // Store entered address
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // Fetch cart data from the server
  const fetchCart = async () => {
    try {
      if (!userId) {
        console.error("User ID not found. Please login.");
        return;
      }

      setIsLoading(true); // Start loading spinner
      const response = await axios.get(`http://localhost:5000/api/get/${userId}`);
      console.log("Cart data from API:", response.data);

      if (response.status === 200 && response.data) {
        setCart(response.data); // Set the cart data in state
        console.log("Cart data set successfully:", response.data);
      } else {
        console.error("Failed to fetch cart:", response.data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Failed to load cart data. Please try again later.");
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  // Remove item from cart
  const removeItem = async (itemId) => {
    try {
      const response = await axios.delete("http://localhost:5000/api/remove", {
        data: { userId, itemId }, // Send userId and itemId as the data
      });

      if (response.data.message === "Item removed from cart") {
        // alert("Item removed successfully!");
        fetchCart(); // Refresh cart after removal
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item. Please try again.");
    }
  };

  // Handle Buy Now click
  const handleBuyNow = (item) => {
    setSelectedItem(item);
    setSelectedSize(""); // Reset size for each item
    setAddress(""); // Reset address
    setShowModal(true); // Show modal
  };

  // Handle Order Submission
  const handleSubmitOrder = async () => {
    if (!selectedSize || !address) {
      alert("Please select a size and enter your address.");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders", // Backend API route
        {
          itemId: selectedItem.itemId._id,
          size: selectedSize,
          quantity: selectedItem.quantity, // Use item's quantity
          address,
        },
        {
          headers: {
            "user-id": userId, // ✅ Send userId in headers correctly
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Order placed successfully!");
        setShowModal(false); // Close modal after success

        // ✅ Remove the item from cart after order is placed
        await removeItem(selectedItem.itemId._id);
      }
    } catch (error) {
      console.error("Error placing order:", error.response?.data?.msg || error.message);
      alert(`Failed to place order: ${error.response?.data?.msg || error.message}`);
    }
  };

  // Load cart data when the component is mounted
  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  // Log cart data after state is set
  useEffect(() => {
    console.log("Fetched Cart:", cart); // Check if cart is updated after the fetch
  }, [cart]);

  // Render loading, error, or cart items based on the state
  if (isLoading) return <div className="loading">Loading Cart...</div>;
  if (error) return <div className="error-message">{error}</div>;

  // Return empty cart message if cart is null or empty
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <p>Your cart is empty!</p>
        <button onClick={() => window.location.href = "/"}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="cart-title">🛒 Your Shopping Cart</h2>
        <div className="cart-grid">
          {cart.items && cart.items.map((item, index) => (
            <div
              className={`cart-item ${index === 4 ? "full-width" : ""}`}
              key={item.itemId._id} // Ensure unique key using itemId._id
            >
              <img
                src={item.image || "/placeholder.jpg"} // Fallback image if missing
                alt={item.name}
                className="item-image"
              />
              <div className="item-info">
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Cost: ₹{item.cost}</p>
                <p>Total: ₹{item.totalCost}</p>
              </div>
              <div className="item-actions">
                <button className="buy-btn" onClick={() => handleBuyNow(item)}>
                  Buy Now
                </button>
                <button className="remove-btn" onClick={() => removeItem(item.itemId._id)}>
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Total Items: {cart.items.length}</h3>
          <h3>Total Amount: ₹{cart.totalAmount}</h3>
        </div>
      </div>

      {/* Modal for Size & Address */}
      {showModal && selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Your Order</h2>

            {/* Size Selection */}
            <label htmlFor="size">Select Size:</label>
            <select
              id="size"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Select Size</option>
              {["S", "M", "L", "XL", "XXL"].map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>

            {/* Address Input */}
            <label htmlFor="address">Enter Delivery Address:</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
            ></textarea>

            {/* Submit and Cancel Buttons */}
            <div className="modal-actions">
              <button onClick={handleSubmitOrder} className="confirm-btn">
                Confirm Order
              </button>
              <button onClick={() => setShowModal(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
