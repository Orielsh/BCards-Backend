const AccessError = require("../errors/accessError");
const cardService = require("../services/card.service");

async function isOwner(req, res, next) {
    const user = req.user;
    const { id: card_id } = req.params;
    try {
        if (!user || !card_id)
            return res.status(400).json({ success: false, message: "Bad request" });
        const card = await cardService.getCardById(card_id)
        if (user.id === card.user_id.toString())
            return next();
        else
            throw new AccessError(user);
    } catch (error) {
        if (error instanceof AccessError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(500).json({ success: false, message: "Something wend wrong" })
    }
}

async function isOwnerOrAdmin(req, res, next) {
    const user = req.user;
    const { id: card_id } = req.params;
    if(user.isAdmin)
        return next();
    try {
        if (!user || !card_id)
            return res.status(400).json({ success: false, message: "Bad request" });
        const card = await cardService.getCardById(card_id)
        if (user.id === card.user_id.toString())
            return next();
        else
            throw new AccessError(user);
    } catch (error) {
        if (error instanceof AccessError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(500).json({ success: false, message: "Something wend wrong" })
    }
}

module.exports = {
    isOwner,
    isOwnerOrAdmin,
}