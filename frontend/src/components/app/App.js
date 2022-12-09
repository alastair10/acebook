import NavBar from '../navbar/Navbar';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../user/SignUpForm';
import Profile from '../user/Profile';
import React from 'react';
import Feed from '../feed/Feed';
import { useNavigate, Navigate, Routes, Route } from 'react-router-dom';

const App = () => {
  const isLoggedIn = window.localStorage.getItem('token');
  return (
    <>
      <NavBar navigate={useNavigate()} />
      <Routes>
        <Route
          path='/'
          element={
            isLoggedIn ? <Navigate to='/posts' /> : <Navigate to='/login' />
          }
        />
        <Route path='/posts' element={<Feed navigate={useNavigate()} />} />
        <Route path='/login' element={<LoginForm navigate={useNavigate()} />} />
        <Route
          path='/users/:id'
          element={<Profile navigate={useNavigate()} />}
        />
        <Route
          path='/signup'
          element={<SignUpForm navigate={useNavigate()} />}
        />
      </Routes>
    </>
  );
};

export default App;
