import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./collections.css";

const ShirtCollections = () => {
  const [items, setItems] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [address, setAddress] = useState("");

  const location = useLocation();
  const isMorePage = location.pathname.includes("/shop/more");

  const productColors = {};

  const getSizeOptions = (type) => {
    return type === "shirt"
      ? ["S", "M", "L", "XL", "XXL"]
      : ["28", "30", "32", "34", "36"];
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://sony-user-be.onrender.com/api/items");

        
        if (response.data.length > 0) {
          const colorsList = [
            ["#23266B", "#D2E1E7"],
            ["#b3bcc5", "#D2E1E7"],
            ["#a19d99", "#c7c8c6"],
            ["#2A3A47", "#D2E1E7"],
            ["#2D4C40", "#382420"],
            ["#8498A7", "#D7A8A1"],
            ["#6b6652", "#7a6a5d"],
            ["#929f88", "#4a5d3b"],
            ["#0D0D0D", "#7B7B7B"],
            ["#2F415C", "#5A5A5A"],
            ["#192A44", "#7B7B7B"],
            ["#929f90", "#7B7B7B"],
          ];
        
          response.data.forEach((item, index) => {
            if (colorsList[index]) {
              productColors[item._id] = colorsList[index];
            }
          });
        }

           // ✨ Add this line to reverse the items ✨
           enhancedItems = enhancedItems.reverse();

        let enhancedItems = response.data.map((item) => ({
          ...item,
          colors: productColors[item._id] || [],
          images: item.images?.length >= 2 ? item.images : [item.image, item.image],
        }));

        if (!isMorePage) {
          enhancedItems = enhancedItems.slice(0, 8); // Show only 8 on /shop
        }

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
  }, [isMorePage]);

  const handleColorClick = (itemId, colorIndex) => {
    setSelectedImages((prev) => ({
      ...prev,
      [itemId]: items.find((item) => item._id === itemId).images[colorIndex],
    }));
  };

  const handleAddToCart = async (itemId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You need to log in first!");
      window.location.href = "/login";
      return;
    }

    try {
      await axios.post("https://sony-user-be.onrender.com/api/add", {
        userId,
        itemId,
        quantity: 1,
      });
      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data?.message || error.message);
      alert("Failed to add item to cart.");
    }
  };

  const handleBuyNow = (item) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You need to log in first!");
      window.location.href = "/login";
      return;
    }

    setSelectedItem(item);
    setSelectedSize("");
    setAddress("");
    setShowModal(true);
  };

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
      await axios.post(
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
      setShowModal(false);

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

            <div className="item-extra-details">
              <p><strong>Rating:</strong> ⭐ {item.rating}/5</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Type:</strong> {item.type}</p>
            </div>

            <div className="button-group">
              <button onClick={() => handleAddToCart(item._id)} className="add-to-cart-btn">
                Add to Cart
              </button>
              <button onClick={() => handleBuyNow(item)} className="buy-now-btn">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Your Order</h2>

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

            <label htmlFor="address">Enter Delivery Address:</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
            ></textarea>

            <div className="modal-actions">
              <button onClick={handleSubmitOrder} className="confirm-btn">Confirm Order</button>
              <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Show Explore More button only on /shop */}
      {!isMorePage && (
        <div className="text-center">
          <button
            className="explore-more-btn"
            onClick={() => (window.location.href = "/shop/more")}
          >
            Explore More
          </button>
        </div>
      )}
    </div>
  );
};

export default ShirtCollections;
