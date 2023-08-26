const { ctrlWrapper } = require("../../helpers");

const { addBoard } = require("./addBoard");
const { getBoards } = require("./getBoards");
const { getBoardById } = require("./getBoardById");
const { addColumnInBoard } = require("./addColumnInBoard");
const { deleteBoard } = require("./deleteBoard");
const { updateBoard } = require("./updateBoard");
const { updateColumn } = require("./updateColumn");
const { deleteColumn } = require("./deleteColumn");

module.exports = {
  addBoard: ctrlWrapper(addBoard),
  getBoards: ctrlWrapper(getBoards),
  deleteBoard: ctrlWrapper(deleteBoard),
  deleteColumn: ctrlWrapper(deleteColumn),
  updateBoard: ctrlWrapper(updateBoard),
  getBoardById: ctrlWrapper(getBoardById),
  addColumnInBoard: ctrlWrapper(addColumnInBoard),
  updateColumn: ctrlWrapper(updateColumn),
};
