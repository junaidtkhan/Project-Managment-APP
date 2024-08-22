import React from 'react';

const UnAuthenticated = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  };

  const messageStyle = {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  const buttonSecondaryStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
  };

  return (
    <div style={containerStyle}>
      <div style={messageStyle}>
        You are not authenticated.
      </div>
      <a href="/login" style={buttonStyle}>
        Log In
      </a>
      <a href="/register" style={buttonSecondaryStyle}>
        Register
      </a>
    </div>
  );
};

export default UnAuthenticated;
