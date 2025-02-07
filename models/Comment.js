const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true }, // Contenu du commentaire
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Auteur du commentaire
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // Post commenté
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);