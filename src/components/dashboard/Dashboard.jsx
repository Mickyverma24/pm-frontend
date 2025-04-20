import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import './dashboard.css';

const Dashboard = () => {
    const { authUser, logout } = useAuthContext();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="dashboard">
            <div className="dashboard-content">
                <h1>Welcome, {authUser?.name || 'User'}!</h1>
                <p>This is your dashboard. Here you can manage your tasks and projects.</p>
            </div>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard; 