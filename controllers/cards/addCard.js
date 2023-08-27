const { Board } = require("../../models/board/board");
const mongoose = require("mongoose");

const { HttpError } = require("../../helpers");

const addCard = async (req, res, next) => {
  const { _id } = req.user;
  const { boardId } = req.params;
  const { owner } = req.body;

  const newObjectId = new mongoose.Types.ObjectId();

  const { columns } = await Board.findOne({
    _id: boardId,
    owner: _id,
  });

  if (!columns) {
    throw HttpError(404, "Not found");
  }

  const column = columns.find((column) => column.id === owner);

  if (!column) {
    throw HttpError(400, `${owner} is not valid id`);
  }

  await Board.updateOne(
    { _id: boardId, "columns._id": column._id },
    {
      $push: {
        "columns.$.cards": { _id: newObjectId, owner, ...req.body },
      },
    }
  );

  const boardGetCard = await Board.findOne({ _id: boardId, ovner: _id });
  const result = boardGetCard.columns
    .find((column) => column.id === owner)
    .cards.find((card) => card._id.toString() === newObjectId.toString());

  res.json(result);
};

module.exports = {
  addCard,
};
