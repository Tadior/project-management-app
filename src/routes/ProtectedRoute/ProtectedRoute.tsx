import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from '../../helper/Helper';

export const ProtectedAuthUserRoute = () => {
  const token = getCookie('token');
  return token ? <Navigate to={'/'} /> : <Outlet />;
};

export const ProtectedNotAuthUserRoute = () => {
  const token = getCookie('token');
  return !token ? <Navigate to={'/'} /> : <Outlet />;
};
