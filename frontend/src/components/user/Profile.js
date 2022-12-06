import React, { useState } from 'react';

const Profile = ({ navigate }) => {

  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState('');

  fetch("/users/:id", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => response.json())
    .then(async data => {
      setUser(data.user)
    })

console.log(user)

  return (
    <div className="container">
      <h2>'s Profile</h2>


    </div>
  );
} 



export default Profile;

