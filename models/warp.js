const mongoose = require("mongoose");

const WarpSchema = mongoose.Schema({
  warpID: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
  },
  messages: {
    type: Array,
    default: [],
    required: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

const Warp = mongoose.model("Warp", WarpSchema);
module.exports = Warp;
