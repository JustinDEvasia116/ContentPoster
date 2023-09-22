import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHeader.css';
import { adminLogoutSuccess } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

function AdminHeader() {
  const navigate= useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authTokens');
    dispatch(adminLogoutSuccess());
    navigate('/admin');
  };

  return (
    <div className="admin-header">
      <div className="admin-header-title">Admin Panel</div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminHeader;
