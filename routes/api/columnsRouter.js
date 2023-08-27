const express = require("express");
const ctrl = require("../../controllers/columns");
const { authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/board/board");

const router = express.Router();

router.post(
  "/:boardId",
  validateBody(schemas.addColumn),
  authenticate,
  ctrl.addColumnInBoard
);

router.put("/", authenticate, ctrl.updateColumn);

router.delete("/", authenticate, ctrl.deleteColumn);

module.exports = router;
