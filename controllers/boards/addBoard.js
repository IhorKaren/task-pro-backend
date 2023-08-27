const { Board } = require("../../models/board/board");
const { HttpError } = require("../../helpers");

const addBoard = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { title } = req.body;
  const trimedTitle = title.trim();
  const board = await Board.findOne({ title: trimedTitle, owner });

  if (board) {
    throw HttpError(409, "The board whith such title already exist.");
  }
  const result = await Board.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
  addBoard,
};
