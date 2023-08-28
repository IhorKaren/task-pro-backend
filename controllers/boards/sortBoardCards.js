const { Board } = require("../../models/board/board");

const { HttpError, filter } = require("../../helpers");

const sortBoardCards = async (req, res) => {
  const { _id } = req.user;
  const { boardId, priority } = req.params;

  const result = await Board.findOneAndUpdate(
    { _id: boardId, owner: _id },
    {
      filter: priority,
    },
    { new: true }
  );

  if (!result) {
    throw HttpError(400, `${boardId} is not valid id`);
  }

  const filteredCards = filter(result.columns, priority);

  res.json({ ...result._doc, columns: filteredCards });
};

module.exports = {
  sortBoardCards,
};
