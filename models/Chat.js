var mongoose = require("mongoose");

var ChatSchema = new mongoose.Schema({
  room: { type: String, ref: "Room" },
  nickname: String,
  message: String,
  created_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Chat", ChatSchema);
