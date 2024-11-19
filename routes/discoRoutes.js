const express = require('express');
const router = express.Router();
const { criarDisco } = require('../controllers/discoController');

router.post('/disco', criarDisco);

module.exports = router;
