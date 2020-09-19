import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import AddPost from '../components/AddPost';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setSubPosts } from '../redux/actions/dataActions';
import NoContent from '../components/NoContent';

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const { posts } = data;
  const UI = useSelector((state) => state.UI);
  const { loading } = UI;

  useEffect(() => {
    dispatch(setSubPosts());
  }, []);

  let postsMarkup = !loading ? (
    posts.length > 0 ? (
      posts.map((post) => <Post key={post._id} post={post} />)
    ) : (
      <NoContent />
    )
  ) : (
    <p>Loading</p>
  );

  return (
    <>
      <AddPost />
      {postsMarkup}
    </>
  );
};

export default Home;
