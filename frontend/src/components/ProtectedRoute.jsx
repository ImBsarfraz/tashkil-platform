import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useGetProfileQuery } from '../redux/api/authApi';

const ProtectedRoute = ({ children, roles }) => {
    const { user } = useSelector((state) => state.auth);

    const { isLoading } = useGetProfileQuery();

    // Wait until profile loads
    if (isLoading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Role check (if provided)
    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
