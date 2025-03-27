import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Myorders.css"; // ✅ Create this file for styling

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch orders when component loads
  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Get userId from localStorage
  const userId = localStorage.getItem("userId");

  // Fetch all orders for the logged-in user
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://sony-user-be.onrender.com/api/orders", {
        headers: { "user-id": userId }
      });
      setOrders(response.data.orders);
    } catch (err) {
      setError("Error fetching orders. Please try again.");
      console.error("Fetch orders error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Cancel Order
  const cancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    try {
      const response = await axios.put(
        `https://sony-user-be.onrender.com/api/orders/${orderId}/cancel`,
        {},
        {
          headers: { "user-id": userId }
        }
      );

      if (response.status === 200) {
        alert("Order cancelled successfully!");
        fetchOrders(); // Refresh orders after cancellation
      }
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Failed to cancel the order.");
    }
  };

  return (
    <div className="my-orders-container">
      <h2 className="orders-title">🛍️ My Orders</h2>

      {isLoading ? (
        <div className="loading">Loading orders...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : orders.length === 0 ? (
        <div className="no-orders">No orders found!</div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <img
                src={order.itemImage}
                alt={order.itemName}
                className="order-image"
              />
              <div className="order-details">
                <h3>{order.itemName}</h3>
                <p>📏 Size: {order.size}</p>
                <p>🔢 Quantity: {order.quantity}</p>
                <p>💰 Total: ₹{order.totalCost}</p>
                <p>📍 Address: {order.address}</p>
                <p
                  className={`status ${
                    order.status === "cancelled" ? "cancelled" : ""
                  }`}
                >
                  📌 Status: {order.status}
                </p>

                {order.status === "placed" && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="cancel-btn"
                  >
                    ❌ Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
