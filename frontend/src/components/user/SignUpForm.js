import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState("");
  const [hometown, setHometown] = useState("");
  const [occupation, setOccupation] = useState("");
  const [joined_date, setJoinedDate] = useState("");
  const [relationship_status, setRelationshipStatus] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, full_name: full_name, bio: bio, birthday: birthday, hometown: hometown, occupation: occupation, joined_date: joined_date, relationship_status: relationship_status })
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

  const handleJoinedDateChange = (event) => {
    setJoinedDate(event.target.value)
  }

  const handleRelationshipStatusChange = (event) => {
    setRelationshipStatus(event.target.value)
  }

    return (
      <form onSubmit={handleSubmit}>
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <input placeholder="Full Name" id="full_name" type='text' value={ full_name } onChange={handleFullNameChange} />
          <input placeholder="Bio" id="bio" type='text' value={ bio } onChange={handleBioChange} />
          <input placeholder="Birthday" id="birthday" type='date' value={ birthday } onChange={handleBirthdayChange} />
          <input placeholder="Hometown" id="hometown" type='text' value={ hometown } onChange={handleHometownChange} />
          <input placeholder="Occupation" id="occupation" type='text' value={ occupation } onChange={handleOccupationChange} />
          <input placeholder="Joined Date" id="joined_date" type='date' value={ joined_date } onChange={handleJoinedDateChange} />
          <input placeholder="Relationship Status" id="relationship_status" type='text' value={ relationship_status } onChange={handleRelationshipStatusChange} />
        <input id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default SignUpForm;
