const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'UserId required']
  },
  name: {
    type: String,
    required: [true, 'title required']
  },
  description: {
    type: String
  },
  status: {
    type: String,
    required: true,
    enum: ['ongoing', 'done', 'missed'],
    default() {
      return new Date(this.dueDate) >= new Date() ? 'ongoing' : 'missed'
    }
  },
  dueDate: {
    type: Date,
    required: true,
    default: new Date().setHours(23, 59, 59)
  },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = Todo = mongoose.model("Todo", todoSchema);