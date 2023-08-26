const Board = require("../../models/bord/board");
const { ctrlWrapper } = require("../../helpers");

const getAllBoards = async (req, res) => {
    const { _id: owner } = req.user;

    const dashboards = await Board
    .find(owner, "-createdAt -updatedAt");
    // .populate("columns", "email subscription");

    res.json({
        status: "success",
        code: 200,
        data: {
          result: dashboards,
        },
      });
}

module.exports = {
    getAllBoards: ctrlWrapper(getAllBoards),
    
  };
  