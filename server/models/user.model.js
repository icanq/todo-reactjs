const mongoose = require("mongoose");
const { hash } = require('../helpers/passwordHandler')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
    timestamps: true,
    versionKey: false
});
userSchema.post('validate', function (user, next) {
  user.password = hash(user.password)
  next()
})
module.exports = User = mongoose.model("User", userSchema);