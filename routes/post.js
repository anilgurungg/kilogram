const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const isAuth = require('../middleware/isAuth');
const { route } = require('./auth');
const Post = mongoose.model('Post');

// get all posts
router.get('/', isAuth, (req, res) => {
  Post.find({})
    .populate('postedBy', '_id name pic username')
    .populate('comments.postedBy', '_id name pic username')
    .sort('-createdAt')
    .then((posts) => res.json({ posts }))
    .catch((err) => console.log(err));
});

// get sub posts
router.get('/sub', isAuth, (req, res) => {
  Post.find({ postedBy: { $in: req.user.following } })
    .populate('postedBy', '_id name pic username')
    .populate('comments.postedBy', '_id name pic username')
    .sort('-createdAt')
    .then((posts) => res.json({ posts }))
    .catch((err) => console.log(err));
});

// get my posts
router.get('/my', isAuth, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate('postedBy', '_id name pic username')
    .populate('comments.postedBy', '_id name pic username')
    .sort('-createdAt')
    .then((myposts) => res.json({ myposts }))
    .catch((err) => console.log(err));
});

// get one  post
router.get('/:postId', isAuth, (req, res) => {
  Post.findById(req.params.postId)
    .populate('postedBy', '_id name pic username')
    .populate('comments.postedBy', '_id name pic username')
    .then((post) => res.json({ post }))
    .catch((err) => console.log(err));
});

// create post
router.post('/', isAuth, (req, res) => {
  const { body, pic } = req.body;

  if (!body || !pic) {
    return res.status(422).json({ error: 'Please fill all the fields' });
  }
  req.user.password = undefined;
  const post = new Post({
    body,
    photo: pic,
    postedBy: req.user
  });

  post
    .save()
    .then((result) => {
      return res.json({ post: result });
    })
    .catch((err) => console.log(err));
});

// like post
router.put('/:postId/like', isAuth, (req, res) => {
  Post.findByIdAndUpdate(
    req.params.postId,
    { $push: { likes: req.user._id } },
    { new: true }
  )
    .populate('comments.postedBy', '_id name pic username')
    .populate('postedBy', '_id name pic username')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        return res.json({ result });
      }
    });
});

//unlike post
router.put('/:postId/unlike', isAuth, (req, res) => {
  Post.findByIdAndUpdate(
    req.params.postId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate('comments.postedBy', '_id name pic username')
    .populate('postedBy', '_id name pic username')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        return res.json({ result });
      }
    });
});

// comment on a post
router.put('/:postId/comment', isAuth, (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(422).json({ error: 'Please add a comment' });
  }

  const comment = {
    text: req.body.text,
    postedBy: req.user
  };

  Post.findByIdAndUpdate(
    req.params.postId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate('comments.postedBy', '_id name pic username')
    .populate('postedBy', '_id name pic username')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        return res.json({ result });
      }
    });
});

// delete a post
router.delete('/:postId', isAuth, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate('postedBy', '_id')
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }

      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => console.log(err));
      }
    });
});

module.exports = router;
