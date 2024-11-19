const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { criarDisco } = require('../controllers/discoController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

router.post('/disco', upload.single('imagem'), criarDisco);

module.exports = router;
