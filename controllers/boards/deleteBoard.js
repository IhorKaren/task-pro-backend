const { Board } = require("../../models/board/board");

const { HttpError } = require("../../helpers");

const deleteBoard = async (req, res, next) => {
  const { _id } = req.user;
  const { boardId } = req.params;

  const result = await Board.findOneAndRemove({
    _id: boardId,
    ovner: _id,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Board deleted",
  });
};

module.exports = {
  deleteBoard,
};
