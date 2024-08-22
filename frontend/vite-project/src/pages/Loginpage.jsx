import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../components/TaskList/TaskForm.css';
import './LoginPage.css'

import useStore from '../store';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setUser } = useStore();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      
      // show alert if login is not successful
      
      if (response.status === 200) {
        await setUser(response.data).then(() => {
          console.log('User set', useStore.getState().user);
        })

      }
      if (response.data.role === 'Admin') {
        navigate('/admin', { replace: false });
      } else {
        navigate('/dashboard', { replace: false });
      }
    } catch (error) {
      alert('Invalid credentials');
      console.error('Login error', error);
    }
  };

  const handleRegister = (e) => {
    // navigate to register page and keep the navigation history
    e.preventDefault();
    navigate('/register', { replace: false });
  }
  return (
    <div className='Login-container'>
      <h2 className='app_header'>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className='task_input'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className='task_input'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
        <p>Don't have an account?</p>
        <button onClick={(e) => handleRegister(e)}>Register</button>
      </form>
    </div>
  );
};

export default LoginPage;
