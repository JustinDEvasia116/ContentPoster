import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout()).then((success) => {
      if (success) {
        navigate('/login');
      }
    });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Link style={{ fontSize: '22px', padding: '2rem' }} to="/">
        Home
      </Link>
      <span> | </span>

      {user ? (
        <>
          <Link style={{ fontSize: '22px', padding: '2rem' }} onClick={handleLogout}>
            Logout
          </Link>
          <span> | </span>
        </>
      ) : (
        <>
          <Link style={{ fontSize: '22px', padding: '2rem' }} to="/login">
            Login
          </Link>
          <span> | </span>
        </>
      )}

      <Link style={{ fontSize: '22px', padding: '2rem' }} to="/signup">
        Signup
      </Link>
      <span> | </span>
      <Link style={{ fontSize: '22px', padding: '2rem' }} to="/admin">
        Admin
      </Link>
    </div>
  );
}

export default Header;