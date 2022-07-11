const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String
    },
    projectId:{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;