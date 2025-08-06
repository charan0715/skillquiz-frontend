import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// This component protects routes that should only be accessible to admins.
function AdminProtectedRoute() {
    const { isAuthenticated, user } = useContext(AuthContext);

    // First, check if the user is authenticated at all.
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Then, check if the authenticated user has the 'isAdmin' flag.
    // If they are an admin, render the child component (e.g., AdminPage).
    // If not, redirect them to the home page.
    return user?.isAdmin ? <Outlet /> : <Navigate to="/home" replace />;
};

export default AdminProtectedRoute;
