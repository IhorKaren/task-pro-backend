const { ctrlWrapper } = require("../../helpers");

const { addColumnInBoard } = require("./addColumnInBoard");
const { getColumns } = require("./getColumns");
const { updateColumn } = require("./updateColumn");
const { deleteColumn } = require("./deleteColumn");

module.exports = {
  addColumnInBoard: ctrlWrapper(addColumnInBoard),
  getColumns: ctrlWrapper(getColumns),
  updateColumn: ctrlWrapper(updateColumn),
  deleteColumn: ctrlWrapper(deleteColumn),
};
