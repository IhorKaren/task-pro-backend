const { ctrlWrapper } = require("../../helpers");


const { addBoard } = require("./addBoard");

module.exports = {
  addBoard: ctrlWrapper(addBoard),
};