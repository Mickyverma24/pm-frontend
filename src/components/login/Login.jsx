import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import "./login.css";
import socket from "../../utils/socketConnection";
import useLogin from "../../hooks/useLogin";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuthUser } = useAuthContext();
  const {login} = useLogin()
  const navigate = useNavigate();
  const demoUrl = import.meta.env.VITE_DEMO_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      await login({email,password})
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
          <a href={demoUrl} target="_blank" className="custom-link">
            Want to see demo? 
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
