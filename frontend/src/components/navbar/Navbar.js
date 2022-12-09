import { Link } from 'react-router-dom';
import React from 'react';

const navbar = ({ navigate }) => {
  // Log out method removes token from user's local storage
  const signout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user_id');
    navigate('/login');
  };

  const user_id = window.localStorage.getItem('user_id');

  let buttons;
  if (user_id) {
    buttons = (
      <>
        <Link className='link-navbar' to={`users/${user_id}`}>
          Profile
        </Link>
        <Link className='link-navbar' to='/posts'>
          Feed
        </Link>
        <button className='link-navbar' onClick={signout}>
          Sign out
        </button>
      </>
    );
  } else {
    buttons = (
      <>
        <Link className='link-navbar' to='/signup'>
          Sign up
        </Link>
        <Link className='link-navbar' to='/login'>
          Sign in
        </Link>
      </>
    );
  }

  return (
    <nav className='navbar'>
      <div className='logo-container'>
        <img className='logo' src='../apple-touch-icon.png' alt='Acebook blue card logo' />
      </div>
      <div>{buttons}</div>
    </nav>
  );
};

export default navbar;
