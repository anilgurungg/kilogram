import React, { useState, useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { logout, changeProfilePic } from '../redux/actions/userActions';
import { setMyPosts, setPost } from '../redux/actions/dataActions';
import PostDailog from '../components/PostDailog';

const Profile = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');

  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const {
    userInfo: { _id, name, username, followers, following, pic },
    loading
  } = user;
  const { myPosts, post } = data;

  useEffect(() => {
    console.log('my posts');
    dispatch(setMyPosts());
    return () => {};
  }, [post]);

  const logoutHandler = () => {
    dispatch(logout());
    props.history.push('/signin');
  };

  const dailogHandler = (postId) => {
    console.log('dialog open');
    dispatch(setPost(postId));
    setOpen(true);
  };

  const isEmpty = (inputObject) => {
    return Object.keys(inputObject).length === 0;
  };

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'kilogram');
      data.append('cloud_name', 'deoyk5y9w');
      fetch('https://api.cloudinary.com/v1_1/deoyk5y9w/image/upload', {
        method: 'post',
        body: data
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch(changeProfilePic(data.url));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  return !loading ? (
    <>
      <div className='profile-info'>
        <div className='profile-image-container'>
          <img src={pic} className='profile-image' />
        </div>
        <div className='profile-data'>
          <div style={{ display: 'flex' }}>
            <h1 style={{ fontWeight: '10', marginRight: '1em' }}>{username}</h1>
            <button
              className='button'
              style={{ marginRight: 'auto' }}
              onClick={() => document.getElementById('change-pic').click()}
            >
              <b>Edit Pic</b>
            </button>
            <input
              type='file'
              name='pic'
              id='change-pic'
              hidden
              onChange={(e) => updatePhoto(e.target.files[0])}
            />
            <button
              className='button'
              style={{ background: 'red' }}
              onClick={logoutHandler}
            >
              <b>Logout</b>
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '50%',
              marginTop: '-1em',
              marginBottom: '1em'
            }}
          >
            <span>
              <b>{myPosts.length}</b> posts
            </span>
            <span>
              <b>{followers ? followers.length : <p>loading..</p>} </b>
              followers
            </span>
            <span>
              <b>{following ? following.length : <p>loading..</p>}</b> following
            </span>
          </div>
          <b>{name}</b>
        </div>
      </div>
      <hr className='divider' />
      <div className='gallery'>
        {myPosts.map((p) => (
          <img
            key={p._id}
            src={p.photo}
            className='item'
            onClick={() => dailogHandler(p._id)}
          />
        ))}
      </div>
      {!isEmpty(post) && (
        <PostDailog
          open={open}
          onClose={() => setOpen(false)}
          post={post}
          userId={_id}
        />
      )}
    </>
  ) : (
    <p> Loading..</p>
  );
};

export default Profile;
