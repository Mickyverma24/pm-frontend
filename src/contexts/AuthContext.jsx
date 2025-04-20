import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const verifyAuth = async () => {
        try {
            const auth_token = localStorage.getItem('auth_token');
            const api_key = localStorage.getItem('api_key');
            const name = localStorage.getItem('name');
            const email = localStorage.getItem('email');

            if (!auth_token || !api_key || !name || !email) {
                throw new Error('Missing authentication data');
            }

            // Verify with backend API
            const response = await fetch('YOUR_BACKEND_VERIFY_ENDPOINT', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${auth_token}`,
                    'x-api-key': api_key
                }
            });

            if (!response.ok) {
                throw new Error('Authentication failed');
            }

            setAuthUser({
                name,
                email,
                auth_token,
                api_key
            });
        } catch (error) {
            console.error('Auth verification failed:', error);
            localStorage.clear();
            setAuthUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyAuth();
    }, []);

    const logout = () => {
        localStorage.clear();
        setAuthUser(null);
        navigate('/login');
    };

    const value = {
        authUser,
        setAuthUser,
        loading,
        logout,
        verifyAuth
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