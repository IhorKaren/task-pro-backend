const { User } = require("../../models/user/user");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { password, name, email } = req.body;
 
  const updatedFields = {
    ...(name && { name }),
    ...(email && { email }),
    ...(req.file && { avatar: req.file.path }),
    ...(password && { password: await bcrypt.hash(password, 10) })
  }

  const result = await User.findByIdAndUpdate(
    _id,
    { ...updatedFields },
    { new: true, select: "-createdAt -updatedAt -token" }
  );
  if (!result) throw HttpError(404);

  res.json(result);
};

module.exports = {
  updateUser,
};
