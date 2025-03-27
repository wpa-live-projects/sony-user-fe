import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import signupImage from "../assets/signup.png"; // Adjust the path if needed

function Signup() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert("Signup successful! Please log in.");
                navigate("/login");
            } else {
                alert("Signup failed!");
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

    return (
        <div className="signup-wrapper">
            {/* Left Section - Image */}
            <div className="signup-image">
                <img src={signupImage} alt="Signup" />
            </div>

            {/* Right Section - Signup Form */}
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}
export default Signup;
