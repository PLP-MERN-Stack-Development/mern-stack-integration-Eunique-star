import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../services/api";

const ProtectedRoute = () => {
  const currentUser = authService.getCurrentUser();

  // If user exists, show the child component (Outlet)
  // If not, redirect to /login
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
