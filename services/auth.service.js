const schemas = require("../schemas/authSchema");
const { getUserByEmail } = require("../dal/user.dal")
const bcrypt = require("bcryptjs");
const JOIValidationError = require("../errors/joiValidationError");
const InvalidCredentialsError = require("../errors/invalidCredentialsError")
const parseJOIErrors = require("../utils/joiErrorParserUtil")
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

async function userLoginService(credentials) {
    try {
        const { error, value } = schemas.login.validate(credentials);
        if (error) throw new JOIValidationError(parseJOIErrors(error));
        const user = await getUserByEmail(value.email);
        if (!user) throw new InvalidCredentialsError();
        const isMatch = await bcrypt.compare(value.password, user.password);
        if (!isMatch) throw new InvalidCredentialsError();
        const token = jwt.sign({    //maybe delegate to new util file or ..
            id: user._id,
            isBusiness: user.isBusiness,
            isAdmin: user.isAdmin,
        }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        return token
    } catch (error) {
        throw error
    }
}

module.exports = userLoginService
