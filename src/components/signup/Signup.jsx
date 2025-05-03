import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import socket from "../../utils/socketConnection";
import useSignup from "../../hooks/useSignup";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuthUser } = useAuthContext();
  const{signup} = useSignup();
  const navigate = useNavigate();
  const demoUrl = import.meta.env.VITE_DEMO_URL
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      await signup({name,email,password,confirmPassword})
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
          <a href={demoUrl} target="_blank" className="custom-link">
            Want to see demo? 
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
