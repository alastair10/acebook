import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import ProfileFeed from './ProfileFeed'

const Profile = ({ navigate }) => {

  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userName, setUserName] = useState('');
  const [userHomeTown, setUserHomeTown] = useState('');
  const [userBio, setUserBio] = useState('');
  const [userBirthday, setUserBirthday] = useState('');
  const [userRelationshipStatus, setUserRelationshipStatus] = useState('');
  const [userOccupation, setUserOccupation] = useState('');
  const [userJoinedDate, setUserJoinedDate] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetch("/users/" + id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => response.json())
      .then((data) => {
        setUserName(data.full_name)
        setUserHomeTown(data.hometown)
        setUserBio(data.bio)
        setUserBirthday(data.birthday)
        setUserRelationshipStatus(data.relationship_status)
        setUserOccupation(data.occupation)
        setUserJoinedDate(data.joined)
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
      })
  })




  return (
    <div className="container">
      <h2>{userName}'s Profile</h2>
      <p>Hometown: {userHomeTown}</p>
      <p>Bio: {userBio}</p>
      <p>Birthday: {userBirthday}</p>
      <p>Occupation: {userOccupation}</p>
      <p>Relationship Status: {userRelationshipStatus}</p>
      <p>Join date: {userJoinedDate}</p>
      <ProfileFeed user_id={id} userName={userName}  />
    </div>
  );
} 



export default Profile;

