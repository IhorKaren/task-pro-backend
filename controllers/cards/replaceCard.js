const { Board } = require("../../models/board/board");

const { HttpError } = require("../../helpers");

const replaceCard = async (req, res, next) => {
  const { _id } = req.user;
  const { boardId } = req.params;
  const { card, owner, newOwner } = req.body;

  const { columns } = await Board.findOne({
    _id: boardId,
    owner: _id,
  });

  if (!columns) {
    throw HttpError(404, "Not found");
  }

  const oldColumn = columns.find((column) => column.id === owner);

  if (!oldColumn) {
    throw HttpError(400, `${owner} is not valid id`);
  }

  await Board.updateOne(
    { _id: boardId, "columns._id": oldColumn._id },
    {
      $pull: {
        "columns.$.cards": { _id: card._id },
      },
    }
  );

  const newColumn = columns.find((column) => column.id === newOwner);

  if (!newColumn) {
    throw HttpError(400, `${newOwner} is not valid id`);
  }

  await Board.updateOne(
    { _id: boardId, "columns._id": newColumn.id },
    {
      $push: {
        "columns.$.cards": { ...card, owner: newOwner },
      },
    }
  );

  res.json({ ...card, owner: newOwner });
};

module.exports = {
  replaceCard,
};
