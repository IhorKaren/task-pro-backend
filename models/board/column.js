const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const cardSchemas = require("./card.js");

const columnSchema = new Schema({
    sequenceNumber: {
        type: Number,
        required: true,
    },
    title: {
      type: String,
      required: [true, "Set the column's title"],
    },
    // cards: [cardSchemas],
  }, { _id: false, versionKey: false, timestamps: true });

  const addCard = Joi.object({
    title: Joi.string()
    .min(3)
    .max(100)
    .required()
});


const Column = model("card", columnSchema);
const columnSchemas = {
  addCard,
};

module.exports = {
  Column,
  columnSchemas,
};