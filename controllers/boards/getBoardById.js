const { Board } = require("../../models/board/board");

const getBoardById = async (req, res) => {
  const { _id } = req.user;
  const { boardId } = req.params;

  const result = await Board.find({ _id: boardId, owner: _id }, "-createdAt -updatedAt");

  res.json(result);
};

module.exports = {
  getBoardById,
};
