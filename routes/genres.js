const express = require('express');
const router = express.Router();
const genre_controller = require('../controller/genreController');
const product_controller = require('../controller/productController');
const seller_controller = require('../controller/sellerController');

router.get('/', genre_controller.genre_list);

router.get('/product/new', product_controller.allToForm);
router.post('/product/new', product_controller.newProduct);

router.get('/product/:id', product_controller.product);

router.get('/seller/new', (req, res) => {
  res.render('seller_form');
})
router.post('/seller/new', seller_controller.newSeller);

router.get('/seller/:id', seller_controller.seller);
router.get('/card', (req, res) => {
  res.render('shoppingCard');
})



router.get('/genres/new', (req, res) => {
  res.render('genre_form');
})

router.get('/genre/:id', genre_controller.genre_detail);
router.get('/genre/:id/delete', genre_controller.deleteGenre);

router.post('/genre/:id/delete', genre_controller.deleteConfirmGenre);

router.post('/genres/new', genre_controller.newGenre);

module.exports = router;