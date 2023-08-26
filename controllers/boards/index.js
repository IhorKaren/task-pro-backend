const { ctrlWrapper } = require("../../helpers");

const { addBoard } = require("./addBoard");
const { getBoards } = require("./getBoards");
const { getBoardById } = require("./getBoardById");
const { addColumnInBoard } = require("./addColumnInBoard");
const { deleteBoard } = require("./deleteBoard");

module.exports = {
  addBoard: ctrlWrapper(addBoard),
  getBoards: ctrlWrapper(getBoards),
  deleteBoard: ctrlWrapper(deleteBoard),
  getBoardById: ctrlWrapper(getBoardById),
  addColumnInBoard: ctrlWrapper(addColumnInBoard),
};
