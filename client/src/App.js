import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { USER } from './redux/types';
import axios from 'axios';

// pages
import Home from './screens/Home';
import Profile from './screens/Profile';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Explore from './screens/Explore';
import User from './screens/User';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import PageNotFound from './components/PageNotFound';

const Routing = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token;

  if (!token) {
    history.push('/signin');
  }

  useEffect(() => {
    if (token) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo) {
        dispatch({ type: USER, payload: userInfo });
      }
    }
    return () => {};
  }, []);
  return (
    <Switch>
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <Route exact path='/' component={Home} />
      <Route path='/profile' component={Profile} />

      <Route path='/explore' component={Explore} />
      <Route path='/user/:userId' component={User} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className='container'>
          <Alert />
          <Routing />
        </div>
      </Router>
    </>
  );
}

export default App;
