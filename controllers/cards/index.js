const { ctrlWrapper } = require("../../helpers");

const { addCard } = require("./addCard");
const { deleteCard } = require("./deleteCard");
const { updateCard } = require("./updateCard");
const { replaceCard } = require("./replaceCard");

module.exports = {
  addCard: ctrlWrapper(addCard),
  deleteCard: ctrlWrapper(deleteCard),
  updateCard: ctrlWrapper(updateCard),
  replaceCard: ctrlWrapper(replaceCard),
};
