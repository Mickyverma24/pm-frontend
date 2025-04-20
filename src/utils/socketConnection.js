import io from "socket.io-client";
import { useAuthContext } from "../contexts/AuthContext";

const getSocketOptions = () => {
    const auth_token = localStorage.getItem('auth_token');
    return {
        auth: {
            token: auth_token || "",
            clientType: "frontend",
        },
    };
};

const socket = io.connect(import.meta.env.VITE_BACKEND_API, getSocketOptions());

export default socket;
