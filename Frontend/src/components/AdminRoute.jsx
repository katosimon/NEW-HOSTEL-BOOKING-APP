import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContextContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading"><div className="spinner"></div></div>;
  if (!user || user.role !== 'admin') return <Navigate to="/" />;
  
  return children;
};

export default AdminRoute;
