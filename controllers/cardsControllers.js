const cardService = require("../services/card.service");
const bizNumberAlreadyExist = require("../errors/bizNumberExist");

const getAllCards = async (req, res) => {
  try {
    const allCards = await cardService.getAllCards()
    return res.status(200).json({
      success: true,
      data: allCards,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed fetch card list",
    });
  }
};

const getCardById = async (req, res) => {
  const { id } = req.params;
  try {
    const found = await cardService.getCardById(id);
    if (found) {
      return res.status(200).json({
        success: true,
        data: found,
      });
    }
    return res.status(404).json({
      success: false,
      message: `card id '${id}' not found`,
    });
  } catch (err) {
    // return an error message
    return res.status(500).json({
      success: false,
      message: "Failed fetch card",
    });
  }
};

const createNewCard = async (req, res) => {
  try {
    const newCard = await cardService.createCard({ ...req.synthBody, user_id: req.user.id });
    return res.status(201).json({
      success: true,
      created: newCard,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `error saving the card` });
  }
};

const deleteCard = async (req, res) => {
  const { id: card_id } = req.params;
  try {
    const deleted = await cardService.deleteCard(req.user, card_id);
    if (!deleted) throw new Error();
    return res.status(200).json({ success: true, deleted: deleted });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `card id ${id} not deleted, something went wrong` });
  }
};

const updateCard = async (req, res) => {
  const { id: card_id } = req.params;
  try {
    const updatedCard = await cardService.updateCard(card_id, req.synthBody);
    if (!updatedCard)
      return res
        .status(404)
        .json({ success: false, message: `card id ${card_id} was not found.` });
    return res.status(200).json({
      success: true,
      updated: updatedCard,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Couldn't update card ${card_id}.` });
  }
};

const likeToggle = async(req, res) =>{
  const {id: card_id} = req.params;
  try{
    const updatedCard = await cardService.likeToggle(req.user, card_id);
    return res.status(200).json({success: true, data: updatedCard});
  }catch(error){
    return res.status(500).json({success: false, message: "Something went wrong"});
  }
}

const updateBizNumber = async(req, res) => {
  const {id: card_id} = req.params;
  try{
    const updatedCard = await cardService.updateBizNumber(card_id, req.synthBody);
    return res.status(200).json({success: true, data: updatedCard});
  }catch(error){
    if (error instanceof bizNumberAlreadyExist)
      return res.status(error.status).json({success: false, message: error.message});
    return res.status(500).json({success: false, message: "Something went wrong"});
  }
}



module.exports = {
  getAllCards,
  getCardById,
  createNewCard,
  deleteCard,
  updateCard,
  likeToggle,
  updateBizNumber,
};
