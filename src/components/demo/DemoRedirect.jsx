import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './demo.css';

const DemoRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.location.href = 'https://performancemoniter.netlify.app/';
    }, []);

    return (
        <div className="demo-redirect">
            <h2>Redirecting to Performance Monitor Demo...</h2>
            <p>If you are not redirected automatically, <a href="https://performancemoniter.netlify.app/">click here</a>.</p>
        </div>
    );
};

export default DemoRedirect; 