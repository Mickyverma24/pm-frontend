import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ name, email, password, confirmPassword }) => {
    const success = handleInputErrors({
      name,
      email,
      password,
      confirmPassword,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, confirmPassword }),
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

      toast.success("Signup successful!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

function handleInputErrors({ name, email, password, confirmPassword }) {
  if (!name || !email || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}

export default useSignup;
