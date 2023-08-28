const { User } = require("../../models/user/user");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;

  let newPassword = null;
  let newAvatar = null;

  if (password) {
    newPassword = await bcrypt.hash(password, 10);
  }

  if (req.file) {
    newAvatar = req.file.path;
  }

  const checkPassword = password ? { password: newPassword } : {};
  const checkAvatar = req.file ? { avatar: newAvatar } : {};

  const result = await User.findByIdAndUpdate(
    _id,
    { ...req.body, ...checkAvatar, ...checkPassword },
    { new: true }
  );

  if (!result) throw HttpError(404);

  res.json(result);
};

module.exports = {
  updateUser,
};
