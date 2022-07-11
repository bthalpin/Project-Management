const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+@.+\..+/, 'Must match an email address!'] // Match existing e-mail.
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    picture:{
        type:String,
    }
});



userSchema.pre('save', async function(next) {
    if (this.isnew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;