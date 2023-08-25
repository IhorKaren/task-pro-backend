const { ctrlWrapper } = require("../../helpers");

const { theme } = require("./theme");

module.exports = {
  theme: ctrlWrapper(theme),
};
