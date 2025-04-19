import "./App.css";
import Login from "./components/login/Login";
import SingUp from "./components/signup/Signup";
import Home from "./components/homepage/Homepage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";
function App() {
  const { authUser } = useAuthContext();
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SingUp />}
        />
      </Routes>
    </div>
  );
}

export default App;