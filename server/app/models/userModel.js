const mongoose = require("mongoose");
// const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  //   email: { type: String, validate: [validator.isEmail, 'Enter a valid email address.'], required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
