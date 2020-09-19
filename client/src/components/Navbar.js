import React from 'react';
import { Link } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
// mui
import Home from '@material-ui/icons/HomeOutlined';
import Explore from '@material-ui/icons/ExploreOutlined';
import Profile from '@material-ui/icons/AccountCircleOutlined';
import SearchUsers from './SearchUsers';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const { authenticated } = user;
  return (
    <div className='nav-container'>
      <Link to={authenticated ? '/' : '/signin'}>
        <h1 className='logo'>Kilogram</h1>
      </Link>
      {authenticated && <SearchUsers />}
      <div className='nav-buttons-container'>
        {authenticated ? (
          <>
            <Link to='/'>
              <Home />
            </Link>

            <Link to='/explore' className='nav-buttons'>
              <Explore />
            </Link>

            <Link to='/profile' className='nav-buttons'>
              <Profile />
            </Link>
          </>
        ) : (
          <>
            <Link to='/signup'>
              <span className='nav-link'>Sign Up</span>
            </Link>
            <Link to='/signin'>
              <span className='nav-link'>Log In</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
