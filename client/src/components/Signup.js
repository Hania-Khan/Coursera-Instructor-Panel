import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../style/styles.css'

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/signup', formData);
      const { data } = response;

      if (response.status === 201 && data && data.instructor && data.token) {
        console.log('Signup successful');
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else if (response.status === 400 && data && data.msg === 'User already exists') {
        setErrorMessage('User already exists. Please login.');
        console.log('User already exists. Please login.');
      } else {
        console.log('Signup failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('Signup details not found.');
        console.log('Signup details not found.');
      } else {
        setErrorMessage('Error');
        console.log('Error', error);
      }
    }
  };

  return (
    <div className="container bg-light d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-6 text-center">
        <h2 className="pt-4">Sign up</h2>
        <p>Welcome, new instructor! Create your account below:</p>
        <form className="lead"   onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="signupEmail" className="form-label">Email</label>
            <input type="email" className="form-control" id="signupEmail" aria-describedby="emailHelp"
              placeholder="Enter email" value={formData.email} onChange={handleChange} name="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="signupPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="signupPassword" placeholder="Password"
              onChange={handleChange} value={formData.password} name="password" />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-block">Sign up</button>
          </div>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="line"></div>
        <div className="d-flex justify-content-center">
          <p className="or">
            <span className="line-left"></span>
            OR
            <span className="line-right"></span>
          </p>
        </div>
        <div className="line"></div>
        <div className="d-grid">
          <Link to="/login" className="btn btn-primary btn-block">Login Page</Link>
        </div>
      </div>
    </div>
  );
  
  
  
  
  
  
};

export default Signup;
