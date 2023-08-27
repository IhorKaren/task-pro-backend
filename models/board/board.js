const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../../helpers");

const boardSchema = new Schema(
  {
    // sequenceNumber: {
    //   type: Number,
    //   required: true,
    // },
    title: {
      type: String,
      required: [true, "Set the board's title"],
    },
    background: {
      type: String,
      default: null,
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
});

const addColumn = Joi.object({
  title: Joi.string().min(3).max(100).required(),
});

const addCard = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  text: Joi.string().min(0).max(300).required(),
  deadline: Joi.string().required(),
  owner: Joi.string().required(),
  priority: Joi.string(),
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
