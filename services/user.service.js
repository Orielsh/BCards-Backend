const userDAL = require('../dal/user.dal');
const bcrypt = require("bcryptjs");
const AccessError = require("../errors/accessError");

// register a new user
async function registerUser(userData) {
    try {
        // hash the password
        // replace the plain-text password we received from the user, by its hashed version
        userData.password = await bcrypt.hash(userData.password, 10);

        userData.isAdmin = false;

        // save the new user to the database
        const saved = await userDAL.createUser(userData)
        return saved;
    } catch (error) {
        throw error;
    }
}

// Service function to get all users (can be modified for pagination or filtering)
async function getAllUsers(user) {
    try {
        if (user.isAdmin) {
            const users = await userDAL.getAllUsers();
            return users;
        } else
            throw new AccessError(user);
    } catch (error) {
        throw error;
    }
}

// Service function to get a user by ID
async function getUserById(user, id) {
    if (user.id === id || user.isAdmin)
        return user = await userDAL.getUserById(id);
    else
        throw new AccessError(user)
}

// Service function to update a user (can be extended for partial updates)
async function updateUserById(user, id, updates) {
    if (user.id === id)
        return await userDAL.updateUser(id, updates);
    else
        throw new AccessError(user)
}

// Service function to delete a user
async function deleteUser(user, id) {
    if (user.id === id || user.isAdmin)
        return user = await userDAL.deleteUser(id);
    else
        throw new AccessError(user)
}

// Check if user with given email exist
async function isUserWithEmailExist(email) {
    return await userDAL.isUserWithEmailExist(email);
}

async function getUserCards(user_id) {
    return await userDAL.getUserCards(user_id);
}

module.exports = {
    registerUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUser,
    isUserWithEmailExist,
    getUserCards,
};
