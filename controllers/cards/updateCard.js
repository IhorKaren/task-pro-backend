const { Board } = require("../../models/board/board");

const { HttpError } = require("../../helpers");

const updateCard = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { boardId } = req.params;
  const { _id, owner, title, text, priority, deadline } = req.body;

  if (!boardId) {
    throw HttpError(400, `${boardId} is not valid id`);
  }

  const { columns } = await Board.findOne({
    _id: boardId,
    owner: userId,
  });

  if (!columns) {
    throw HttpError(404, "Not found");
  }

  const column = columns.find((column) => column.id === owner);
  const columnIndex = columns.findIndex((column) => column.id === owner);

  if (!column) {
    throw HttpError(400, `${owner} is not valid id`);
  }

  const index = column.cards.findIndex((card) => card.id === _id);

  const oldData = columns[columnIndex].cards[index];

  const newData = {
    title: title ?? oldData.title,
    text: text ?? oldData.text,
    priority: priority ?? oldData.priority,
    deadline: deadline ?? oldData.deadline,
    owner: oldData.owner,
    _id: oldData._id,
  };

  await Board.updateOne(
    { _id: boardId },
    {
      $set: {
        [`columns.${columnIndex}.cards.${index}`]: newData,
      },
    }
  );

  const boardGetColumn = await Board.findOne({ _id: boardId });

  res.json(boardGetColumn.columns[columnIndex].cards[index]);
};

module.exports = {
  updateCard,
};
