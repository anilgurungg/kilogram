import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { signin as userSignIn } from '../redux/actions/userActions';
import Alert from '../components/Alert';
import { CLEAR_ERRORS } from '../redux/types';

const SignIn = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    dispatch({ type: CLEAR_ERRORS });
    e.preventDefault();
    dispatch(userSignIn(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      if (Object.keys(userInfo).length !== 0) {
        props.history.push('/');
      }
    }

    return () => {};
  }, [userInfo]);

  return (
    <>
      <div className='signup-container'>
        <h1 className='heading'>Kilogram</h1>

        <div className='input-fields'>
          <form onSubmit={submitHandler}>
            <input
              id='email'
              name='email'
              className='input-sign'
              type='email'
              placeholder='Your user email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id='password'
              name='password'
              type='password'
              className='input-sign'
              placeholder='Your password'
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type='submit' className='button-signup'>
              Log In
            </button>
          </form>
        </div>

        <span>
          Don't have an account? Signup
          <Link to='/signup'>
            <span style={{ color: '#0095f6' }}> here</span>
          </Link>
        </span>
      </div>
      <Alert />
    </>
  );
};

export default SignIn;
