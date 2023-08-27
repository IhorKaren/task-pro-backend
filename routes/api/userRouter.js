const express = require("express");

const uploadCloud = require("../../middlewares/upload");

const ctrl = require("../../controllers/user");

const { authenticate } = require("../../middlewares");

const router = express.Router();

router.patch("/", authenticate, uploadCloud.single("avatar"), ctrl.updateUser);

router.patch("/theme", authenticate, ctrl.theme);

module.exports = router;
