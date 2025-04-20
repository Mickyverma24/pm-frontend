import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import socket from "../../utils/socketConnection";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            confirmPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await response.json();

      // Save to localStorage with correct variable names
      localStorage.setItem("authToken", data.authToken);
      localStorage.setItem("apiKey", data.apiKey);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);

      setAuthUser({
        name: data.name,
        email: data.email,
        authToken: data.authToken,
        apiKey: data.apiKey,
      });
      // when users get's signed up then socket.connect
      if (socket && !socket.connected) {
        socket.connect(); // Establish connection
        // socket.emit('welcome', { message: 'User has logged in!' }); // Emit welcome event
      }
      navigate("/dashboard");
    } catch (error) {
      setError(error.message || "Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          border: "1px solid #444",
          borderRadius: "6px",
          backgroundColor: "#111",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Signup</h2>

        {error && (
          <div
            style={{ color: "red", marginBottom: "15px", textAlign: "center" }}
          >
            {error}
          </div>
        )}

        <div style={{ marginBottom: "15px" }}>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-style"
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-style"
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-style"
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-style"
            required
          />
        </div>
        <div>
          <a href="/login" className="custom-link">
            Already have an account?
          </a>
        </div>
        <button type="submit" className="button-style">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
