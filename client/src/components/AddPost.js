import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../redux/actions/dataActions';
// mui
import Dialog from '@material-ui/core/Dialog';

const AddPost = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (url) {
      dispatch(createPost(body, url));
    }
    return () => {};
  }, [url]);

  const submitHandler = () => {
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
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
  };

  return (
    <>
      <button
        className='button'
        style={{ width: '10%', margin: '1em auto 0 auto' }}
        onClick={() => setOpen(true)}
      >
        Add post
      </button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setBody('');
        }}
      >
        <div className='post-add'>
          <h2 className='post-add-title'>Add Post</h2>

          <input
            id='body'
            name='body'
            value={body}
            type='text'
            placeholder={`What's on your mind?`}
            autoComplete='off'
            className='post-add-input'
            onChange={(e) => setBody(e.target.value)}
          />

          <input
            id='url'
            name='url'
            type='file'
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            className='button'
            style={{ width: '40%', margin: '2em auto' }}
            onClick={() => submitHandler()}
          >
            Submit
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default AddPost;
