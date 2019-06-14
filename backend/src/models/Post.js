const mongoose = require('mongoose');

const post_schema = {
  author: String,
  place: String,
  description: String,
  hashtags: String,
  image: String,
  likes: {
    type: Number,
    default: 0
  }
};

const PostSchema = new mongoose.Schema(post_schema, {
  timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);