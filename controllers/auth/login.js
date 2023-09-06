const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user/user");

const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  let token = null;

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const {
    name,
    email: userEmail,
    avatar,
    theme,
  } = await User.findById(user._id);

  if (!user.token) {
    token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1w" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      name,
      email: userEmail,
      token,
      avatar,
      theme,
    });
  }

  res.json({
    name,
    email: userEmail,
    token: user.token,
    avatar,
    theme,
  });
};

module.exports = {
  login,
};
