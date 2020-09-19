import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import Comment from '@material-ui/icons/ModeCommentOutlined';
import AddComment from './AddComment';

const PostDailog = ({ open, onClose, post, userId }) => {
  const { _id, body, photo, postedBy, likes, comments } = post;
  return (
    <Dialog open={open} onClose={onClose} maxWidth='xl'>
      <div className='post-dailog'>
        <div className='post-dailog-image-container'>
          <img src={post.photo} className='post-dailog-image' />
        </div>
        <div className='post-dailog-info'>
          <div className='post-dailog-user'>
            <Link
              to={
                postedBy._id === userId ? '/profile' : `/user/${postedBy._id}`
              }
              className='post-profileimg'
            >
              <img
                src={postedBy.pic}
                alt='profile'
                className='post-profileimg'
              />
            </Link>
            <Link
              to={
                postedBy._id === userId ? '/profile' : `/user/${postedBy._id}`
              }
              style={{ marginRight: 'auto' }}
            >
              <span>{postedBy.name}</span>
            </Link>
            <DeleteButton post={post} userId={userId} />
          </div>

          <span className='post-info'>
            <b> {postedBy.username} </b> {body}
          </span>
          <div className='post-dialog-comments'>
            {comments.map((comment) => (
              <Fragment key={comment._id}>
                <b>{comment.postedBy.username}</b> {comment.text} <br />
              </Fragment>
            ))}
          </div>
          <div className='post-dailog-buttons'>
            <LikeButton
              post={post}
              userId={userId}
              style={{ marginRight: '0.8em' }}
            />
            <Comment className='cmnt-btn' style={{ marginRight: '1em' }} />
            <span>
              <b>{likes.length} likes</b>
            </span>
          </div>

          <hr className='divider' />
          <AddComment post={post} />
        </div>
      </div>
    </Dialog>
  );
};

export default PostDailog;
