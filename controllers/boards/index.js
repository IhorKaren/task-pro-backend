const { ctrlWrapper } = require("../../helpers");

const { addBoard } = require("./addBoard");
const { getBoards } = require("./getBoards");
const { getBoardById } = require("./getBoardById");

const { deleteBoard } = require("./deleteBoard");
const { updateBoard } = require("./updateBoard");
const { sortBoardCards } = require("./sortBoardCards");

module.exports = {
  addBoard: ctrlWrapper(addBoard),
  getBoards: ctrlWrapper(getBoards),
  deleteBoard: ctrlWrapper(deleteBoard),
  updateBoard: ctrlWrapper(updateBoard),
  getBoardById: ctrlWrapper(getBoardById),
  sortBoardCards: ctrlWrapper(sortBoardCards),
};
