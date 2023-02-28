const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

const userCount = async () =>
    User.aggregate()
      .count("userCount")
        .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // get all users
  getUsers( req, res ){
    User.find()
    .then(async(users) => {
      const userObj = {
        users,
        userCount: await userCount(),
      };
      return res.json(userObj);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
},
  // get single user by id
  getSingleUser(req, res){
    User.findOne({_id: req.params.id})
    .select("-__v")
    .lean()
    .then(async (user) =>
    !user
      ? res.status(404).json({ message: "User ID does not exist" })
      : res.json({
        user,
      })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
},
  // create a new user
  createUsers(req, res) {
    User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  },
  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { username: req.body.username, email: req.body.email } },
      { new: true, runValidators: true }
    )
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User ID does not exist"});
        return;
      }
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  },
  // delete user (BONUS: and delete associated thoughts)
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id})
    .then((user) => 
    !user 
        ? res.status(404).json({ message: "User does not exist"})
        : Thought.findOneAndUpdate(
          { users: req.params.userId },
          { $pull: { users: req.params.userId } },
          { new: true }
        )
    )
  .then((course) =>
    !course
      ? res.status(404).json({
          message: 'Warning User deleted No thoughts found',
        })
      : res.json({ message: 'Warning User deleted' })
  )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
},

  // add friend to friend list
  addFriendToFriendList(req, res) {
    console.log("Friend successfully added");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
			{ $push: { friends: req.params.friendId } },
      { runValidators: true, new: true },
    )
    .then((user) =>
        !user
          ? res.status(404).json({ message: "User ID does not exist"})
          : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },

  // remove friend from friend list
  removeFriendFromFriendList(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true },
    )
    .then((user) =>
        !user
          ? res.status(404).json({ message: "Friend ID does not exist" })
          : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
};
