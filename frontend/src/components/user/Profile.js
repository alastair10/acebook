import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import ProfileFeed from './ProfileFeed'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

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
    if (id) {
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
    }
  }, [id])

  return (
    <div className="container">
      <div className="bio">
        <h2>{userName}'s Profile</h2>
        <p><strong>Hometown:</strong> {userHomeTown}</p>
        <p><strong>Bio:</strong> {userBio}</p>
        <p><strong>Birthday:</strong> {userBirthday}</p>
        <p><strong>Occupation:</strong> {userOccupation}</p>
        <p><strong>Relationship Status:</strong> {userRelationshipStatus}</p>
        <p><strong>Joined Acebook:</strong> {userJoinedDate}</p>
      </div>
      <ProfileFeed user_id={id} userName={userName}  />
    </div>
  );
} 


export default Profile;

