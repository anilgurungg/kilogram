import React, { useState, useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  getUser,
  followUser,
  unfollowUser
} from '../redux/actions/userActions';
import { setPost } from '../redux/actions/dataActions';
import PostDailog from '../components/PostDailog';

const User = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const userState = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const UI = useSelector((state) => state.UI);
  const {
    otherUser,

    userInfo: { _id }
  } = userState;
  const { loading } = UI;

  const { post } = data;

  const dailogHandler = (postId) => {
    console.log('dialog open');
    dispatch(setPost(postId));
    setOpen(true);
  };

  const isEmpty = (inputObject) => {
    return Object.keys(inputObject).length === 0;
  };

  const followHandler = () => {
    console.log('follow');
    dispatch(followUser(props.match.params.userId, _id));
  };

  const unfollowHandler = () => {
    dispatch(unfollowUser(props.match.params.userId, _id));
  };

  useEffect(() => {
    console.log('useEffect called');
    dispatch(getUser(props.match.params.userId));

    return () => {};
  }, []);

  return (
    // !loading &&
    !isEmpty(otherUser) && (
      <>
        <div className='profile-info'>
          <div className='profile-image-container'>
            <img src={otherUser.user.pic} className='profile-image' />
          </div>
          <div className='profile-data'>
            <div style={{ display: 'flex' }}>
              <h1 style={{ fontWeight: '10', marginRight: '1em' }}>
                {otherUser.user.username}
              </h1>

              {!otherUser.user.followers.includes(_id) ? (
                <button
                  className='button'
                  style={{
                    marginRight: 'auto',
                    background: '#23ba0f',
                    width: '6em'
                  }}
                  onClick={followHandler}
                >
                  <b>Follow</b>
                </button>
              ) : (
                <button
                  className='button'
                  style={{
                    marginRight: 'auto',
                    background: '#bf2915',
                    width: '6em'
                  }}
                  onClick={unfollowHandler}
                >
                  <b>Unfollow</b>
                </button>
              )}
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
                <b>{otherUser.posts.length}</b> posts
              </span>
              <span>
                <b>
                  {otherUser.user.followers ? (
                    otherUser.user.followers.length
                  ) : (
                    <p>loading..</p>
                  )}{' '}
                </b>
                followers
              </span>
              <span>
                <b>
                  {otherUser.user.following ? (
                    otherUser.user.following.length
                  ) : (
                    <p>loading..</p>
                  )}
                </b>{' '}
                following
              </span>
            </div>
            <b>{otherUser.user.name}</b>
          </div>
        </div>
        <hr className='divider' />
        <div className='gallery'>
          {otherUser.posts.map((p) => (
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
    )
  );
};

export default User;
