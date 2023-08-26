const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const columnSchemas = require("./column.js");
const { handleMongooseError } = require("../../helpers");

const boardSchema = new Schema(
  {
    // sequenceNumber: {
    //   type: Number,
    //   required: true,
    // },
    title: {
      type: String,
      required: [true, "Set the bord's title"],
    },
    background: {
      type: String,
      default: null,
    },
    // columns: [columnSchemas],
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

const schemas = {
  addBoard,
};

const Board = model("board", boardSchema);

module.exports = {
  Board,
  schemas,
};
