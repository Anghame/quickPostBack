const express = require('express');
const { likePost } = require('../controllers/postController'); // Importez la fonction likePost
const router = express.Router();

router.post('/', likePost); // Utilisez la fonction likePost

module.exports = router;