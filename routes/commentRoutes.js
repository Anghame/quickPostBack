const express = require('express');
const { addComment } = require('../controllers/postController'); // Importez la fonction addComment
const router = express.Router();

router.post('/', addComment); // Utilisez la fonction addComment

module.exports = router;