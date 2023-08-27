const { Board } = require("../../models/board/board");

const { HttpError } = require("../../helpers");

const updateBoard = async (req, res, next) => {
  const { _id } = req.user;
  const { boardId } = req.params;
  const { title } = req.body;

  const trimedTitle = title.trim();

  const board = await Board.findOne({ title: trimedTitle, owner: _id });

  if (board) {
    throw HttpError(409, "The board whith such title already exist.");
  }
  const result = await Board.findOneAndUpdate(
    {
      _id: boardId,
      owner: _id,
    },
    req.body,
    { new: true, select: "-createdAt -updatedAt -columns" }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  updateBoard,
};
