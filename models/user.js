const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // REMEMBER TO INCLUDE UNIQUE VALIDATORS
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    required: false,
  },
  warps: {
    type: Array,
    default: [],
    required: false,
  },

  level: {
    type: Number,
    default: 0,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
    required: false,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
