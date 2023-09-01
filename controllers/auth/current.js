const { User } = require("../../models/user/user");

const getCurrent = async (req, res) => {
  const { email, name } = req.user;

  const { token, avatar, theme } = await User.findOne({ email });

  res.json({
    email,
    token,
    name,
    avatar,
    theme,
  });
};

module.exports = {
  getCurrent,
};
