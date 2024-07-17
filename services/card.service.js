const cardDal = require("../dal/card.dal");
const Card = require("../models/Card")
const AccessError = require("../errors/accessError");
const BizNumberAlreadyExist = require("../errors/bizNumberExist");

async function createCard(cardData) {
    const newCard = new Card(cardData);
    newCard.bizNumber = await Card.getNextBizNumber();
    return await cardDal.createCard(newCard);
}

async function getAllCards() {
    return await cardDal.getAllCards();
}

async function getCardById(cardId) {
    return await cardDal.getCardById(cardId);
}

async function updateCard(card_id, updatedCard) {
    return await cardDal.updateCard(card_id, updatedCard);
}

async function likeToggle(user, cardId) {
    const card = await cardDal.getCardById(cardId);
    if (card.likes.includes(user.id))
        card.likes = card.likes.filter((id) => (id != user.id));
    else
        card.likes.push(user.id);
    return await cardDal.updateCard(cardId, card);
}

async function deleteCard(user, cardId) {
    const existCard = await cardDal.getCardById(cardId);
    if (user.id === existCard.user_id.toString() || user.isAdmin)
        return await cardDal.deleteCard(cardId);
    else
        throw new AccessError(user)
}

async function updateBizNumber(c_id, data){
    const existCard = await cardDal.findByBizNumber(data.bizNumber);
    if(existCard.length > 0)
        throw new BizNumberAlreadyExist(data.bizNumber);
    return await cardDal.updateCard(c_id, data);
}

module.exports = {
    createCard,
    getAllCards,
    getCardById,
    updateCard,
    likeToggle,
    deleteCard,
    updateBizNumber,
}