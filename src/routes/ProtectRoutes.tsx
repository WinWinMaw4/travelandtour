// src/components/ProtectedRoute.tsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "@store/index";

const ProtectedRoute = () => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    // If not authenticated → redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Otherwise, render child routes
    return <Outlet />;
};

export default ProtectedRoute;
