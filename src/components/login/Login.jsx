import React, { useState } from 'react';
import useLogin from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { loading, login } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
    navigate('/');
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
        borderRadius: '6px',
        backgroundColor: '#111',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
        <div style={{ marginBottom: '15px' }}>
          <label>Email</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            className='input-style' required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password</label><br />
          <input type="password" name="password" value={formData.password} onChange={handleChange}
            className='input-style' required />
        </div>
        <div>
          <a href="/signup" className="custom-link">Don't have an account?</a>
        </div>
        <button type="submit" className='button-style' disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
