const express = require("express");
const ctrl = require("../../controllers/board/board.js");
const { authenticate } = require("../../middlewares");
// const { schema } = require("../../models/bord/index.js");

const boardRouter = express.Router();

boardRouter.get("/", authenticate, ctrl.getAllBoards);
// router.post("/add", authenticate, ctrl.addBoard);
// router.patch("/:{boradId}", authenticate, ctrl.editBoardTitle);

module.exports = { boardRouter };