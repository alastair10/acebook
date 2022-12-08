import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import './Profile.css';
import ProfileFeed from './ProfileFeed'

const Profile = ({ navigate }) => {
  const user_id = window.localStorage.getItem("user_id");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userProfilePic, setUserProfilePic] = useState('');
  const [userName, setUserName] = useState('');
  const [userHomeTown, setUserHomeTown] = useState('');
  const [userBio, setUserBio] = useState('');
  const [userBirthday, setUserBirthday] = useState('');
  const [userRelationshipStatus, setUserRelationshipStatus] = useState('');
  const [userOccupation, setUserOccupation] = useState('');
  const [userJoinedDate, setUserJoinedDate] = useState('');
  const { id } = useParams();

  const handleFriendClick = async () => {
    if (user_id) {
      let response = await fetch(`/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({type: "friends", user_id})
      });

      const data = await response.json();

      if (response.status !== 202) {
        console.log(data.error);
      } 
    }
  }

  useEffect(() => {
    if (id) {
      fetch("/users/" + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => response.json())
        .then((data) => {
          setUserProfilePic(data.profile_pic)
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
      <img
          className='user-pic'
          alt='user-pic'
          src={userProfilePic}
        />
      <h2>{userName}'s Profile</h2>
    
      {user_id !== id && <button className="btn-details" onClick={handleFriendClick}>Add Friend</button>}

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

