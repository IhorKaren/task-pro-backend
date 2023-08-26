const { Board } = require("../../models/board/board");

const { HttpError } = require("../../helpers");

const deleteColumn = async (req, res, next) => {
  const { _id } = req.user;
  const { boardId, columnId } = req.params;

  console.log(boardId);
  console.log(columnId);

  const result = await Board.findOneAndUpdate(
    {
      _id: boardId,
      owner: _id,
    },
    { $pull: { columns: { _id: columnId } } },
    { new: true }
  );

  console.log(result);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    message: "Column deleted",
  });
};

module.exports = {
  deleteColumn,
};
