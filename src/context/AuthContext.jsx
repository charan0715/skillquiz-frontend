import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the context
export const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Set the authorization header for all axios requests when token changes
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            // Here you could fetch user data if you have a /me endpoint
            // For now, we'll just decode the token (simple way)
            try {
                const decodedUser = JSON.parse(atob(token.split('.')[1]));
                setUser({ username: decodedUser.username });
            } catch (e) {
                console.error("Failed to decode token", e);
                setUser(null);
            }
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            setUser(null);
        }
        setLoading(false);
    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
    };

    // The value provided to consuming components
    const value = {
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token, // a boolean to easily check if logged in
    };

    // Don't render children until we've checked for a token
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
