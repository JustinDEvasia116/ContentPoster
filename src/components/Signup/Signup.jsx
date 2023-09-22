import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (firstName === '' || lastName === '' || username === '' || email === '' || password === '') {
      alert('Please fill all the fields.');
      return
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
      }).then(response => {
        alert(`Signup Successfull`);
        navigate('/login')

      }).catch(err => {
        alert(err?.response?.data?.error)
      });


    } catch (error) {
      console.log(`Error: ${(error)}`);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="submit" className="btn-signup">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
