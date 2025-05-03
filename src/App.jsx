import "./App.css";
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './contexts/AuthContext';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Homepage from "./components/homepage/Homepage";
import DemoRedirect from "./components/demo/DemoRedirect";
// Protected Route component
const ProtectedRoute = ({ children }) => {
    const { authUser, loading } = useAuthContext();

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a proper loading component
    }

    if (!authUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

function App() {
    return (
        <div>
             <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* <Route path="/demo" element={<DemoRedirect />} /> */}
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Homepage />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <Navigate to="/dashboard" replace />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </AuthProvider>
        </div>
       
    );
}

export default App;