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
                <p>This is your dashboard. Here you can add your server performance widget just by installing our cli tool into your server.</p>
                <p>To get cli tool <a>link</a></p>
            </div>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard; 