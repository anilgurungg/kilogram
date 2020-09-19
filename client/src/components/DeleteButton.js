import React from 'react';
// redux
import { useDispatch } from 'react-redux';
import { deletePost } from '../redux/actions/dataActions';
import Delete from '@material-ui/icons/DeleteOutlineOutlined';

const DeleteButton = ({ post, userId }) => {
  const dispatch = useDispatch();
  const deleteHandler = () => {
    console.log('delete button');
    dispatch(deletePost(post._id));
  };

  const deleteBtn = post.postedBy._id === userId && (
    <Delete className='delete-btn' onClick={deleteHandler} />
  );

  return <>{deleteBtn}</>;
};

export default DeleteButton;
