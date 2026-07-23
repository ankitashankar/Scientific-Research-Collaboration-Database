const express = require('express');
const router = express.Router();

const { getAuthors, addAuthor } = require('../controllers/authorController');

router.get('/', getAuthors);
router.post('/', addAuthor);

module.exports = router;