import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1 style={{ fontSize: '2rem', color: '#d9534f' }}>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <p>
                If this was the login page, click <a href="https://group-finance-manager.vercel.app/login">here</a> to get redirected.
            </p>
            <Link to="/" style={{ textDecoration: 'none', color: '#337ab7' }}>Go to Home</Link>
        </div>
    );
};

export default NotFound;
