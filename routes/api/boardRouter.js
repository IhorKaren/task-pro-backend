const express = require("express");
const ctrl = require("../../controllers/boards");
const { authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/board/board");

const router = express.Router();

router.post("/", validateBody(schemas.addBoard), authenticate, ctrl.addBoard);

router.get("/", authenticate, ctrl.getBoards);

router.get("/:boardId", authenticate, ctrl.getBoardById);

router.put(
  "/:boardId",
  validateBody(schemas.addBoard),
  authenticate,
  ctrl.updateBoard
);

router.patch(
  "/:boardId",
  validateBody(schemas.addColumn),
  authenticate,
  ctrl.addColumnInBoard
);

router.patch("/:boardId/:columnId", authenticate, ctrl.deleteColumn);

router.delete("/:boardId", authenticate, ctrl.deleteBoard);



///
router.put("/:boardId/:columnId", authenticate, ctrl.updateColumn);
///

module.exports = router;
