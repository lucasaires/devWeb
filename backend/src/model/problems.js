import pkg from "mongoose";

const { Schema, model } = pkg;

const ProblemsSchema = new Schema({
  title: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
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
    require: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Problems", ProblemsSchema);
