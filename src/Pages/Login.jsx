import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import loginImage from "../assets/Login.png";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
    
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Store login data in localStorage
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userId", data.userId);
    
                // ✅ Set expiry time (1 hour)
                const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour in milliseconds
                localStorage.setItem("expiryTime", expiryTime);
    
                window.dispatchEvent(new Event("storage"));
                alert("Login Successful...!!");
                navigate("/");
            } else {
                setError(data.message || "Incorrect email or password!");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="login-wrapper">
            <div className="login-image">
                <img src={loginImage} alt="Login" />
            </div>
            <div className="login-container">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            minLength="1"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading-spinner"></span>
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
                <p className="signup-link">
                    No account? <span onClick={() => navigate("/signup")}>Sign up</span>
                </p>
            </div>
        </div>
    );
}

export default Login;