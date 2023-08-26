const { Board } = require("../../models/board/board");

const { HttpError } = require("../../helpers");

const updateColumn = async (req, res, next) => {
//   const { _id } = req.user;
//   const { boardId, columnId } = req.params;

  const result = await Board.findOneAndUpdate();

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  updateColumn,
};
