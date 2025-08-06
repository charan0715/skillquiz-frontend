import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// This component will wrap any routes that require a user to be logged in.
const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AuthContext);

    // If the user is authenticated, show the page they were trying to access.
    // The <Outlet /> component renders the child route element.
    // If not, redirect them to the /login page.
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
