import pkg from "mongoose";

const { Schema, model } = pkg;

const ProblemsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  hash: {
    type: String,
    required: true,
  },

  cep: {
    type: String,
    required: true,
  },

  adress: {
    type: String,
    required: true,
  },

  street: {
    type: String,
    required: true,
  },

  complement: {
    type: String,
  },

  description: {
    type: String,
    required: true,
    lowercase: true,
  },

  isResolved: {
    type: Boolean,
    default: false,
    require: true,
  },
  likes: {
    type: Number,
    default: 0,
    require: true,
  },

  coments: {
    type: [String],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Problems", ProblemsSchema);
