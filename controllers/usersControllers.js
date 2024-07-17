const userService = require("../services/user.service");
const AccessError = require("../errors/accessError");

const registerUser = async (req, res) => {
  try {
    const value = req.synthBody;
    newUser = await userService.registerUser(value)
    return res.status(201).json({ success: true, created: newUser });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false, message: `Error registering user: ${error.message}`,
    },);
  }
};

const getAllUsers = async (req, res) => {
  // get all users
  try {
    const users = await userService.getAllUsers(req.user)
    if (users) return res.status(200).json({
      success: true,
      data: users,
    });
    else {
      return res.status(500).json({
        success: false,
        message: "Something went wrong"
      });
    }
  } catch (err) {
    // return an error message
    return res.status(err.status || 400).json({
      success: false,
      message: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  // get the id from url (no need to parseInt, we're using string type id)
  const { id } = req.params;

  try {
    // find the user that matches this id
    const found = await userService.getUserById(req.user, id)
    // found
    if (found) {
      // return the user found
      return res.status(200).json({
        success: true,
        data: found,
      });
    }
    // not found
    return res.status(404).json({
      success: false,
      message: `user id '${id}' not found`,
    });
  } catch (err) {
    // return an error message
    return res.status(err.status || 400).json({
      success: false,
      message: "Invalid format for user id or access denied",
    });
  }
};

const deleteUser = async (req, res) => {

  // get the id from url (no need to parseInt, we're using string type id)
  const { id } = req.params;
  // try to handle errors
  try {
    const deleted = await userService.deleteUser(req.user, id);
    if (!deleted) throw new Error();
    // found & deleted
    return res.status(200).json({ success: true, deleted: deleted });
  } catch (err) {
    console.log(err)
    if (err instanceof AccessError)
      return res.status(err.stats).json({ success: false, message: err.message })
    return res.status(404).json({ success: false, message: `user id ${id} not found` });
  }
};

const updateUser = async (req, res) => {
  try {
    const { user, synthBody, params } = req;
    const id = params.id;
    const updated = await userService.updateUserById(user, id, synthBody)
    if (!updated)
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    return res.status(200).json({
      success: true,
      updated: updated,
    });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ success: false, message: err.message });
  }
};

const getUserCards = async (req, res) =>{
  try{
    const user_id = req.user.id;
    const userCards = await userService.getUserCards(user_id);
    if(userCards)
      return res.status(200).json({success: true, message: userCards.length > 0 ? userCards : "This user have no cards."});
    return res.status(404).json({
      success: false,
      message: `card id '${id}' not found`,
    });
  }catch(error){
    return res.status(500).json({
      success: false,
      message: "Failed fetch user's cards",
    });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  registerUser,
  getUserCards,
};
