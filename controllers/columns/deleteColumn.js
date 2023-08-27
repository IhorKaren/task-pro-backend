const { Board } = require("../../models/board/board");

const { HttpError } = require("../../helpers");

const deleteColumn = async (req, res, next) => {
  const { _id } = req.user;
  const { owner, _id: columnId } = req.body;

  const result = await Board.findOneAndUpdate(
    {
      _id: owner,
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
