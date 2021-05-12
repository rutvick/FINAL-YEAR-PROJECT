const path = require('path');
const admin = require('../controllers/admin');
const express = require('express');
const router = express.Router();

express.static(path.join(__dirname, 'public'))

router.get('/admin-login', admin.getAdminLogin);

router.post('/admin-products', admin.postLogin);

router.get('/smartphones', admin.getAddSmartphone);

router.get('/admin-products', admin.getProducts);

router.post('/admin/add-product', admin.postAddProduct);

router.get('/smartphones/:productId', admin.getEditSmartphone);

//router.post('/smartphones', admin.postEditSmartphone);

//router.post('/delete-product', admin.postDeleteSmartphone);

router.get('/laptops', (req,res,next) => {
    res.render('./admin/laptops', {
        pageTitle: 'Laptops',
        path: '/laptops'
    });
});

router.get('/audios', (req,res,next) => {
    res.render('./admin/audios', {
        pageTitle: 'Audio',
        path: '/audios'
    });
});

module.exports = router;