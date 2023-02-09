import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export const PrivateRoute = () => {
    const auth = localStorage.getItem('user');
  return auth? <Outlet/> : <Navigate to="/Register"/>
}
