const { ctrlWrapper } = require("../../helpers");

const { addCard } = require("./addCard");
const { deleteCard } = require("./deleteCard");

module.exports = {
  addCard: ctrlWrapper(addCard),
  deleteCard: ctrlWrapper(deleteCard),
};
