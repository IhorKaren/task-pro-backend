const express = require("express");
const ctrl = require("../../controllers/boards");
const { authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/board/board");

const router = express.Router();

router.post("/", validateBody(schemas.addBoard), authenticate, ctrl.addBoard);
router.get("/", authenticate, ctrl.getBoards);

module.exports = router;
