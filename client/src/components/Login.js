import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../style/styles.css'

const Login = () => {
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
      const response = await axios.post('http://localhost:8000/login', formData);
      const { data } = response;

      if (response.status === 201 && data && data.instructor && data.token) {
        console.log('Login successful');
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else if (response.status === 400 && data && data.msg === 'Invalid password') {
        setErrorMessage('Invalid password. Please try again.');
        console.log('Invalid password. Please try again.');
      }
      else if (response.status === 404 && data && data.msg === 'No such email found') {
        setErrorMessage('User not found. Please sign up.');
        console.log('User not found. Please sign up.'); 
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('User not found. Please sign up.');
        console.log('User not found. Please sign up.'); 
      } else {
        setErrorMessage('An error occurred. Please try again.');
        console.log('An error occurred', error);
      }
    }
  };

  return (
    <div className="container bg-light d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-6 text-center">
        <h2 className="pt-4">Log in</h2>
        <p>Welcome Back, Login below:</p>
        <form className="lead" onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary btn-block">Log in</button>
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
          <Link to="/signup" className="btn btn-primary btn-block">Signup Page</Link>
        </div>

      </div>
    </div>
  );

};

export default Login;
