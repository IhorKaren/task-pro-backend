const express = require("express");
const ctrl = require("../../controllers/cards");
const { authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/board/board");

const router = express.Router();

router.put("/:boardId", authenticate, ctrl.updateCard);

router.post(
  "/:boardId",
  validateBody(schemas.addCard),
  authenticate,
  ctrl.addCard
);

router.patch("/:boardId", authenticate, ctrl.replaceCard);

router.delete("/:boardId", authenticate, ctrl.deleteCard);

module.exports = router;
