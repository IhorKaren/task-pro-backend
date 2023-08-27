const express = require("express");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user/user");

const ctrl = require("../../controllers/feedback");

const router = express.Router();
router.post(
  "/sendFeedback",
  validateBody(schemas.feedbackSchema),
  ctrl.feedback
);

module.exports = router;
