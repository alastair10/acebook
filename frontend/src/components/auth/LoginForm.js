import React, { useState } from 'react';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Sends post request to /tokens with email and password
    let response = await fetch('/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status !== 201) {
      navigate('/login');
    } else {
      let data = await response.json();

      // Stores token and user_id in users local storage (if app is refreshed token is still accessible)
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('user_id', data.user_id);
      navigate('/posts');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className='container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          placeholder='e.g. name@address.com'
          id='email'
          type='text'
          value={email}
          onChange={handleEmailChange}
        />
        <label>Password</label>
        <input
          placeholder='make a secure password'
          id='password'
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          className='login-form-submit'
          id='submit'
          type='submit'
          value='Submit'
        />
      </form>
    </div>
  );
};

export default LogInForm;
