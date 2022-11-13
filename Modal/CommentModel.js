const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  user: {},
  postId: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("comment", CommentSchema);
module.exports = Comment;
