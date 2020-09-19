const express = require('express');
const router = express();
const mongoose = require('mongoose');
const isAuth = require('../middleware/isAuth');
const User = mongoose.model('User');
const Post = mongoose.model('Post');

// // get user
// router.get('/', isAuth, (req, res) => {
//   User.findOne({ _id: req.user._id })
//     .select('-password')
//     .then((user) => res.json({ user }))

//     .catch((err) => res.status(422).json({ error: err }));
// });

// get user by id
router.get('/:id', isAuth, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select('-password')
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate('postedBy', '_id name')
        .then((posts) => res.json({ user, posts }))
        .catch((err) => res.status(422).json({ error: err }));
    });
});

// follow user
router.put('/:id/follow', isAuth, (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $push: { followers: req.user._id } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }

      User.findByIdAndUpdate(
        req.user._id,
        { $push: { following: req.params.id } },
        { new: true }
      )
        .select('-password')
        .then((result) => res.json(result))
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

// follow user
router.put('/:id/unfollow', isAuth, (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $pull: { followers: req.user._id } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }

      User.findByIdAndUpdate(
        req.user._id,
        { $pull: { following: req.params.id } },
        { new: true }
      )
        .select('-password')
        .then((result) => res.json(result))
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

// update pic
router.put('/updatepic', isAuth, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { pic: req.body.pic } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: 'Cannot post pic' });
      }
      res.json(result);
    }
  ).select('-password');
});

//search users
router.post('/search', isAuth, (req, res) => {
  let userPattern = new RegExp('^' + req.body.query);
  User.find({ email: { $regex: userPattern } })
    .select('_id email')
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
