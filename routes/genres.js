const express = require('express');
const router = express.Router();
const genre_controller = require('../controller/genreController');

router.get('/', genre_controller.genre_list);

module.exports = router;