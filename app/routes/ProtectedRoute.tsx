import React from "react";
import {Navigate, Outlet, useLocation} from "react-router";
import {useAuth} from "~/context/useAuth";

const ProtectedRoute = () => {
    const location = useLocation();
    const {isLoggedIn} = useAuth();
    return isLoggedIn() ? (
        <Outlet/>
    ) : (
        <Navigate to="/login" state={{from: location}} replace/>
    );
};

export default ProtectedRoute;