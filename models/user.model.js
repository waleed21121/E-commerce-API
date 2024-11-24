const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('user', userSchema);

exports.getQueryObject = () => {
    const object = User.find();
    return object;
}

exports.addNewUser = async(user) => {
    const newUser = new User(user);
    await newUser.save();
}

exports.getUserByEmail = async(email) => {
    const user = await User.findOne({email: email});
    return user;
}
