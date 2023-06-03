import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import "./Login.css"

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Perform login logic here, e.g., API call to validate credentials
    // If successful, navigate to the next page using navigate('/next-page')
    navigate('/address');
  };

  return (
    <>
      <Navbar />
      <div className='login-container'>
        <h1>Login Page</h1>
        <form>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <button type="button" onClick={handleLogin}>Login</button>
        </form>
      </div>
      <Footer/>
    </>
  );
}

export default Login;
