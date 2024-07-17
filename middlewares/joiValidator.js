const JOIValidationError = require("../errors/joiValidationError");
const parseJOIErrors = require("../utils/joiErrorParserUtil")

const validateScheme = (scheme) => {
    return (req, res, next) => {
        try{
            const {error, value} = scheme.validate(req.body);
            if (error)
                throw new JOIValidationError(parseJOIErrors(error))
            req.synthBody = value;
            req.body = undefined;
            return next();
        }catch (err) {
            if (err instanceof JOIValidationError)
                return res.status(err.status || 500).json({ success: false, message: err.message })
            return res.status(500).json({ success: false, message: "Something went wrong" })
        }
    }
}

module.exports = validateScheme;