const { TaskGroup,Project } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  // Get all TaskGroup
  getAllTaskGroups(req, res) {
    console.log(req.user,'here')
    // console.log(req.user.data._id)
    TaskGroup.find({projectId:ObjectId(req.body.projectId)})
      .then((TaskGroups) => res.json(TaskGroups))
      .catch((err) => res.status(404).json(err));
  },
//   getTaskGroup(req, res) {
//     // console.log(req.user.data._id)
//     TaskGroup.find({company:req.params.companyId,userId:req.user.data._id})
//       .then((TaskGroups) => res.json(TaskGroups))
//       .catch((err) => res.status(500).json(err));
//   },
  // Get a TaskGroup
//   getSingleTaskGroup(req, res) {
//     TaskGroup.findOne({ _id: req.params.TaskGroupId,userId:req.user.data._id })
//       .populate('company')
//       .select('-__v')
//       .then((TaskGroup) =>
//         !TaskGroup
//           ? res.status(404).json({ message: 'No TaskGroup with that ID' })
//           : res.json(TaskGroup)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
  // Create a TaskGroup
  createTaskGroup(req, res) {
    TaskGroup.create(req.body)
      .then((TaskGroup) => 
      !TaskGroup
      ? res.status(404).json({ message: 'No TaskGroup with that ID' })
      :Project.findOneAndUpdate(
        {_id:req.body.projectId},
        {$push:{tasks:TaskGroup._id}},
        {new:true}
      ))
      .then(project=>
        !project
        ?res.status(404).json({ message: 'No company with that ID' })
        : res.json(project)
        )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a TaskGroup
  deleteTaskGroup(req, res) {
    TaskGroup.findOneAndDelete({ _id: req.params.TaskGroupId })
      .then((taskGroup) =>
        !taskGroup
          ? res.status(404).json({ message: 'No TaskGroup with that ID' })
          : Project.findOneAndUpdate(
            {_id:taskGroup.projectId},
            {$pull:{tasks:taskGroup._id}}
          ))
          .then(company=>
            !company
              ? res.status(404).json({ message: 'No TaskGroup with that ID' })
              : res.json(company)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a TaskGroup
  updateTaskGroup(req, res) {
    console.log(req.body)
    TaskGroup.findOneAndUpdate(
      { _id: req.params.taskGroupId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    // .populate('company')
      .then((taskGroup) =>
        !taskGroup
          ? res.status(404).json({ message: 'No TaskGroup with this id!' })
          : res.json(TaskGroup)
      )
      .catch((err) => res.status(500).json(err));
  },
};
