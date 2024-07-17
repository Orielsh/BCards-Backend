const User = require("../models/User");
const Card = require("../models/Card");

// create user
async function createUser(user) {
    const newUser = new User(user);
    return await newUser.save();
}

// get all users
async function getAllUsers() {
    return await User.find({}).select('-password').exec();
}

// get a user by ID
async function getUserById(id) {
    return await User.findById(id).select('-password').exec();
}

// update a user by ID
async function updateUser(id, updates) {
    return await User.findByIdAndUpdate(id, updates, { new: true }).select('-password').exec();
}

// delete a user by ID
async function deleteUser(id) {
    return await User.findByIdAndDelete(id).select('-password').exec();
}

// check if user with email exist
async function isUserWithEmailExist(email) {
    const users = await User.find({ email: email });
    return users.length > 0;
}

// get user by email
async function getUserByEmail(email) {
    return await User.findOne({ email: email });
}

// get all cards of a user by user_id
async function getUserCards(user_id){
    return await Card.find({user_id: user_id});
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    isUserWithEmailExist,
    getUserByEmail,
    getUserCards,
};