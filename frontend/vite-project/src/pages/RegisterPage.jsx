import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../components/TaskList/TaskForm.css';
import './RegisterPage.css'

import useStore from '../store';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();




  const handleSubmit = async (e) => {
    e.preventDefault();

    const roleSelect = document.getElementById('role');
    let role = roleSelect.options[roleSelect.selectedIndex].value;
    // console.log(name, email, password, role)
    try {
      const response = await axios.post('http://localhost:3000/auth/register', { name, email, password, role });
      if (response.status !== 200) {
        alert(response.data);
      }

      navigate('/login', { replace: false });


    } catch (error) {
      console.error('Registration error', error);
    }
  };

  const handleLogin = (e) => {
    // navigate to login page and keep the navigation history
    e.preventDefault();
    navigate('/login', { replace: false });
  }

  return (
    <div className='Register-container'>
      <h2 className='app_header'>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className='task_input'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
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
        {/* <br/> */}
        {/* make drop down for role selection */}

        <div className='User-role'>
          <label htmlFor="role">Role</label>
          <select id="role" name="role">
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>


        {/* <input id="role" type="checkbox" value={'Admin'} placeholder='Admin' /><span>Admin</span> */}
        <button type="submit">Register</button>
        <p>Already have an account?</p>
        <button onClick={(e) => handleLogin(e)}>Log-In</button>
      </form>
    </div>
  );
};

export default RegisterPage;
