const express = require("express");
const ctrl = require("../../controllers/cards");
const { authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/board/board");

const router = express.Router();

router.patch("/:boardId/:columnId", authenticate, ctrl.updateCard);

router.post(
  "/:boardId/:columnId",
  validateBody(schemas.addCard),
  authenticate,
  ctrl.addCard
);

router.delete("/:boardId/:columnId", authenticate, ctrl.deleteCard);

module.exports = router;
