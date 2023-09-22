import React from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { login } from '../../features/auth/authSlice';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await props.login(formData.get('username'), formData.get('password'));
      console.log('response: ', response);
      if (response.status === 200) {
        // Authentication succeeded
        navigate('/');
      } else {
        // Authentication failed
        alert('Failed to authenticate. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit" className="btn-login">Login</button>
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  login
};

export default connect(null, mapDispatchToProps)(Login);
