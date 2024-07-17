const userService = require("../services/user.service")
const EmailExistError = require("../errors/emailExistError")

const validateUniqueEmail = async (req, res, next) => {
    try{
        const value = req.synthBody;
        if(await userService.isUserWithEmailExist(value.email))
            throw new EmailExistError(value.email);
        return next();
    }catch(error){
        if(error instanceof EmailExistError)
            return res.status(error.status || 500).json({ success: false, message: `Error register: ${error.message}` });
        return res.status(500).json({ success: false, message: "Error register: Something went wrong"});
    }
}

module.exports = validateUniqueEmail;