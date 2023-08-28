const express = require("express");
const ctrl = require("../../controllers/boards");
const { authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/board/board");

const router = express.Router();

router.post("/", validateBody(schemas.addBoard), authenticate, ctrl.addBoard);

router.get("/", authenticate, ctrl.getBoards);

router.get("/:boardId", authenticate, ctrl.getBoardById);

router.patch("/filter/:boardId/:priority", authenticate, ctrl.sortBoardCards);

router.put(
  "/:boardId",
  validateBody(schemas.addBoard),
  authenticate,
  ctrl.updateBoard
);

router.delete("/:boardId", authenticate, ctrl.deleteBoard);

module.exports = router;
