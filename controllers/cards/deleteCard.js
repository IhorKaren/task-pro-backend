const { Board } = require("../../models/board/board");

const { HttpError } = require("../../helpers");

const deleteCard = async (req, res, next) => {
  const { _id } = req.user;
  const { boardId, columnId } = req.params;
  const { cardId } = req.body;

  const { columns } = await Board.findOne({
    _id: boardId,
    ovner: _id,
  });

  if (!columns) {
    throw HttpError(404, "Not found");
  }

  const column = columns.find((column) => column.id === columnId);

  if (!column) {
    throw HttpError(400, `${columnId} is not valid id`);
  }

  await Board.updateOne(
    { _id: boardId, "columns._id": column._id },
    {
      $pull: {
        "columns.$.cards": { _id: cardId },
      },
    }
  );

  res.json({
    messege: "Deleted success",
  });
};

module.exports = {
  deleteCard,
};