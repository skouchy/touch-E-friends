import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/Auth';
import Footer from '../components/Footer'
// import Navbar from '../components/Navbar';
import "./Login.css"

export default function Login() {
  const[loginState, setLoginState] = useState({ email: '', password: ''});
  // const navigate = useNavigate();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [login, {error}] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginState({
      ...loginState,
      [name] : value
    });
  };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  const handleLoginForm = async event => {
    event.prevent.default();

    try {
      const { data } = await login({
        // setting variables field to be an object with key/value pairs
        variables: { ...loginState }
      });
      console.log(data);
      console.log('user successfully logged in!');
      // when log in is successful, User is directed to homepage
      Auth.login(data.login.token);
    } catch(error) {
      console.error(error);
    }
    // Perform login logic here, e.g., API call to validate credentials
    // If successful, navigate to the next page using navigate('/next-page')
    // navigate('/address');
  };


  return (
    <>
      {/* <Navbar /> */}
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
        </form>
        {error && <div>Login Failed.. Try again!</div>}
      </div>
      <Footer/>
    </>
  );
}

