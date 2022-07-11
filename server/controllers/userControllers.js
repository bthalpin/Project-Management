const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { signToken } = require('../utils/auth');

module.exports = {
    // Get a user
  async login(req, res) {
    console.log(req,'login')
    try {

        const user = await User.findOne({email: req.body.email })
        if (!user){
            res.status(404).json({ message: 'No user with that ID' })
            return
        }
        const correctPw = await user.isCorrectPassword(req.body.password)
    
        if(!correctPw){
            res.status(404).json('Invalid password')
            return
        }
        const token = signToken(user)
        res.json({token,user})

    } catch (err) {
        res.status(500).json(err)
    }
  },
  getUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  async createUser(req, res) {
    try {
      const user = await  User.create(req.body)
      console.log(user)
      const token = signToken(user)
      console.log(token)
      res.json({token,user})
    } catch (err) {
      res.status(500).json(err)

    }
   
  },
  // Delete a user
  deleteuser(req, res) {
    user.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : user.find().then((users) => res.json(users))
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  updateuser(req, res) {
    user.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
