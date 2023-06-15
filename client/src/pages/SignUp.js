import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import './SignUp.css';


export default function SignUp() {
  const [signUpState, setSignUpState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignUpState({
      ...signUpState,
      [name]: value
    });
  };

  // submit form
  const handleSignUp = async event => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...signUpState }
      });

      // when login is successful, User is directed to homepage
      Auth.login(data.addUser.token);
      // Navigate('/home')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="signup-container">
        <h1>Sign Up to Keep Your Friends Closer!</h1>
        <form onSubmit={handleSignUp}>
              <input
                className="form-input"
                placeholder="uSeRnAmE"
                name="username"
                type="username"
                id="signup-username"
                value={signUpState.username}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Yours@email.com"
                name="email"
                type="email"
                id="signup-email"
                value={signUpState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="signup-password"
                value={signUpState.password}
                onChange={handleChange}
              />
          <button type="submit" onSubmit={handleSignUp}>Sign Up</button>
        </form>
        {error && <div>Every field is required</div>}
      </div>
    </>
  );
}