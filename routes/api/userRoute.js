const express = require("express");

const ctrl = require("../../controllers/user");

const { authenticate } = require("../../middlewares");

const router = express.Router();

router.patch("/theme", authenticate, ctrl.theme);

module.exports = router;