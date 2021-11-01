const express = require('express');
const router = express.Router();
const genre_controller = require('../controller/genreController');

router.get('/', genre_controller.genre_list);

router.get('/genre/:id', genre_controller.genre_detail);

module.exports = router;