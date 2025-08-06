import React, { createContext, useState, useEffect } from 'react';
// We now import our centralized api instance
import api from '../api/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    // This new state will prevent the app from rendering until we've checked for a token
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            // Set the token as a default header for all future api requests
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            try {
                const decodedUser = JSON.parse(atob(token.split('.')[1]));
                setUser({ username: decodedUser.username });
            } catch (e) {
                console.error("Failed to decode token", e);
                setUser(null);
            }
        } else {
            delete api.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            setUser(null);
        }
        // Once the check is complete, we can allow the app to render
        setLoading(false);
    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
    };

    const value = {
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
    };

    // While the initial token check is happening, we show a loading message.
    // This prevents any other component from making an unauthorized API call.
    if (loading) {
        return <div>Loading Application...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
