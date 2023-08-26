const { User } = require("../../models/user/user");

const { HttpError } = require("../../helpers");

const theme = async (req, res) => {
  const { _id } = req.user;

  const { theme } = req.body;

  if (!theme) {
    res.status(400).json({ message: "missing field theme" });
    return;
  }

  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result.theme);
};

module.exports = {
  theme,
};
