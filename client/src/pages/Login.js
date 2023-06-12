import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Navigate } from 'react-router-dom';

import Auth from '../utils/Auth';
import "./Login.css"

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleLoginForm = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropogation();
    }

    try {
      const { data } = await login({
        // setting variables field to be an object with key/value pairs
        variables: { ...formData },
      });
      console.log(data);
      console.log('user successfully logged in!');
      // when log in is successful, User is directed to homepage
      Auth.login(data.login.token);
      // Navigate
    } catch (error) {
      console.error(error);
    }

    setFormData({
      email: '',
      password: ''
    });
    // Perform login logic here, e.g., API call to validate credentials
    // If successful, navigate to the next page using navigate('/next-page')
    // navigate('/address');
  };


  return (
    <>
      <div className='login-container'>
        <h1>Login Page</h1>
        <form noValidate validated={validated} onSubmit={handleLoginForm}>
          <Alert dismissable onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
          >
            Log In credentials not accepted. Try again, suckaa
          </Alert>
          <input
            className="form-input"
            placeholder="Your email"
            name="email"
            type="email"
            id="login-email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            className="form-input"
            placeholder="******"
            name="password"
            type="password"
            id="login-password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <br />
          <button type="submit">Login</button>
        </form>
        {error && <div>Login Failed.. Try again!</div>}
      </div>
    </>
  );
}

