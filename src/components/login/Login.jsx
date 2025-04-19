import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      console.log('Please fill all fields');
      return;
    }

  };

  return (
    <div style={{
      backgroundColor: '#000',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <form onSubmit={handleSubmit} style={{
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        border: '1px solid #444',
        borderRadius: '6px', // Slightly rounded
        backgroundColor: '#111',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
        <div style={{ marginBottom: '15px' }}>
          <label>Email</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            style={inputStyle} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password</label><br />
          <input type="password" name="password" value={formData.password} onChange={handleChange}
            style={inputStyle} required />
        </div>
        <a href="/signup" className="custom-link">Don't have an account?</a>
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#222',
  color: '#fff',
  border: '1px solid #555',
  borderRadius: '5px', // Rounded input
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#fff',
  color: '#000',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default Login;
