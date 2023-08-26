const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { cardPriority } = require("./constants.js");

const cardSchema = new Schema(
  {
    numberInColumn: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Set the card's title"],
    },
    content: {
      type: String,
    },
    priority: {
      type: String,
      default: cardPriority.LOW,
    },
    deadline: {
      type: String,
    },
  },
  { _id: false, versionKey: false, timestamps: true }
);

const addCard = Joi.object({
    title: Joi.string()
    .min(3)
    .max(100)
    .required()
});


const Card = model("card", cardSchema);
const cardSchemas = {
  addCard,
};

module.exports = {
  Card,
  cardSchemas,
};
