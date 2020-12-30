const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  creator: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
}, {
  timestamps: true,
});

module.exports = Todo = mongoose.model("Todo", todoSchema);