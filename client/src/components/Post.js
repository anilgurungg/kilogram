import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// mui icons
import Comment from '@material-ui/icons/ModeCommentOutlined';
// components
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import AddComment from './AddComment';

const Post = ({ post }) => {
  const { body, photo, postedBy, likes, comments } = post;

  const user = useSelector((state) => state.user);
  const { userInfo, loading } = user;

  return (
    !loading && (
      <div className='post'>
        <div className='post-user'>
          <Link
            to={
              postedBy._id === userInfo._id
                ? '/profile'
                : `/user/${postedBy._id}`
            }
            className='post-profileimg'
          >
            <img src={postedBy.pic} alt='profile' className='post-profileimg' />
          </Link>
          <Link
            to={
              postedBy._id === userInfo._id
                ? '/profile'
                : `/user/${postedBy._id}`
            }
            style={{ marginRight: 'auto' }}
          >
            <span>{postedBy.name}</span>
          </Link>
          <DeleteButton post={post} userId={userInfo._id} />
        </div>
        <img src={photo} alt='post' className='post-image' />
        <div>
          <LikeButton post={post} userId={userInfo._id} />
          <Comment className='cmnt-btn' />
        </div>
        <span className='post-info'>
          <b>{likes.length} likes</b>
        </span>
        <span className='post-info'>
          <b> {postedBy.username} </b> {body}
        </span>
        <div className='post-comments'>
          {comments &&
            comments.map((comment) => (
              <Fragment key={comment._id}>
                <b>{comment.postedBy.username}</b> {comment.text} <br />
              </Fragment>
            ))}
        </div>
        <hr className='divider' />
        <AddComment post={post} />
      </div>
    )
  );
};

export default Post;
