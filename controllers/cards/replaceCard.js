const { Board } = require("../../models/board/board");

const { HttpError } = require("../../helpers");

const replaceCard = async (req, res, next) => {
  const { _id } = req.user;
  const { boardId } = req.params;
  const { _id: cardId, owner, newOwner } = req.body;

  if (!boardId) {
    throw HttpError(400, `${boardId} is not valid id`);
  }

  const { columns } = await Board.findOne({
    _id: boardId,
    owner: _id,
  });

  if (!columns) {
    throw HttpError(404, "Not found");
  }

  // Create card with new owner
  const oldColumn = columns.find((column) => column.id === owner);

  if (!oldColumn) {
    throw HttpError(400, `${owner} is not valid id`);
  }

  const columnIndex = columns.findIndex((column) => column.id === owner);
  const cardIndex = oldColumn.cards.findIndex(
    (oldCard) => oldCard.id === cardId
  );

  columns[columnIndex].cards[cardIndex].owner = newOwner;

  const newCard = columns[columnIndex].cards[cardIndex];
  //

  // Delete old card
  await Board.updateOne(
    { _id: boardId, "columns._id": oldColumn._id },
    {
      $pull: {
        "columns.$.cards": { _id: cardId },
      },
    }
  );

  const newColumn = columns.find((column) => column.id === newOwner);

  if (!newColumn) {
    throw HttpError(400, `${newOwner} is not valid id`);
  }

  // Push card in new column
  await Board.updateOne(
    { _id: boardId, "columns._id": newColumn.id },
    {
      $push: {
        "columns.$.cards": newCard,
      },
    }
  );

  res.json(newCard);
};

module.exports = {
  replaceCard,
};
