import React from 'react';
// redux
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions/dataActions';
// mui ions
import Like from '@material-ui/icons/FavoriteBorder';
import Unlike from '@material-ui/icons/Favorite';

const LikeButton = ({ post, userId }) => {
  const dispatch = useDispatch();
  const { likes } = post;

  const likeHandler = () => {
    console.log('like button clicked');
    dispatch(likePost(post._id));
  };

  const unlikeHandler = () => {
    console.log('unlike button clicked');
    dispatch(unlikePost(post._id));
  };

  let likeBtn;
  if (!likes.includes(userId)) {
    likeBtn = <Like onClick={likeHandler} className='like-btn' />;
  } else {
    likeBtn = <Unlike onClick={unlikeHandler} className='unlike-btn' />;
  }

  return <>{likeBtn} </>;
};

export default LikeButton;
