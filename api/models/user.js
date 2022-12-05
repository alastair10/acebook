/**
 * create an instance of mongoose 
 */
const mongoose = require("mongoose");

/**
 * create a schema for User
 * it contains a list of the fields that you wish to have in the data
 */
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  full_name: { type: String, required: true },
  // bio: { type: String, required: true },
  // status: { type: String, required: true },
  // // profile_pic: { type: String, required: true },
  // birthday: { type: Date, required: true },
  // hometown: { type: String, required: true },
  // occupation: { type: String, required: true },
  // joined_date: { type: Date, required: true },
  // relationship_status: { type: String, required: true }
});

/**
 * create an instance of the user schema
 * this can then be shared across the app
 */
const User = mongoose.model("User", UserSchema);

module.exports = User;
