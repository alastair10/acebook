import { Link } from "react-router-dom";
import React from "react";
import "./Navbar.css";

const navbar = ({ navigate }) => {
  // Log out method removes token from user's local storage
  const signout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user_id");
    navigate("/login");
  };

  const user_id = window.localStorage.getItem("user_id");

  let buttons;
  if (user_id) {
    buttons = (
      <>
        <Link className="link" to={`users/${user_id}`}>
          Profile
        </Link>
        <Link className="link" to="/posts">
          Feed
        </Link>
        <button className="link" onClick={signout}>
          Sign out
        </button>
      </>
    );
  } else {
    buttons = (
      <>
        <Link className="link" to="/signup">
          Sign up
        </Link>
        <Link className="link" to="/login">
          Sign in
        </Link>
      </>
    );
  }

  return (
    <nav className="navbar">
      <div>{buttons}</div>
    </nav>
  );
};

export default navbar;
