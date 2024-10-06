import React from 'react';

const FacebookLogin = () => {
    const handleLogin = async () => {
        const response = await fetch('http://localhost:5000/auth/facebook/login');
        const data = await response.json();
        window.location.href = data.loginUrl; // Redirect to Facebook login URL
    };

    return (
        <div>
            <h2>Login with Facebook</h2>
            <button onClick={handleLogin}>Login with Facebook</button>
        </div>
    );
};

export default FacebookLogin;
