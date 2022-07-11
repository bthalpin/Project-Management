const { Project } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  // Get all Project
  getProjects(req, res) {
    Project.find({users:ObjectId(req.body.userId)})
      .then((Projects) => res.json(Projects))
      .catch((err) => res.status(500).json(err));
  },
  // Get a Project
  getSingleProject(req, res) {
      console.log(req.params)
    Project.findOne({ _id: req.params.ProjectId, userId:ObjectId(req.user.data._id)})
      .select('-__v')
      .populate('jobs')
      .then((project) =>
        !project
          ? res.status(404).json({ message: 'No Project with that ID' })
          :res.json(project)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Project
  createProject(req, res) {
    // console.log('sssssssssssssssssssssssssssssssssssssssss',req,'bodasdasdas ds dasdasdasdy')
    Project.create(req.body)
      .then(project=> 
        Project.findByIdAndUpdate(project._id,
            {$push:{users:req.body.user}},
            {new:true}
        ).then(project=>
        res.json(project)))
      .catch((err) => {
        // console.log(err);
        return res.status(500).json(err);
      ;
  })},
  // Delete a Project
  deleteProject(req, res) {
    Project.findOneAndDelete({ _id: ObjectId(req.params.ProjectId) })
      .then((project) =>
        !project
          ? res.status(404).json({ message: 'No Project with that ID' })
          :  res.json(project)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a Project
  updateProject(req, res) {
    console.log(req.body)
    Project.findOneAndUpdate(
      { _id: req.params.ProjectId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((project) =>
        !project
          ? res.status(404).json({ message: 'No Project with this id!' })
          : res.json(project)
      )
      .catch((err) => res.status(500).json(err));
  },
};
