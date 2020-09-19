import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
// mui
import Dialog from '@material-ui/core/Dialog';
import Search from '@material-ui/icons/Search';

const SearchUsers = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [userDetails, setUserDetails] = useState([]);

  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const inputHandler = async (input) => {
    setQuery(input);
    const { data } = await axios.post('/api/user/search', { query });
    setUserDetails(data.user);
  };

  const closeHandler = () => {
    setQuery('');
    setUserDetails([]);
    setOpen(false);
  };

  return (
    <>
      <Search onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} />

      <Dialog open={open} onClose={closeHandler}>
        <div className='search-modal'>
          <input
            type='text'
            value={query}
            name='query'
            className='search-bar'
            placeholder='Search using email'
            autoComplete='off'
            onChange={(e) => inputHandler(e.target.value)}
          />
          <div className='search-results'>
            {userDetails.length > 0 ? (
              userDetails.map((user) => (
                <div key={user._id}>
                  <a
                    href={
                      user._id === userInfo._id
                        ? `/profile`
                        : `/user/${user._id}`
                    }
                    onClick={closeHandler}
                  >
                    {user.email}
                  </a>
                </div>
              ))
            ) : (
              <span style={{ textAlign: 'center' }}>Empty</span>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SearchUsers;
