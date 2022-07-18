const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
    name: {
        type: String,
        required:true,
    },
    description:{
        type:String,
    },
    users:[
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
],
    tasksCategory:[
        {
        type: String,
    }
],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;