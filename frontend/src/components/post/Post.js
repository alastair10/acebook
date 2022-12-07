import React, { useState } from "react";
import "./Post.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Post = ({ post, callback }) => {
  const [details, setDetails] = useState(false);
  const [isLiked, toggleIsLiked] = useState(false);

  const btnClassName = details ? "post-full-text" : "post-less-text";

  const handleClick = async () => {
    toggleIsLiked((prevState => !prevState));

    const user_id = window.localStorage.getItem("user_id");
    const token = window.localStorage.getItem("token");

    if (user_id) {
      let response = await fetch(`/posts/${post._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isLiked, user_id }),
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
      <div className="post-header">
        <img
          className="user-icon"
          alt="user-icon"
          src="./avatars/avatar_1.png"
        />
        <div className="post-header-info">
          <p>User Name</p>
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
        <button className="btn-details" onClick={handleClick}>
          {isLiked ? (
            <img
              className="img_likes"
              src="../heart_full.svg"
              alt="full heart"
            />
          ) : (
            <img
              className="img_likes"
              src="../heart_empty.svg"
              alt="empty heart"
            />
          )}
        </button>
        <span>{post.likes.length} </span>

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
