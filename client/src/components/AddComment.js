import React, { useState } from 'react';
// redux
import { addComment } from '../redux/actions/dataActions';
import { useDispatch } from 'react-redux';

const AddComment = ({ post: { _id } }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const postHandler = () => {
    dispatch(addComment(text, _id));
    setText('');
  };

  return (
    <div style={{ display: 'flex' }}>
      <input
        // id='text'
        autoComplete='off'
        name='text'
        type='text'
        placeholder='Write a comment'
        className='post-input'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className='post-btn' onClick={postHandler}>
        Post
      </button>
    </div>
  );
};

export default AddComment;
