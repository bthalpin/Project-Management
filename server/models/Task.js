const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    name: {
        type: String,
        required:true,
    },
    description:{
        type: String,
    },
    image:{
        type: String,
    },
    status:{
        type: String,
    },
    users:[
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ],
    tasksGroupId:
        {
        type: Schema.Types.ObjectId,
        ref: 'TaskGroup'
    },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;