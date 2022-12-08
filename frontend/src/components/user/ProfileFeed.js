import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import AddPostForm from '../addPostForm/addPostForm';
import '../feed/Feed.css';

const ProfileFeed = ({ navigate, user_id }) => {
  const [posts, setPosts] = useState([]);
  const [isUpdated, setIsUpdated] = useState(true)
  // Hook for token variable, retrieves token from users local storage
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    // If there's a token, fetches posts with token for authorization
    if(token && (isUpdated)) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(async data => {
          setPosts(data.posts.reverse())
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setIsUpdated(false)
        })
    }
  }, [token, posts, isUpdated])

  // Component block for feed of posts if there's a token (otherwise redirects to /signin)
  if (token) {
    return (
      <div className="container">
        <h2>Posts</h2>
        <AddPostForm callback = {(value) => {setIsUpdated(value)}}/>
        <div id="feed" role="feed">
          {posts.filter(post => post.user_id._id === user_id).map((post) => (
            <Post post={post} key={post._id} callback = {(value) => {setIsUpdated(value)}} />
          ))}
        </div>
      </div>
    );
  } else {
    navigate("/login");
  }
};

export default ProfileFeed;
