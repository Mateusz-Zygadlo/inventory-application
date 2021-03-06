const express = require('express');
const router = express.Router();
const genre_controller = require('../controller/genreController');
const product_controller = require('../controller/productController');
const seller_controller = require('../controller/sellerController');

router.get('/', genre_controller.genre_list);

router.get('/product/new', product_controller.allToForm);
router.post('/product/new', product_controller.newProduct);

router.get('/product/:id', product_controller.product);

router.get('/product/:id/delete', product_controller.deleteProduct);
router.post('/product/:id/delete', product_controller.confirmProduct);

router.get('/product/:id/update', product_controller.updateProduct);
router.post('/product/:id/update', product_controller.updateProductPost);

router.get('/products', product_controller.allProducts);

router.get('/seller/new', (req, res) => {
  res.render('seller_form');
})
router.post('/seller/new', seller_controller.newSeller);

router.get('/seller/:id', seller_controller.seller);

router.get('/seller/:id/delete', seller_controller.deleteSeller);
router.post('/seller/:id/delete', seller_controller.confirmDeleteSeller);

router.get('/seller/:id/update', seller_controller.updateSeller);
router.post('/seller/:id/update', seller_controller.updateSellerPost);

router.get('/sellers', seller_controller.allSellers);

router.get('/genre/new', (req, res) => {
  res.render('genre_form');
})

router.post('/genre/new', genre_controller.newGenre);

router.get('/genre/:id', genre_controller.genre_detail);
router.get('/genre/:id/delete', genre_controller.deleteGenre);

router.get('/genre/:id/update', genre_controller.updateGenres);
router.post('/genre/:id/update', genre_controller.newGenrePost);

router.post('/genre/:id/delete', genre_controller.deleteConfirmGenre);

router.get('/genres', genre_controller.allGenres);

module.exports = router;