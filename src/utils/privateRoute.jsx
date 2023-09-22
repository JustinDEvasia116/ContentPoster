import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ element, ...rest }) => {
  const user = useSelector(state => state.auth.user);
  return user ? (
    <Routes>
      <Route path="/" element= {element}/>
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;