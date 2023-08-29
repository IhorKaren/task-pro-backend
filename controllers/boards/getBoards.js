const { Board } = require("../../models/board/board");

const getBoards = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Board.find({ owner }, "-createdAt -updatedAt");

  const shortBoards = result.map((board) => {
    return {
      title: board.title,
      _id: board._id,
      icon: board.icon,
      owner: board.owner,
    };
  });

  res.json(shortBoards);
};

module.exports = {
  getBoards,
};
