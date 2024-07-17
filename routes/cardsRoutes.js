const router = require('express').Router();
const cardController = require("../controllers/cardsControllers");
const userController = require("../controllers/usersControllers");
const schemas = require("../schemas/cardsSchema");
const auth = require("../middlewares/auth");
const cardValidation = require("../middlewares/cardValidation");
const validateScheme = require('../middlewares/joiValidator');

//  base path = "/api/cards"

router.get('/', cardController.getAllCards);
router.get("/my-cards", auth.isLoggedIn, userController.getUserCards);
router.get('/:id', cardController.getCardById);
router.post('/' ,auth.isLoggedIn, auth.allowedRoles(["business"]), validateScheme(schemas.createNewCard),cardController.createNewCard);
router.put('/:id' ,auth.isLoggedIn ,validateScheme(schemas.updateCard), cardValidation.isOwner, cardController.updateCard);
router.patch('/:id', auth.isLoggedIn, cardController.likeToggle);
router.delete('/:id', auth.isLoggedIn, cardValidation.isOwnerOrAdmin, cardController.deleteCard);
router.patch("/update-biz/:id", auth.isLoggedIn, auth.isAdmin, validateScheme(schemas.bizNumber), cardController.updateBizNumber);

module.exports = router;