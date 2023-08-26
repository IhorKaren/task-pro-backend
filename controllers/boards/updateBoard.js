const { Board } = require("../../models/board/board");

const { HttpError } = require("../../helpers");

const updateBoard = async (req, res, next) => {
  const { _id } = req.user;
  const { boardId } = req.params;

  const result = await Board.findOneAndUpdate(
    {
      _id: boardId,
      ovner: _id,
    },
    req.body,
    { new: true }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  updateBoard,
};
