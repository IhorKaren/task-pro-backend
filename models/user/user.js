const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../../helpers");

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    avatar: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      enum: ["dark", "light", "violet"],
      default: "light",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const feedbackSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  message: Joi.string().required(),
})
const schemas = {
  registerSchema,
  loginSchema,
  feedbackSchema
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
