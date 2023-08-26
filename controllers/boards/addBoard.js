const { Board } = require("../../models/board/board");

const addBoard = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Board.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
  addBoard,
};
