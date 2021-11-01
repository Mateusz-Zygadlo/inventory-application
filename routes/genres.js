const express = require('express');
const router = express.Router();
const genre_controller = require('../controller/genreController');
const product_controller = require('../controller/productController');

router.get('/', genre_controller.genre_list);
router.get('/genre/:id', genre_controller.genre_detail);
router.get('/product/:id', product_controller.product);

module.exports = router;