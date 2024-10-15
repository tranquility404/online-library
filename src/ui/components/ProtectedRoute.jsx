import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthStatusContext } from '../pages/LoginPage/AuthStatusContext.jsx';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthStatusContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;