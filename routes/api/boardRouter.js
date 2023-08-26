const express = require("express");
const ctrl = require("../../controllers/boards");
const { authenticate } = require("../../middlewares");
// const { schema } = require("../../models/bord/index.js");

const router = express.Router();

router.get("/", authenticate, ctrl.addBoard);
// router.post("/add", authenticate, ctrl.addBoard);
// router.patch("/:{boradId}", authenticate, ctrl.editBoardTitle);

module.exports = router;
