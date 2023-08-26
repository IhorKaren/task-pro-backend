const { Board } = require("../../models/board/board");

const { HttpError } = require("../../helpers");

const deleteColumn = async (req, res, next) => {
  const { _id } = req.user;
  const { boardId, columnId } = req.params;

  const result = await Board.findOneAndUpdate(
    {
      _id: boardId,
      owner: _id,
    },
    { $pull: { columns: { _id: columnId } } },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  deleteColumn,
};
