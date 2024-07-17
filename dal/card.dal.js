const Card = require("../models/Card")

// create card
async function createCard(card) {
    return await card.save();
}

// get all cards
async function getAllCards() {
    return await Card.find({});
}

// get a card by ID
async function getCardById(id) {
    return await Card.findById(id);
}

// update a card by ID
async function updateCard(id, updates) {
    return await Card.findByIdAndUpdate(id, updates, { new: true });
}

// delete a card by ID
async function deleteCard(id) {
    return await Card.findByIdAndDelete(id);
}

// delete a card by ID
async function findByBizNumber(id) {
    return await Card.find({bizNumber: id});
}

module.exports = {
    createCard,
    getAllCards,
    getCardById,
    updateCard,
    deleteCard,
    findByBizNumber,
};