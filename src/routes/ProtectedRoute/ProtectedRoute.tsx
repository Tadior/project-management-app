import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from '../../helper/Helper';

export const ProtectedRoute = () => {
  const token = getCookie('token');
  return token ? <Navigate to={'/'} /> : <Outlet />;
};
