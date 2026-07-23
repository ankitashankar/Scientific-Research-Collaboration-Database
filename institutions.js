const express = require('express');
const router = express.Router();

const { getInstitutions, addInstitution } = require('../controllers/institutionController');

router.get('/', getInstitutions);
router.post('/', addInstitution);

module.exports = router;