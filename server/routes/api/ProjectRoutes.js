const router = require('express').Router();
const {
  getProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../../controllers/projectControllers.js');
const {loginRequired} = require('../../utils/auth');
// /api/Projects
// router.route('/').get(loginRequired,getProjects).post(createProject);
router.route('/').get(getProjects).post(createProject);

// /api/Projects/:ProjectId
router
  .route('/:ProjectId')
//   .get(loginRequired,getSingleProject)
//   .put(updateProject)
//   .delete(loginRequired,deleteProject);
  .get(getSingleProject)
  .put(updateProject)
  .delete(deleteProject);

module.exports = router;
