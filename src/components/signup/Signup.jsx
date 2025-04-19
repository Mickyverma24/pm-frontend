import React, { useState } from 'react';
import './signup.css'
const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      console.log('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    console.log('User Data:', { name, email, password, confirmPassword });
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Signup</h2>

        <div style={{ marginBottom: '15px' }}>
          <label>Name</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange}
            className = 'input-style' required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Email</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            className = 'input-style' required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password</label><br />
          <input type="password" name="password" value={formData.password} onChange={handleChange}
            className='input-style' required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Confirm Password</label><br />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
            className = 'input-style' required />
        </div>
        <div>
        <a href="/login" className="custom-link">Already have an account?</a>
        </div>
        <button type="submit" className='button-style'>Register</button>
      </form>
    </div>
  );
};


export default Signup;
