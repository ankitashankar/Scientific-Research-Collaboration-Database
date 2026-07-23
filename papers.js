const express = require('express');
const router = express.Router();

const {
    getPapers,
    addPaper
} = require('../controllers/paperController');

router.get('/', getPapers);
router.post('/', addPaper);

module.exports = router;