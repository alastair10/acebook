import { Link } from 'react-router-dom';
import React from 'react';
import './Navbar.css';


const navbar = () =>{ 
  return (
    <div className='Navbar'>
        <li>
            <Link ClassName='Link' to="/login">Sign out</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Sign in</Link>
        </li>
    </div>
    );
  }
  
export default navbar;
