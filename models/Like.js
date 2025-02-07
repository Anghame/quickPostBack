const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Utilisateur qui a liké
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // Post liké
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Like', likeSchema);