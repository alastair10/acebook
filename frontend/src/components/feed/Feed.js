import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import AddPostForm from '../addPostForm/addPostForm';
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);

  // Hook for token variable, retrieves token from users local storage
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {

    // If there's a token, fetches posts with token for authorization
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts);
        })
    }
  }, [])
    

  // Log out method removes token from user's local storage
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
  // Component block for feed of posts if there's a token (otherwise redirects to /signin)
    if(token) {
      return(
        <div className='container'>
          <h2>Feed</h2>
            <button onClick={logout}>
              Logout
            </button>
          <AddPostForm/>
          <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              )}
          </div>
        </div>
      )
    } else {
      navigate('/signin')
    }
}

export default Feed;