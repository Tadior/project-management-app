import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCookieToken } from '../../helper/Helper';

export const ProtectedRoute = () => {
  const token = getCookieToken();
  return token ? <Navigate to={'/'} /> : <Outlet />;
};
