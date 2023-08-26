const express = require("express");

const updateUser = require("../../controllers/uploadImage/uploadImage")
const uploadCloud = require("../../middlewares/upload");
const authenticate = require("../../middlewares/authenticate");
const router = express.Router();
router.patch(
    "/",
    authenticate,
    uploadCloud.single("avatar"),
    updateUser
);

module.exports = router;