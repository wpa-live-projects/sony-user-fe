import React, { useState, useEffect } from "react";
import axios from "axios";
import "./collections.css"; // Your existing CSS

const ShirtCollections = () => {
  const [items, setItems] = useState([]); // Store fetched items
  const [selectedImages, setSelectedImages] = useState({}); // Store selected images for each item
  const [loading, setLoading] = useState(true); // Loading state
  const [showModal, setShowModal] = useState(false); // Show/hide modal
  const [selectedItem, setSelectedItem] = useState(null); // Store selected item for Buy Now
  const [selectedSize, setSelectedSize] = useState(""); // Store chosen size
  const [address, setAddress] = useState(""); // Store entered address

  // Define color options for each product
  const productColors = {};

  // Define size options based on item type
  const getSizeOptions = (type) => {
    return type === "shirt"
      ? ["S", "M", "L", "XL", "XXL"]
      : ["28", "30", "32", "34", "36"];
  };

  // Fetch items from backend API using axios
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://sony-user-be.onrender.com/api/items");

        // Set colors for specific products (modify if needed)
        if (response.data.length > 0) {
          productColors[response.data[2]._id] = ["#6b6652", "#7a6a5d"];
          productColors[response.data[3]._id] = ["#929f88", "#4a5d3b"];
          productColors[response.data[4]._id] = ["#0D0D0D", "#7B7B7B"];
          productColors[response.data[5]._id] = ["#2F415C", "#5A5A5A"];
          productColors[response.data[6]._id] = ["#192A44", "#7B7B7B"];
          productColors[response.data[7]._id] = ["#929f90", "#7B7B7B"];
        }

        // Enhance items with color options and images
        const enhancedItems = response.data.map((item) => ({
          ...item,
          colors: productColors[item._id] || [],
          images: item.images?.length >= 2 ? item.images : [item.image, item.image],
        }));

        // Initialize selected images with the first image for each item
        const initialImages = enhancedItems.reduce((acc, item) => {
          acc[item._id] = item.images[0];
          return acc;
        }, {});

        setItems(enhancedItems);
        setSelectedImages(initialImages);
      } catch (error) {
        console.error("Error fetching items:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle color selection
  const handleColorClick = (itemId, colorIndex) => {
    setSelectedImages((prev) => ({
      ...prev,
      [itemId]: items.find((item) => item._id === itemId).images[colorIndex],
    }));
  };

  // Handle Add to Cart
// Handle Add to Cart
const handleAddToCart = async (itemId) => {
  const userId = localStorage.getItem("userId"); // Get userId from localStorage
  if (!userId) {
    alert("You need to log in first!");
    window.location.href = "/login"; // Redirect to login page if not logged in
    return;
  }

  try {
    const response = await axios.post("https://sony-user-be.onrender.com/api/add", {
      userId,
      itemId,
      quantity: 1, // Default quantity
    });

    alert("Item added to cart successfully!");
  } catch (error) {
    console.error("Error adding to cart:", error.response?.data?.message || error.message);
    alert("Failed to add item to cart.");
  }
};


  // Handle Buy Now
// Handle Buy Now
const handleBuyNow = (item) => {
  const userId = localStorage.getItem("userId"); // Get userId from localStorage
  if (!userId) {
    alert("You need to log in first!");
    window.location.href = "/login"; // Redirect to login page if not logged in
    return;
  }

  setSelectedItem(item);
  setSelectedSize(""); // Reset size
  setAddress(""); // Reset address
  setShowModal(true); // Show modal
};


  // ✅ Check if item is in the cart
  const isItemInCart = async (itemId) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`https://sony-user-be.onrender.com/api/get/${userId}`);
      const cartItems = response.data.items || [];
      return cartItems.some((item) => item.itemId._id === itemId);
    } catch (error) {
      console.error("Error checking cart:", error.message);
      return false;
    }
  };

  // ✅ Remove item from cart after placing order
  const removeItemFromCart = async (itemId) => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.delete("https://sony-user-be.onrender.com/api/remove", {
        data: { userId, itemId },
      });
      console.log(`Item ${itemId} removed from cart.`);
    } catch (error) {
      console.error("Error removing item from cart:", error.message);
    }
  };

  // ✅ Handle Order Submission
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
        "https://sony-user-be.onrender.com/api/orders",
        {
          itemId: selectedItem._id,
          size: selectedSize,
          quantity: 1,
          address,
        },
        {
          headers: {
            "user-id": userId,
          },
        }
      );

      alert("Order placed successfully!");
      setShowModal(false); // Close modal after success

      // ✅ Check if item is in the cart and remove if necessary
      const isInCart = await isItemInCart(selectedItem._id);
      if (isInCart) {
        await removeItemFromCart(selectedItem._id);
        alert("Item was in the cart and has been removed after order.");
      }
    } catch (error) {
      console.error("Error placing order:", error.response?.data?.msg || error.message);
      alert(`Failed to place order: ${error.response?.data?.msg || error.message}`);
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (!items.length) return <div className="empty">No products found</div>;

  return (
    <div className="container">
      <h1>
        Latest <span className="highlight">Collections</span>
      </h1>

      <div className="grid">
        {items.map((item) => (
          <div key={item._id} className="item">
            <div className="image-container">
              <img
                src={selectedImages[item._id]}
                alt={item.name}
                className="item-image"
                loading="lazy"
              />
            </div>

            <h3 className="item-name">{item.name}</h3>

            {/* Item Details */}
            <div className="item-details">
              <div className="colors">
                {item.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`color-option ${
                      selectedImages[item._id] === item.images[index] ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(item._id, index)}
                  />
                ))}
              </div>
              <span className="item-price">₹{item.cost}</span>
            </div>

            {/* Rating, Category & Type */}
            <div className="item-extra-details">
              <p>
                <strong>Rating:</strong> ⭐ {item.rating}/5
              </p>
              <p>
                <strong>Category:</strong> {item.category}
              </p>
              <p>
                <strong>Type:</strong> {item.type}
              </p>
            </div>

            {/* Button Group */}
            <div className="button-group">
              <button
                onClick={() => handleAddToCart(item._id)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleBuyNow(item)}
                className="buy-now-btn"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
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
              {getSizeOptions(selectedItem.type).map((size, index) => (
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

export default ShirtCollections;
