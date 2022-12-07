import React, { useState } from "react";
import "./Post.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";

const Post = ({ post, callback }) => {
  const [details, setDetails] = useState(false);
  // const [likes, toggleLikes] = useState(false);
  /*in CSS we have 2 classes to button, and here we can
   *change class every time then click the button
   */
  const btnClassName = details ? "post-full-text" : "post-less-text";

  // postman for making posts

  // create a user email and password
  // returns user_id and token (e.g.something like 234t514tq4t.4tq4t3q4tqqt.q4tqwt3t4qwt)

  // then login with these details

  // POST /posts send req.body {message: ?}
  // returns {message: ok, token: token}

  const handleClick = async () => {
    // If there's a token, fetches posts with token for authorization
    const user_id = window.localStorage.getItem("user_id");
    const token = window.localStorage.getItem("token");

    if (user_id) {
      console.log(post._id);
      let response = await fetch(`/posts/${post._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ likes: user_id }),
      });
      const data = await response.json();
      if (response.status !== 202) {
        // const data = await response.json()
        console.log(data.error);
        // console.log("error with post adding")
      } else {
        callback(true);
      }
    }
  };

  return (
    <div className="post">
      {/* post section start
       * each post inclide:
       * header: user icon, user name (w/link to profile) and timestamp,
       * body: article with post text,
       * footer: likes and comments buttons
       * comments block after footer
       */}
      <div className="post-header">
        <img
          className="user-icon"
          alt="user-icon"
          src="./avatars/avatar_1.png"
        />
        {/* <img className='user-icon' alt="user-icon" src='./user-icon.png'/> */}
        <div className="post-header-info">
          <Link className="Link" to="/users/${}">
            User name
          </Link>
          {/* npm package used to format the date/time */}
          <label>
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </label>
        </div>
      </div>
      <div className="post-body">
        <article className={btnClassName} data-cy="post" key={post._id}>
          {post.message}
        </article>
      </div>
      <div className="post-footer">
        <span>Likes: {post.likes.length} </span>
        <button className="btn-details" onClick={handleClick}>
          Like
        </button>

        {/* .show button only if length more then 4 lines of text */}
        {post.message.length > 390 && (
          <button
            className="btn-details"
            onClick={() => setDetails((prev) => !prev)}
          >
            {details ? "Show less..." : "Show more..."}
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
