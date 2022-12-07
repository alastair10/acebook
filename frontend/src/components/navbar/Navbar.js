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
        <Link className="Link" to={`users/${user_id}`}>
          Profile
        </Link>
        <Link className="Link" to="/posts">
          Feed
        </Link>
        <button className="Link" onClick={signout}>
          Sign out
        </button>
      </>
    );
  } else {
    buttons = (
      <>
        <Link className="Link" to="/signup">
          Sign up
        </Link>
        <Link className="Link" to="/login">
          Sign in
        </Link>
      </>
    );
  }

  return (
    <nav className="Navbar">
      <div>{buttons}</div>
    </nav>
  );
};

export default navbar;
