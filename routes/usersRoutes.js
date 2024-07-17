const router = require('express').Router();
const schemas = require("../schemas/usersSchema");
const userController = require('../controllers/usersControllers');
const auth = require("../middlewares/auth");
const validateScheme = require('../middlewares/joiValidator');
const validateUniqueEmail = require('../middlewares/validation');

//  base path = "/api/users"

router.post("/", validateScheme(schemas.createNewUser), validateUniqueEmail, userController.registerUser);
router.get("/", auth.isLoggedIn, auth.allowedRoles(["admin"]), userController.getAllUsers);
router.get("/:id", auth.isLoggedIn, auth.isCurrentUserOrAdmin, userController.getUserById);
router.put("/:id", auth.isLoggedIn, auth.isCurrentUser, validateScheme(schemas.putUser), userController.updateUser);
router.patch("/:id", auth.isLoggedIn, auth.isCurrentUser, validateScheme(schemas.patchUser), userController.updateUser);
router.delete("/:id", auth.isLoggedIn, auth.isCurrentUserOrAdmin, userController.deleteUser);

module.exports = router;