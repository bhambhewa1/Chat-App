const mongoose = require("mongoose");
// const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  dob: { type: Date, required: true },
  //   email: { type: String, validate: [validator.isEmail, 'Enter a valid email address.'], required: true, unique: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
});

const userModel = mongoose.Model("User", userSchema);
module.exports = userModel;
