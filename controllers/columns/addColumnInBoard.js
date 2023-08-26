const { Board } = require("../../models/board/board");
const mongoose = require("mongoose");

const { HttpError } = require("../../helpers");

const addColumnInBoard = async (req, res, next) => {
  const { _id } = req.user;
  const { boardId } = req.params;

  const newObjectId = new mongoose.Types.ObjectId();

  const result = await Board.findOneAndUpdate(
    {
      _id: boardId,
      ovner: _id,
    },
    { $push: { columns: { _id: newObjectId, owner: boardId, ...req.body } } },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  addColumnInBoard,
};
