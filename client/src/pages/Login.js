import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import "./Login.css"


export default function Login() {
  const [loginState, setLoginState] = useState({ email: '', password: '' });

  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginState({
      ...loginState,
      [name]: value
    });
  };


  const handleLoginForm = async (event) => {
    event.preventDefault();
    

    try {
      const { data } = await login({
        // setting variables field to be an object with key/value pairs
        variables: { ...loginState }
      });
      console.log(data);
      console.log('user successfully logged in!');
      // when log in is successful, User is directed to homepage
      Auth.login(data.login.token);
      setLoginState({
        email: '',
        password: ''
      })
    } catch (error) {
      console.error(error);
      setLoginState({
        email: '',
        password: ''
      });
    }

  };


  return (
    <>
      <div className='login-container'>
        <h1>Login Page</h1>
        <form onSubmit={handleLoginForm}>
          <input
            className="form-input"
            placeholder="Your email"
            name="email"
            type="email"
            id="login-email"
            value={loginState.email}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="******"
            name="password"
            type="password"
            id="login-password"
            value={loginState.password}
            onChange={handleChange}
          />
          <br />
          <button type="submit">Login</button>
          {error && <div>Login Failed.. Try again!</div>}
        </form>
      </div>

    </>
  );
}

