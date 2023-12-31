const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../../helpers");

const dateRegexp = /^\d{2}\/\d{2}\/\d{4}$/;

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set the board's title"],
    },
    icon: { type: String, required: true },
    background: {
      min: { type: String },
      desktop: { type: String },
      tablet: { type: String },
      mobile: { type: String },
    },
    filter: {
      type: String,
      enum: ["default", "without", "low", "medium", "high"],
      default: "default",
    },
    columns: [
      {
        title: { type: String, required: true },
        owner: {
          type: Schema.Types.ObjectId,
        },
        cards: [
          {
            title: { type: String, required: true },
            text: { type: String, required: true },
            priority: {
              type: String,
              enum: ["without", "low", "medium", "high"],
              default: "without",
            },
            deadline: { type: String, required: true },
            owner: {
              type: Schema.Types.ObjectId,
              required: true,
            },
          },
        ],
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

boardSchema.post("save", handleMongooseError);

const addBoard = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  icon: Joi.string().required(),
  background: Joi.object({
    min: Joi.string().required(),
    desktop: Joi.string().required(),
    tablet: Joi.string().required(),
    mobile: Joi.string().required(),
  }),
});

const addColumn = Joi.object({
  title: Joi.string().min(3).max(100).required(),
});

const addCard = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  text: Joi.string().min(3).max(300).required(),
  deadline: Joi.string().pattern(dateRegexp).required(),
  owner: Joi.string().required(),
  priority: Joi.string().required(),
});

const schemas = {
  addBoard,
  addColumn,
  addCard,
};

const Board = model("board", boardSchema);

module.exports = {
  Board,
  schemas,
};
