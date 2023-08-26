const { ctrlWrapper } = require("../../helpers");

const feedback = require("./feedback");

module.exports = {
  feedback: ctrlWrapper(feedback),
};
