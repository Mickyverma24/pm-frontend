import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../utils/socketConnection";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const verifyAuth = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const apiKey = localStorage.getItem("apiKey");
      const name = localStorage.getItem("name");
      const email = localStorage.getItem("email");

      // If any auth data is missing, just set loading to false and return
      if (!authToken || !apiKey || !name || !email) {
        setLoading(false);
        return;
      }

      // Verify with backend API
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/verify`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "x-api-key": apiKey,
          },
        }
      );

      // Handle specific error cases
      if (response.status === 403) {
        // Invalid API key or user not active
        localStorage.clear();
        setAuthUser(null);
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      // If verification is successful, update the auth state
      setAuthUser({
        name,
        email,
        authToken,
        apiKey,
      });
    } catch (error) {
      console.error("Auth verification failed:", error);
      localStorage.clear();
      setAuthUser(null);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  const logout = () => {
    if (socket && socket.connected) {
      socket.disconnect();
      console.log("Socket was connected and is now disconnected.");
    } else {
      console.log("Socket is already disconnected.");
    }

    localStorage.clear();
    setAuthUser(null);
    navigate("/login");
  };

  const value = {
    authUser,
    setAuthUser,
    loading,
    logout,
    verifyAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
