const router = require('express').Router();
const {
  getMessages,
  getSingleMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} = require('../../controllers/messageControllers.js');
// const {loginRequired} = require('../../utils/auth');
// /api/Messages
// router.route('/').get(loginRequired,getMessages).post(createMessage);
router.route('/').get(getMessages).post(createMessage);

// /api/Messages/:MessageId
router
  .route('/:MessageId')
//   .get(loginRequired,getSingleMessage)
//   .put(updateMessage)
//   .delete(loginRequired,deleteMessage);
  .get(getSingleMessage)
  .put(updateMessage)
  .delete(deleteMessage);

module.exports = router;
