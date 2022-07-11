const router = require('express').Router();
const {
//   getTaskGroups,
//   getSingleTaskGroup,
  createTaskGroup,
  updateTaskGroup,
  deleteTaskGroup,
} = require('../../controllers/taskGroupControllers.js');
const {loginRequired} = require('../../utils/auth');
// /api/TaskGroups
// router.route('/').get(loginRequired,getTaskGroups).post(createTaskGroup);
router.route('/').post(createTaskGroup);

// /api/TaskGroups/:TaskGroupId
router
  .route('/:TaskGroupId')
//   .get(loginRequired,getSingleTaskGroup)
//   .put(updateTaskGroup)
//   .delete(loginRequired,deleteTaskGroup);
//   .get(getSingleTaskGroup)
  .put(updateTaskGroup)
  .delete(deleteTaskGroup);

module.exports = router;
