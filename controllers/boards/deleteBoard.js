const { Board } = require("../../models/board/board");

const { HttpError } = require("../../helpers");

const deleteBoard = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { boardId: _id } = req.params;

  const result = await Board.findOneAndRemove({
    _id,
    owner
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "Board has been deleted successful",
  });
};

module.exports = {
  deleteBoard,
};
