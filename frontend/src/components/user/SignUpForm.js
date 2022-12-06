import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState("");
  const [hometown, setHometown] = useState("");
  const [occupation, setOccupation] = useState("");
  const [relationship_status, setRelationshipStatus] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, full_name: full_name, bio: bio, birthday: birthday, hometown: hometown, occupation: occupation, relationship_status: relationship_status })
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

  const handleBioChange = (event) => {
    setBio(event.target.value)
  }  

  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value)
  }
  
  const handleHometownChange = (event) => {
    setHometown(event.target.value)
  }  

  const handleOccupationChange = (event) => {
    setOccupation(event.target.value)
  }

  const handleRelationshipStatusChange = (event) => {
    setRelationshipStatus(event.target.value)
  }

    return (
      <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input placeholder="e.g. name@address.com" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <label>Password</label>
          <input placeholder="X characters minimum" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <label>Full Name</label>
          <input placeholder="Full Name" id="full_name" type='text' value={ full_name } onChange={handleFullNameChange} />
          <label>Bio</label>
          <input placeholder="Describe yourself in three words" id="bio" type='text' value={ bio } onChange={handleBioChange} />
          <label>Birthday</label>
          <input id="birthday" type='date' value={ birthday } onChange={handleBirthdayChange} />
          <label>Hometown</label>
          <input placeholder="Hometown" id="hometown" type='text' value={ hometown } onChange={handleHometownChange} />
          <label>Occupation</label>
          <input placeholder="Occupation" id="occupation" type='text' value={ occupation } onChange={handleOccupationChange} />
          <label>Relationship Status</label>
          <input placeholder="Relationship Status" id="relationship_status" type='text' value={ relationship_status } onChange={handleRelationshipStatusChange} />
        <input id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default SignUpForm;
