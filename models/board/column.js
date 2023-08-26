const { Schema, model } = require("mongoose");
const Joi = require("joi");

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addColumn = Joi.object({
  title: Joi.string().min(3).max(100).required(),
});

const Column = model("column", columnSchema);

const columnSchemas = {
  addColumn,
};

module.exports = {
  Column,
  columnSchemas,
};
