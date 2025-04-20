import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ email, password }) => {
    const success = handleInputErrors({ email, password });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // Store user data in localStorage
      localStorage.setItem("authToken", data.authToken);
      localStorage.setItem("apiKey", data.apiKey);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);

      // Update auth context
      setAuthUser({
        name: data.name,
        email: data.email,
        authToken: data.authToken,
        apiKey: data.apiKey,
      });

      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
function handleInputErrors({ email, password }) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
