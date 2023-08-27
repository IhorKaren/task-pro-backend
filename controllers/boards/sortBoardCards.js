const { Board } = require("../../models/board/board");

const { HttpError, sortByPriority } = require("../../helpers");

const sortBoardCards = async (req, res) => {
  const { _id } = req.user;
  const { boardId, priority } = req.params;

  const result = await Board.findOne({ _id: boardId, owner: _id });

  if (!result) {
    throw HttpError(400, `${boardId} is not valid id`);
  }

  let sortedCards = null;

  switch (priority) {
    case "without":
      sortedCards = sortByPriority(result.columns, priority);
      break;

    case "low":
      sortedCards = sortByPriority(result.columns, priority);
      break;

    case "medium":
      sortedCards = sortByPriority(result.columns, priority);
      break;

    case "high":
      sortedCards = sortByPriority(result.columns, priority);
      break;

    default:
      sortedCards = result.columns;
      break;
  }

  res.json({ ...result._doc, columns: sortedCards });
};

module.exports = {
  sortBoardCards,
};
