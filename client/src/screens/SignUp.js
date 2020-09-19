import React, { useState, useEffect } from 'react';
// mui
import { Link } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/actions/userActions';
import Alert from '../components/Alert';
import { CLEAR_ERRORS } from '../redux/types';

const SignUp = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { success } = user;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (success) {
      props.history.push('/signin');
    }

    return () => {};
  }, [success]);

  const onSubmit = (e) => {
    dispatch({ type: CLEAR_ERRORS });
    e.preventDefault();
    dispatch(signup(email, name, username, password));
  };

  return (
    <div className='signup-container'>
      <h1 className='heading'>Kilogram</h1>
      <span className='signup-subtext'>
        Sign up to see photos and videos from your friends.
      </span>
      <div className='input-fields'>
        <form onSubmit={onSubmit}>
          <input
            id='email'
            name='email'
            className='input-signup'
            type='email'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id='name'
            name='name'
            className='input-signup'
            type='text'
            placeholder='Full Name'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            id='username'
            name='username'
            className='input-signup'
            type='text'
            placeholder='User Name'
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            id='password'
            name='password'
            className='input-signup'
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' className='button-signup'>
            Sign Up
          </button>
        </form>
      </div>

      <span>
        Have an account? Signin
        <Link to='/signin'>
          <span style={{ color: '#0095f6' }}> here</span>
        </Link>
      </span>
      <Alert />
    </div>
  );
};

export default SignUp;
