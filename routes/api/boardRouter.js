const express = require("express");

const ctrl = require("../../controllers/boards");

const { authenticate, validateBody } = require("../../middlewares");

const { schemas } = require("../../models/board/board");

const router = express.Router();

router.post("/", authenticate, validateBody(schemas.addBoard), ctrl.addBoard);

router.get("/", authenticate, ctrl.getBoards);

router.get("/:boardId", authenticate, ctrl.getBoardById);

router.put("/:boardId", authenticate, ctrl.updateBoard);

router.delete("/:boardId", authenticate, ctrl.deleteBoard);

router.patch("/filter/:boardId/:priority", authenticate, ctrl.filterBoardCards);

module.exports = router;
