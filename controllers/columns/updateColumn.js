const { Board } = require("../../models/board/board");

const { HttpError } = require("../../helpers");

const updateColumn = async (req, res, next) => {
  const { _id } = req.user;
  const { title, owner } = req.body;
  const { columnId } = req.params;

  const { columns } = await Board.findOne({
    _id: owner,
    owner: _id,
  });

  const index = columns.findIndex((column) => column.id === columnId);

  if (index === -1) {
    throw HttpError(400, `${columnId} is not valid id`);
  }

  const updateBoard = await Board.updateOne(
    { _id: owner, owner: _id },
    { $set: { [`columns.${index}.title`]: title } }
  );

  if (updateBoard.modifiedCount === 0) {
    throw HttpError(404);
  }

  const boardGetColumn = await Board.findOne({ _id: owner, owner: _id });

  res.json(boardGetColumn.columns[index]);
};

module.exports = {
  updateColumn,
};
