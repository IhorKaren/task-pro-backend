const { Board } = require("../../models/board/board");

const getBoards = async (req, res) => {
  const { _id: owner } = req.user;

  let result = null;

  result = await Board.find({ owner });
  res.json(result);
};

module.exports = {
  getBoards,
};
