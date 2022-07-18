const { Message } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  // Get all Message
  getMessages(req, res) {
    Message.find({$or:[{sender:ObjectId(req.body.userId)},{recipient:ObjectId(req.body.userId)}]})
      .then((messages) => res.json(messages))
      .catch((err) => res.status(500).json(err));
  },
  // Get a Message
  getSingleMessage(req, res) {
      console.log(req.params)
    Message.findOne({ _id: req.params.messageId, userId:ObjectId(req.user.data._id)})
      .select('-__v')
      .populate('jobs')
      .then((Message) =>
        !Message
          ? res.status(404).json({ message: 'No Message with that ID' })
          :res.json(Message)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Message
  createMessage(req, res) {
    // console.log('sssssssssssssssssssssssssssssssssssssssss',req,'bodasdasdas ds dasdasdasdy')
    Message.create(req.body)
      .then(Message=> 
        res.json(Message))
      .catch((err) => {
        // console.log(err);
        return res.status(500).json(err);
      ;
  })},
  // Delete a Message
  deleteMessage(req, res) {
    Message.findOneAndDelete({ _id: ObjectId(req.params.MessageId) })
      .then((Message) =>
        !Message
          ? res.status(404).json({ message: 'No Message with that ID' })
          :  res.json(Message)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a Message
  updateMessage(req, res) {
    console.log(req.body)
    Message.findOneAndUpdate(
      { _id: req.params.MessageId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((Message) =>
        !Message
          ? res.status(404).json({ message: 'No Message with this id!' })
          : res.json(Message)
      )
      .catch((err) => res.status(500).json(err));
  },
};
