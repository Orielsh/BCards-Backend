const LoginError = require("../errors/logInError")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const isLoggedIn = (req, res, next) => {
    try {
        const token = req.header('x-auth-token')
        if (!token) throw new LoginError();
        const payload = jwt.verify(token, JWT_SECRET)
        req.user = payload;
        return next();
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError)
            return res.status(400).json({ success: false, message: "Bad Request" })
        return res.status(err.status || 500).json({ success: false, message: err.message })
    }
}

const isCurrentUser = (req, res, next) => {
    if (req.params.id === req.user.id)
        return next();
    else
        return res.status(403).json({ success: false, message: "Access denied" })
}

const isCurrentUserOrAdmin = (req, res, next) => {
    if (req.params.id === req.user.id || req.user.isAdmin)
        return next();
    else
    return res.status(403).json({ success: false, message: "Access denied" })
}

const isAdmin = (req, res, next) => {
    if (req.user.isAdmin)
        return next();
    else
    return res.status(403).json({ success: false, message: "Access denied" })
}

const allowedRoles = (roles) => {
    return (req, res, next) => {
        // check if roles is an array
        if (!Array.isArray(roles)) throw new Error('Error: roles must be an array');
        // check if roles has at-least one element
        if (roles.length === 0) throw new Error('Error: roles must contain at-least one element');
        // double-check that the user is actually logged-in
        if (!req.user) return res.status(401).json({ sucees: false, message: 'Forbidden: you must be logged-in to view this content' })
        // simple destructuring
        const { isBusiness, isAdmin } = req.user;

        // let's actually start checking if our user has one of the roles from roles
        let hasRole = false;

        // check agains roles
        if (roles.includes('business') && isBusiness) hasRole = true;
        if (roles.includes('admin') && isAdmin) hasRole = true;

        // user does not meet the required roles
        if (!hasRole) 
            return res.status(401).json({ success: false, message: `Unauthorized: can't access this resource` })
        // allowed !
        return next();
    }
}

module.exports = { isCurrentUser, allowedRoles, isCurrentUserOrAdmin, isLoggedIn, isAdmin };