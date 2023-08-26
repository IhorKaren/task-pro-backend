const express = require("express");
const ctrl = require("../../controllers/columns");
const { authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/board/board");

const router = express.Router();

router.put("/:columnId", authenticate, ctrl.updateColumn);

router.patch(
  "/:boardId",
  validateBody(schemas.addColumn),
  authenticate,
  ctrl.addColumnInBoard
);

router.delete("/:boardId/:columnId", authenticate, ctrl.deleteColumn);

module.exports = router;
