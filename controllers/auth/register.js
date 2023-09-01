const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user/user");

const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1w" });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
    avatar: newUser.avatar,
    theme: newUser.theme,
    token,
  });
};

module.exports = {
  register,
};
