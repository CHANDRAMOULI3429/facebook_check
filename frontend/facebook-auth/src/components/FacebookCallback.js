import React, { useEffect, useState } from 'react';

const FacebookCallback = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/auth/facebook/callback?code=' + new URLSearchParams(window.location.search).get('code'));

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserData(data); // Store user data in state
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message); // Store error message in state
            } finally {
                setLoading(false); // Set loading to false when done
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message
    }

    return (
        <div>
            <h2>User Data Retrieved Successfully!</h2>
            <pre>{JSON.stringify(userData, null, 2)}</pre> {/* Display user data */}
        </div>
    );
};

export default FacebookCallback;
