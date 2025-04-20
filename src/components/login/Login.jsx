import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import "./login.css";
import socket from "../../utils/socketConnection";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
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
      if (socket && !socket.connected) {
        socket.connect(); // Establish connection
        // socket.emit('welcome', { message: 'User has logged in!' }); // Emit welcome event
      }
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error);
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
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        {error && (
          <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>
        )}
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
        <div>
          <a href="/signup" className="custom-link">
            Don't have an account?
          </a>
        </div>
        <button type="submit" className="button-style">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
