const { Board } = require("../../models/board/board");
const mongoose = require("mongoose");

const { HttpError } = require("../../helpers");

const addCardInColumn = async (req, res, next) => {
  const { _id } = req.user;
  const { boartId } = req.params;

  const newObjectId = new mongoose.Types.ObjectId();

  const result = await Board.findOneAndUpdate(
    {
      _id: boartId,
      ovner: _id,
    },
    { $push: { columns: { _id: newObjectId, ...req.body } } }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  addCardInColumn,
};
