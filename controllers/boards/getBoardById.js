const { Board } = require("../../models/board/board");

const { HttpError, filter } = require("../../helpers");

const getBoardById = async (req, res) => {
  const { _id } = req.user;
  const { boardId } = req.params;

  const result = await Board.findOne({ _id: boardId, owner: _id });

  if (!result) {
    throw HttpError(400, `${boardId} is not valid id`);
  }

  let filteredCards = null;

  if (result.filter !== "default") {
    filteredCards = filter(result.columns, result.filter);
  }

  res.json({ ...result._doc, columns: filteredCards ?? result.columns });
};

module.exports = {
  getBoardById,
};
