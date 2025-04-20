import io from "socket.io-client";
import { useAuthContext } from "../contexts/AuthContext";

const getSocketOptions = () => {
  const apiKey = localStorage.getItem("apiKey");
  return {
    auth: {
      token: apiKey || "",
      clientType: "frontend",
    },
  };
};

const socket = io.connect(import.meta.env.VITE_BACKEND_API, getSocketOptions());

export default socket;
