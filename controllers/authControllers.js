const userLoginService = require("../services/auth.service")


const login = async (req, res) => {
  try {
    token = await userLoginService(req.body);
    return res.status(200).json({ success: true, token: token });
  } catch (error) {
    return res.status(error.status || 500).json({ success: false, message: `Error loggin-in: ${error.message}` });
  }
};

module.exports = {login};
