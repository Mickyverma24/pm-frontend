import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        setAuthUser(null);
        navigate('/login');
    };

    useEffect(() => {
        // Check if user is already logged in
        const auth_token = localStorage.getItem('auth_token');
        const api_key = localStorage.getItem('api_key');
        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');

        if (auth_token && api_key && name && email) {
            setAuthUser({
                name,
                email,
                auth_token,
                api_key
            });
        }
        setLoading(false);
    }, []);

    const value = {
        authUser,
        setAuthUser,
        loading,
        logout
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
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}; 