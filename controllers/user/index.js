const { ctrlWrapper } = require("../../helpers");

const { theme } = require("./theme");
const { updateUser } = require("./updateUser");

module.exports = {
  theme: ctrlWrapper(theme),
  updateUser: ctrlWrapper(updateUser),
};
