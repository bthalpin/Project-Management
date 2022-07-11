const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskGroupSchema = new Schema({
    name: {
        type: String,
        required:true,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
    }
],
});

const TaskGroup = mongoose.model('TaskGroup', taskGroupSchema);

module.exports = TaskGroup;