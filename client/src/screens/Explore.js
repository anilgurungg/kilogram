import React, { useState, useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setPost, setPosts } from '../redux/actions/dataActions';
import PostDailog from '../components/PostDailog';

const Profile = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const {
    userInfo: { _id, name, username, followers, following, pic },
    loading
  } = user;
  const { posts, post } = data;

  useEffect(() => {
    console.log('my posts');
    dispatch(setPosts());
    return () => {};
  }, [post]);

  const dailogHandler = (postId) => {
    console.log('dialog open');
    dispatch(setPost(postId));
    setOpen(true);
  };

  const isEmpty = (inputObject) => {
    return Object.keys(inputObject).length === 0;
  };

  return loading ? (
    <h1> Loading..</h1>
  ) : (
    <>
      <hr className='divider' />
      <div className='explore-gallery'>
        {posts.map((p) => (
          <img
            key={p._id}
            src={p.photo}
            className='explore-item'
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
  );
};

export default Profile;
