const { Board } = require("../../models/board/board");

const getColumns = async (req, res) => {
  const { _id } = req.user;
  const { boardId } = req.params;

  const { columns } = await Board.findOne({ _id: boardId, owner: _id });

  const result = columns.map((column) => ({
    title: column.title,
    _id: column._id,
    owner: column.owner,
  }));

  res.json(result);
};

module.exports = {
  getColumns,
};
