import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");



  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, full_name: full_name })
    })
      .then(response => {
        if(response.status === 201) {
          // Opportunity to call a register hook that stores JWT and logs user in automatically
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleFullNameChange = (event) => {
    setFullName(event.target.value)
  }  


    return (
      <form onSubmit={handleSubmit}>
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <input placeholder="Full Name" id="full_name" type='text' value={ full_name } onChange={handleFullNameChange} />
        <input id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default SignUpForm;
