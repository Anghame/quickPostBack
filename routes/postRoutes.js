const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/posts', postController.createPost);

// Récupérer tous les posts
router.get('/posts', postController.getAllPosts);

// Liker un post
router.post('/posts/like', postController.likePost);

// Ajouter un commentaire
router.post('/posts/comment', postController.addComment);

module.exports = router;