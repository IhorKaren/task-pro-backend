const { User } = require("../../models/user/user");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  let newPassword = null;
  let avatar = null;

  if (password) {
    newPassword = await bcrypt.hash(password, 10);
  }

  if (req.file) {
    avatar = req.file.path;
  }

  const result = await User.findByIdAndUpdate(
    _id,
    { ...req.body, avatar, password: newPassword },
    { new: true }
  );
  if (!result) throw HttpError(404);

  res.json(result);
};

module.exports = updateUser;
