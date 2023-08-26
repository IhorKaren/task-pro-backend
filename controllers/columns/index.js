const { ctrlWrapper } = require("../../helpers");

const { addColumnInBoard } = require("./addColumnInBoard");
const { updateColumn } = require("./updateColumn");
const { deleteColumn } = require("./deleteColumn");

module.exports = {
  deleteColumn: ctrlWrapper(deleteColumn),
  addColumnInBoard: ctrlWrapper(addColumnInBoard),
  updateColumn: ctrlWrapper(updateColumn),
};
